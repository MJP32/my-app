import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|enum)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException|LocalDate|LocalDateTime|UUID|BigDecimal)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function MediHealth({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopic) {
          setSelectedTopic(null)
        } else {
          onBack()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTopic, onBack])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Parse code into sections
  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentCode = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      // Check for section headers (lines with ═ and ✦)
      if (line.includes('═══════') && lines[i + 1]?.includes('✦')) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentCode.join('\n')
          })
        }
        // Start new section
        const titleLine = lines[i + 1]
        currentSection = titleLine.replace(/\/\/\s*✦\s*/g, '').trim()
        currentCode = []
        continue
      }

      // Skip separator lines
      if (line.includes('═══════')) {
        continue
      }

      // Add code to current section
      if (currentSection) {
        currentCode.push(line)
      }
    }

    // Add last section
    if (currentSection && currentCode.length > 0) {
      sections.push({
        title: currentSection,
        code: currentCode.join('\n')
      })
    }

    return sections
  }

  const topics = [
    {
      id: 0,
      title: '🏗️ Technical Architecture',
      color: '#6366f1',
      description: 'Complete system architecture for travel nurse medical application',
      diagram: () => (
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 1200 800" style={{ width: '100%', maxWidth: '1200px', height: 'auto' }}>
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Layer 1: Client Apps */}
            <rect x="50" y="20" width="1100" height="80" fill="url(#blueGradient)" rx="8" />
            <text x="600" y="50" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 1: Client Applications</text>
            <text x="200" y="75" textAnchor="middle" fill="white" fontSize="14">⚕️ React Web</text>
            <text x="600" y="75" textAnchor="middle" fill="white" fontSize="14">📱 React Native</text>
            <text x="1000" y="75" textAnchor="middle" fill="white" fontSize="14">🔧 Admin Portal</text>

            {/* Layer 2: API Gateway */}
            <rect x="50" y="120" width="1100" height="60" fill="url(#greenGradient)" rx="8" />
            <text x="600" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 2: API Gateway (Kong/AWS)</text>

            {/* Layer 3: Microservices */}
            <rect x="50" y="200" width="1100" height="100" fill="url(#blueGradient)" rx="8" />
            <text x="600" y="225" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 3: Microservices</text>
            <text x="160" y="260" textAnchor="middle" fill="white" fontSize="12">Patient</text>
            <text x="340" y="260" textAnchor="middle" fill="white" fontSize="12">Appointment</text>
            <text x="520" y="260" textAnchor="middle" fill="white" fontSize="12">Location</text>
            <text x="700" y="260" textAnchor="middle" fill="white" fontSize="12">Insurance</text>
            <text x="880" y="260" textAnchor="middle" fill="white" fontSize="12">Auth</text>
            <text x="250" y="285" textAnchor="middle" fill="white" fontSize="12">Billing</text>
            <text x="600" y="285" textAnchor="middle" fill="white" fontSize="12">Notification</text>

            {/* Layer 4: Kafka Event Bus */}
            <rect x="50" y="320" width="1100" height="60" fill="url(#greenGradient)" rx="8" />
            <text x="600" y="355" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 4: Kafka Event Bus</text>

            {/* Layer 5: Databases */}
            <rect x="50" y="400" width="1100" height="100" fill="url(#blueGradient)" rx="8" />
            <text x="600" y="425" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 5: Data Storage</text>
            <text x="190" y="455" textAnchor="middle" fill="white" fontSize="13">PostgreSQL</text>
            <text x="390" y="455" textAnchor="middle" fill="white" fontSize="13">Oracle</text>
            <text x="590" y="455" textAnchor="middle" fill="white" fontSize="13">MongoDB</text>
            <text x="790" y="455" textAnchor="middle" fill="white" fontSize="13">Redis</text>
            <text x="990" y="455" textAnchor="middle" fill="white" fontSize="13">S3</text>

            {/* Layer 6: Security - HIPAA */}
            <rect x="50" y="520" width="1100" height="60" fill="url(#greenGradient)" rx="8" />
            <text x="400" y="555" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 6: Security (HIPAA)</text>
            <text x="850" y="555" textAnchor="middle" fill="white" fontSize="16">HL7/FHIR</text>

            {/* Layer 7: Monitoring */}
            <rect x="50" y="600" width="1100" height="80" fill="url(#blueGradient)" rx="8" />
            <text x="600" y="625" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 7: Monitoring & Observability</text>
            <text x="300" y="655" textAnchor="middle" fill="white" fontSize="14">📊 Prometheus</text>
            <text x="600" y="655" textAnchor="middle" fill="white" fontSize="14">📈 Grafana</text>
            <text x="900" y="655" textAnchor="middle" fill="white" fontSize="14">🔍 ELK Stack</text>

            {/* Arrows showing data flow */}
            <path d="M 600 100 L 600 120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowheadGreen)" />
            <path d="M 600 180 L 600 200" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowheadGreen)" />
            <path d="M 600 300 L 600 320" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowheadGreen)" />
            <path d="M 600 380 L 600 400" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowheadGreen)" />
            <path d="M 600 500 L 600 520" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowheadGreen)" />
            <path d="M 600 580 L 600 600" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowheadGreen)" />

            <defs>
              <marker id="arrowheadGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      content: {
        overview: 'Comprehensive technical architecture for a medical application serving travel nurses, doctors, and patients. Includes microservices design, API gateway, HIPAA compliance, HL7/FHIR integration, and real-time location tracking.',
        keyPoints: [
          'Microservices architecture with Spring Boot',
          'React Web + React Native mobile apps',
          'API Gateway (Kong/AWS) for routing',
          'PostgreSQL + MongoDB hybrid data storage',
          'Kafka message bus for event streaming',
          'Real-time GPS tracking with Redis',
          'HL7/FHIR insurance integration',
          'HIPAA-compliant security with encryption',
          'Multi-region deployment with high availability',
          'Comprehensive monitoring and observability'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 1: User Interfaces (React Web, React Native, Admin Portal)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * USER INTERFACE LAYER
 * --------------------
 * Three primary client applications communicate with backend via HTTPS/TLS 1.3
 *
 * 1. React Web App
 *    - Modern SPA for desktop/tablet access
 *    - Responsive design with Material-UI
 *    - Patient/Provider portals
 *
 * 2. React Native Mobile (iOS/Android)
 *    - Native mobile experience
 *    - Real-time GPS tracking
 *    - Push notifications
 *    - Offline-first capabilities
 *
 * 3. Admin Portal Dashboard
 *    - Advanced analytics and reporting
 *    - System configuration
 *    - User management
 *    - Audit trail viewer
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 2: API Gateway (Kong / AWS API Gateway)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * API GATEWAY RESPONSIBILITIES
 * ----------------------------
 * Central entry point for all API requests with security and routing
 *
 * Features:
 * • OAuth2/JWT Authentication - Token validation and refresh
 * • Rate Limiting - Protection against abuse (1000 req/min per client)
 * • Load Balancing - Round-robin distribution across service instances
 * • SSL Termination - TLS 1.3 encryption/decryption
 * • Request Routing - Path-based routing to microservices
 * • API Versioning - Support for /v1, /v2 endpoints
 * • CORS Handling - Cross-origin request management
 * • Request/Response Transformation - Header injection, body modification
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 3: Microservices (Spring Boot)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * MICROSERVICES ARCHITECTURE
 * --------------------------
 * 8 independent services, each with dedicated database and responsibilities
 *
 * Core Services:
 * --------------
 * 1. Patient Service (Port 8081)
 *    - Patient registration and management
 *    - Medical history tracking
 *    - Technology: Spring Boot, PostgreSQL, REST API
 *
 * 2. Appointment Service (Port 8082)
 *    - Scheduling and calendar management
 *    - Availability tracking
 *    - Technology: Spring Boot, PostgreSQL, REST API
 *
 * 3. Location Tracking Service (Port 8083)
 *    - Real-time GPS tracking for travel nurses
 *    - ETA calculations and route optimization
 *    - Technology: Spring Boot, Redis Geo, WebSocket
 *
 * 4. Insurance Service (Port 8084)
 *    - Insurance eligibility verification
 *    - Claims processing and submission
 *    - Technology: Spring Boot, HL7 v2.5, FHIR R4
 *
 * Support Services:
 * -----------------
 * 5. Auth Service (Port 8080)
 *    - Authentication and authorization
 *    - Technology: OAuth2/JWT, KeyCloak integration
 *
 * 6. Billing Service (Port 8085)
 *    - Claims management and EDI 837 submission
 *    - Payment processing
 *
 * 7. Notification Service (Port 8086)
 *    - Multi-channel notifications (SMS, Email, Push)
 *    - Technology: Twilio SMS, SendGrid Email
 *
 * 8. Clinical Notes Service (Port 8087)
 *    - Medical documentation and notes
 *    - Technology: MongoDB for document storage
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 4: Event Streaming (Apache Kafka)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * EVENT STREAMING BUS
 * -------------------
 * Asynchronous communication between microservices via Kafka topics
 *
 * Kafka Topics:
 * • patient-events - Patient creation, updates, deletions
 * • appointment-events - Scheduling changes, cancellations
 * • location-updates - Real-time GPS coordinates from nurses
 * • claim-submissions - Insurance claim workflow events
 * • audit-logs - HIPAA compliance audit trail
 *
 * Configuration:
 * • Partitions: 10 per topic for parallelism
 * • Replication Factor: 3 for high availability
 * • Retention: 7 days for event replay capabilities
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 5: Data & Caching Layer
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DATA PERSISTENCE STRATEGY
 * -------------------------
 * Polyglot persistence approach with specialized databases
 *
 * 1. PostgreSQL (Relational Data)
 *    Storage: Patients, Appointments, Providers, Insurance, Claims
 *    Configuration: Multi-AZ deployment for high availability
 *    Backup: Daily automated backups with 30-day retention
 *
 * 2. MongoDB (Document Store)
 *    Storage: Clinical Notes, Assessments, Progress Notes
 *    Configuration: 3-node replica set for redundancy
 *    Features: Full-text search, flexible schema
 *
 * 3. Redis (In-Memory Cache)
 *    Storage: User sessions, location cache, pub/sub channels
 *    Features: Geospatial indexing for location queries
 *    Configuration: Cluster mode, TTL of 5 minutes for cache
 *
 * 4. AWS S3 (Object Storage)
 *    Storage: Medical images, documents, lab files, X-rays, PDFs
 *    Features: Server-side encryption, versioning enabled
 *    Access: Pre-signed URLs for secure temporary access
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 6: External Integrations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * THIRD-PARTY INTEGRATIONS
 * ------------------------
 *
 * Insurance Payers:
 * • HL7 v2.5 - Standard healthcare messaging protocol
 * • FHIR R4 API - Modern RESTful healthcare API
 * • EDI X12 - Electronic Data Interchange for claims
 *
 * Communication Services:
 * • Twilio SMS - Text message notifications
 * • SendGrid - Transactional emails
 * • Firebase Cloud Messaging (FCM) - Push notifications
 *
 * Maps & Location:
 * • Google Maps API - Route optimization and ETA calculations
 * • Geocoding - Address to coordinates conversion
 * • Distance Matrix - Travel time estimation
 *
 * Payment Gateway:
 * • Stripe API - Credit card processing
 * • Square API - Point of sale payments
 * • ACH Transfers - Direct bank transfers
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 7: Deployment & Observability
// ═══════════════════════════════════════════════════════════════════════════

/**
 * INFRASTRUCTURE & MONITORING
 * ---------------------------
 *
 * Container Orchestration:
 * • Kubernetes (EKS/GKE) - Multi-region deployment
 * • Auto-scaling - Horizontal pod autoscaling based on CPU/Memory
 * • Rolling updates - Zero-downtime deployments
 *
 * Monitoring & Observability:
 * • Prometheus - Metrics collection and alerting
 * • Grafana - Real-time dashboards and visualization
 * • ELK Stack - Centralized logging (Elasticsearch, Logstash, Kibana)
 * • Jaeger - Distributed tracing for request flow analysis
 *
 * DevOps & Security:
 * • ArgoCD - GitOps continuous deployment with auto-sync
 * • HashiCorp Vault - Secrets management and encryption
 * • Open Policy Agent (OPA) - Policy enforcement and authorization
 * • Zero Trust Security - Network segmentation and micro-segmentation
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Patient Service Implementation
// ═══════════════════════════════════════════════════════════════════════════

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                      ⚡ PATIENT SERVICE FLOW ⚡                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║    ┌─────────────────────────────────────────────────────────────┐      ║
║    │                   Client Applications                        │      ║
║    │  (Nurse/Doctor Mobile App, Web Portal, Admin Dashboard)     │      ║
║    └─────────────────────────┬───────────────────────────────────┘      ║
║                              │                                            ║
║                              │ HTTP POST /api/v1/patients                ║
║                              │ Authorization: Bearer <JWT>               ║
║                              ▼                                            ║
║         ┌────────────────────────────────────────────────┐               ║
║         │       Patient Service (Spring Boot)            │               ║
║         │        Port: 8081                              │               ║
║         │  ┌──────────────────────────────────────────┐ │               ║
║         │  │  @RestController                         │ │               ║
║         │  │  PatientController                       │ │               ║
║         │  │  ● createPatient()                       │ │               ║
║         │  │  ● getPatient()                          │ │               ║
║         │  │  ● updatePatient()                       │ │               ║
║         │  │  ● addClinicalNote()                     │ │               ║
║         │  └─────────────────┬────────────────────────┘ │               ║
║         │                    │                           │               ║
║         │  ┌─────────────────▼────────────────────────┐ │               ║
║         │  │  @Service                                │ │               ║
║         │  │  PatientService                          │ │               ║
║         │  │  ● Business Logic                        │ │               ║
║         │  │  ● Validation                            │ │               ║
║         │  │  ● HIPAA Audit Logging                   │ │               ║
║         │  └─────────────────┬────────────────────────┘ │               ║
║         │                    │                           │               ║
║         │  ┌─────────────────▼────────────────────────┐ │               ║
║         │  │  @Repository                             │ │               ║
║         │  │  PatientRepository (JPA)                 │ │               ║
║         │  └─────────────────┬────────────────────────┘ │               ║
║         └────────────────────┼──────────────────────────┘               ║
║                              │                                            ║
║              ┌───────────────┼─────────────────┐                         ║
║              │               │                 │                         ║
║              ▼               ▼                 ▼                         ║
║    ┌─────────────────┐  ┌─────────────┐  ┌─────────────────┐           ║
║    │   PostgreSQL    │  │   Kafka     │  │   Redis Cache   │           ║
║    │─────────────────│  │   Broker    │  │─────────────────│           ║
║    │ ✓ ACID Trans    │  │─────────────│  │ ✓ @Cacheable    │           ║
║    │ ✓ Row-level     │  │ Topic:      │  │ ✓ TTL: 10min    │           ║
║    │   Encryption    │  │ "patient-   │  │ ✓ Eviction      │           ║
║    │ ✓ Audit Trail   │  │  events"    │  │   Policy        │           ║
║    └─────────────────┘  └──────┬──────┘  └─────────────────┘           ║
║                                 │                                         ║
║                                 │ Event Bus (Publish/Subscribe)          ║
║                                 │                                         ║
║               ┌─────────────────┼─────────────────┐                      ║
║               │                 │                 │                      ║
║               ▼                 ▼                 ▼                      ║
║    ┌──────────────────┐ ┌──────────────┐ ┌───────────────────┐         ║
║    │   Insurance      │ │   Billing    │ │   Analytics       │         ║
║    │   Service        │ │   Service    │ │   Service         │         ║
║    │──────────────────│ │──────────────│ │───────────────────│         ║
║    │ @KafkaListener   │ │@KafkaListener│ │ @KafkaListener    │         ║
║    │ ► Verify         │ │ ► Create     │ │ ► Track Patient   │         ║
║    │   Eligibility    │ │   Claim      │ │   Demographics    │         ║
║    │ ► Check Coverage │ │ ► Generate   │ │ ► Update          │         ║
║    │ ► Update         │ │   Statement  │ │   Dashboards      │         ║
║    │   Benefits       │ │              │ │ ► ML Models       │         ║
║    └──────────────────┘ └──────────────┘ └───────────────────┘         ║
║                                                                           ║
║  Response Flow:                                                          ║
║  ═════════════                                                           ║
║  Patient Created ⟹ 201 Created                                         ║
║  Location: /api/v1/patients/{id}                                        ║
║  Body: { "id": "uuid", "mrn": "MRN123", "status": "ACTIVE" }           ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private KafkaTemplate<String, PatientEvent> kafkaTemplate;

    // Create new patient
    @PostMapping
    @PreAuthorize("hasRole('NURSE') or hasRole('DOCTOR')")
    public ResponseEntity<PatientDTO> createPatient(
        @Valid @RequestBody CreatePatientRequest request) {

        PatientDTO patient = patientService.createPatient(request);

        // Publish event to Kafka
        kafkaTemplate.send("patient-created",
            new PatientCreatedEvent(patient.getId()));

        return ResponseEntity
            .created(URI.create("/api/v1/patients/" + patient.getId()))
            .body(patient);
    }

    // Get patient by ID
    @GetMapping("/{patientId}")
    @PreAuthorize("hasAnyRole('NURSE', 'DOCTOR', 'ADMIN')")
    @Cacheable(value = "patients", key = "#patientId")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable Long patientId) {
        return patientService.getPatient(patientId)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new PatientNotFoundException(patientId));
    }

    // Update patient information
    @PutMapping("/{patientId}")
    @PreAuthorize("hasRole('NURSE') or hasRole('DOCTOR')")
    public ResponseEntity<PatientDTO> updatePatient(
        @PathVariable Long patientId,
        @Valid @RequestBody UpdatePatientRequest request) {

        PatientDTO updated = patientService.updatePatient(patientId, request);

        // Publish update event
        kafkaTemplate.send("patient-updated",
            new PatientUpdatedEvent(patientId));

        return ResponseEntity.ok(updated);
    }

    // Add clinical note
    @PostMapping("/{patientId}/clinical-notes")
    @PreAuthorize("hasRole('NURSE') or hasRole('DOCTOR')")
    public ResponseEntity<ClinicalNoteDTO> addClinicalNote(
        @PathVariable Long patientId,
        @Valid @RequestBody ClinicalNoteRequest request) {

        ClinicalNoteDTO note = patientService.addClinicalNote(
            patientId, request);

        return ResponseEntity.ok(note);
    }
}

// ============================================================================
// 2. LOCATION TRACKING SERVICE - Real-time GPS with Redis
// ============================================================================

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║              🗺️  REAL-TIME LOCATION TRACKING FLOW 🗺️                     ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  PHASE 1: Provider Location Updates (Every 30 seconds)                   ║
║  ══════════════════════════════════════════════════════                  ║
║                                                                           ║
║  ┌─────────────────────────┐                                             ║
║  │  Provider Mobile App    │                                             ║
║  │  (React Native)         │                                             ║
║  │─────────────────────────│                                             ║
║  │ ● GPS Service           │                                             ║
║  │ ● Background Updates    │                                             ║
║  │ ● Battery Optimized     │                                             ║
║  └────────────┬────────────┘                                             ║
║               │                                                           ║
║               │ POST /api/v1/location/update                             ║
║               │ { lat: 32.7767, lng: -96.7970, timestamp, providerId }   ║
║               │                                                           ║
║               ▼                                                           ║
║  ┌──────────────────────────────────────────────┐                        ║
║  │    Location Service (Spring Boot)            │                        ║
║  │    Port: 8083                                │                        ║
║  │  ┌────────────────────────────────────────┐  │                        ║
║  │  │ @RestController                        │  │                        ║
║  │  │ LocationController                     │  │                        ║
║  │  │ ● updateProviderLocation()             │  │                        ║
║  │  │ ● calculateETA()                       │  │                        ║
║  │  │ ● findProvidersNearby()                │  │                        ║
║  │  └─────────────┬──────────────────────────┘  │                        ║
║  │                │                              │                        ║
║  │  ┌─────────────▼──────────────────────────┐  │                        ║
║  │  │ @Service                               │  │                        ║
║  │  │ LocationTrackingService                │  │                        ║
║  │  │ ● Redis Geospatial Operations          │  │                        ║
║  │  │ ● Google Maps API Integration          │  │                        ║
║  │  └────────┬────────────┬──────────────────┘  │                        ║
║  └───────────┼────────────┼──────────────────────┘                        ║
║              │            │                                               ║
║              ▼            ▼                                               ║
║  ┌────────────────────┐  ┌───────────────────────┐                       ║
║  │  Redis Cache       │  │  Kafka Event Bus      │                       ║
║  │────────────────────│  │───────────────────────│                       ║
║  │ GEOADD            │  │ Topic:                │                       ║
║  │ providers:        │  │ "location-updates"    │                       ║
║  │ locations         │  │                       │                       ║
║  │                   │  │ Event:                │                       ║
║  │ Key:              │  │ { providerId,         │                       ║
║  │ provider:location:│  │   lat, lng,           │                       ║
║  │ {providerId}      │  │   timestamp }         │                       ║
║  │                   │  │                       │                       ║
║  │ TTL: 5 minutes    │  └───────────────────────┘                       ║
║  │ Format: GeoHash   │                                                   ║
║  └────────────────────┘                                                   ║
║                                                                           ║
║  PHASE 2: ETA Calculation (Patient Requests)                             ║
║  ════════════════════════════════════════════                            ║
║                                                                           ║
║  ┌─────────────────────────┐                                             ║
║  │  Patient Mobile App     │                                             ║
║  │─────────────────────────│                                             ║
║  │ ● Track Provider        │                                             ║
║  │ ● Real-time ETA         │                                             ║
║  │ ● Map Visualization     │                                             ║
║  └────────────┬────────────┘                                             ║
║               │                                                           ║
║               │ GET /api/v1/location/eta?providerId=123&patientId=456    ║
║               │                                                           ║
║               ▼                                                           ║
║  ┌──────────────────────────────────────────────┐                        ║
║  │    Location Service (Spring Boot)            │                        ║
║  │  ┌────────────────────────────────────────┐  │                        ║
║  │  │ calculateETA()                         │  │                        ║
║  │  │ ├─► Get Provider Location (Redis)      │  │                        ║
║  │  │ ├─► Get Patient Address (PostgreSQL)   │  │                        ║
║  │  │ └─► Call Google Maps Directions API    │  │                        ║
║  │  └─────────────┬──────────────────────────┘  │                        ║
║  └────────────────┼──────────────────────────────┘                        ║
║                   │                                                       ║
║                   ▼                                                       ║
║  ┌──────────────────────────────────────────────┐                        ║
║  │  Google Maps Directions API                  │                        ║
║  │──────────────────────────────────────────────│                        ║
║  │ Request:                                     │                        ║
║  │   origin: 32.7767,-96.7970                   │                        ║
║  │   destination: 32.7831,-96.8067              │                        ║
║  │   mode: driving                              │                        ║
║  │                                              │                        ║
║  │ Response:                                    │                        ║
║  │   distance: 3.2 km                           │                        ║
║  │   duration: 15 minutes                       │                        ║
║  │   polyline: encoded route geometry           │                        ║
║  └──────────────────────────────────────────────┘                        ║
║                   │                                                       ║
║                   │ Return Response                                       ║
║                   ▼                                                       ║
║  ┌─────────────────────────┐                                             ║
║  │  Patient App            │                                             ║
║  │─────────────────────────│                                             ║
║  │ Display:                │                                             ║
║  │ ✓ ETA: 15 minutes       │                                             ║
║  │ ✓ Distance: 3.2 km      │                                             ║
║  │ ✓ Provider on map       │                                             ║
║  │ ✓ Estimated arrival:    │                                             ║
║  │   2:45 PM               │                                             ║
║  └─────────────────────────┘                                             ║
║                                                                           ║
║  PHASE 3: Nearby Provider Search                                         ║
║  ════════════════════════════════════                                    ║
║                                                                           ║
║  Redis GEORADIUS Command:                                                ║
║  ─────────────────────────                                               ║
║  GEORADIUS providers:locations 32.7767 -96.7970 10 km                   ║
║           WITHDIST ASC                                                   ║
║                                                                           ║
║  Returns providers within 10km radius, sorted by distance:               ║
║  ► Provider A - 2.3 km                                                   ║
║  ► Provider B - 4.7 km                                                   ║
║  ► Provider C - 8.1 km                                                   ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

@Service
public class LocationTrackingService {

    @Autowired
    private RedisTemplate<String, LocationData> redisTemplate;

    @Autowired
    private KafkaTemplate<String, LocationUpdateEvent> kafkaTemplate;

    @Autowired
    private RestTemplate mapsApiClient;

    // Update provider location (called every 30 seconds from mobile app)
    @Scheduled(fixedDelay = 30000)
    public void updateProviderLocation(String providerId, LocationData location) {
        String key = "provider:location:" + providerId;

        // Store in Redis with 5-minute TTL
        redisTemplate.opsForValue().set(
            key,
            location,
            Duration.ofMinutes(5)
        );

        // Publish location update event to Kafka
        kafkaTemplate.send("location-updates",
            new LocationUpdateEvent(providerId, location));

        System.out.println("Location updated for provider: " + providerId);
    }

    // Calculate ETA from provider to patient
    public ETAResponse calculateETA(String providerId, String patientId) {
        // Get provider's current location from Redis
        LocationData providerLocation = redisTemplate.opsForValue()
            .get("provider:location:" + providerId);

        if (providerLocation == null) {
            throw new ProviderLocationNotAvailableException(
                "Provider location not available"
            );
        }

        // Get patient address
        PatientAddress patientAddress =
            patientService.getPatientAddress(patientId);

        // Call Google Maps Directions API
        String url = "https://maps.googleapis.com/maps/api/directions/json" +
            "?origin=" + providerLocation.getLatitude() + "," +
                         providerLocation.getLongitude() +
            "&destination=" + patientAddress.getLatitude() + "," +
                              patientAddress.getLongitude() +
            "&key=" + googleMapsApiKey;

        DirectionsResponse response = mapsApiClient.getForObject(
            url,
            DirectionsResponse.class
        );

        // Parse ETA
        int durationSeconds = response.getRoutes().get(0)
            .getLegs().get(0)
            .getDuration()
            .getValue();

        return new ETAResponse(
            providerId,
            patientId,
            durationSeconds / 60, // Convert to minutes
            LocalDateTime.now().plusSeconds(durationSeconds)
        );
    }

    // Get providers near a location (radius search)
    public List<ProviderLocation> findProvidersNearby(
            double latitude,
            double longitude,
            double radiusKm) {

        // Redis GEO operations
        return redisTemplate.opsForGeo()
            .radius(
                "providers:locations",
                new Circle(new Point(longitude, latitude), radiusKm),
                GeoRadiusCommandArgs.newGeoRadiusArgs()
                    .includeDistance()
                    .sortAscending()
            )
            .getContent()
            .stream()
            .map(result -> new ProviderLocation(
                result.getContent().getName(),
                result.getDistance().getValue(),
                result.getPoint()
            ))
            .collect(Collectors.toList());
    }
}

// ============================================================================
// 3. APPOINTMENT SERVICE - Scheduling and notifications
// ============================================================================

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                   📅 APPOINTMENT SERVICE FLOW 📅                          ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │                  Appointment Scheduling Workflow                    │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                           ║
║  Step 1: Check Provider Availability                                     ║
║  ════════════════════════════════════                                    ║
║  ┌──────────────┐       ┌──────────────────────────────────┐            ║
║  │   Patient    │       │   Appointment Service            │            ║
║  │   or Staff   │──────►│                                  │            ║
║  └──────────────┘       │  ● validateAvailability()        │            ║
║         │               │  ● checkConflicts()              │            ║
║         │               │  ● verifyInsurance()             │            ║
║         │               └────────┬─────────────────────────┘            ║
║         │                        │                                       ║
║         │                        ▼                                       ║
║         │               ┌────────────────────────┐                       ║
║         │               │ Provider Schedule DB   │                       ║
║         │               │────────────────────────│                       ║
║         │               │ SELECT * FROM          │                       ║
║         │               │ appointments WHERE     │                       ║
║         │               │ provider_id = ?        │                       ║
║         │               │ AND date = ?           │                       ║
║         │               │ AND status != 'CANCEL' │                       ║
║         │               └────────────────────────┘                       ║
║         │                        │                                       ║
║         │          ┌─────────────┴─────────────┐                         ║
║         │          │                           │                         ║
║         │     Available                   Not Available                  ║
║         │          │                           │                         ║
║         │          ▼                           ▼                         ║
║         │   ┌──────────────┐          ┌──────────────────┐              ║
║         │   │ Continue     │          │ Return Error     │              ║
║         │   │ Booking      │          │ 409 Conflict     │              ║
║         │   └──────┬───────┘          └──────────────────┘              ║
║         │          │                                                     ║
║         │          ▼                                                     ║
║  Step 2: Create Appointment                                              ║
║  ═══════════════════════════                                             ║
║         │   ┌──────────────────────────────────────┐                     ║
║         │   │  Create Appointment Record           │                     ║
║         │   │──────────────────────────────────────│                     ║
║         │   │  INSERT INTO appointments            │                     ║
║         │   │  (patient_id, provider_id,           │                     ║
║         │   │   scheduled_date, type, status)      │                     ║
║         │   │  VALUES (?, ?, ?, 'HOME_VISIT',      │                     ║
║         │   │         'SCHEDULED')                 │                     ║
║         │   └────────────────┬─────────────────────┘                     ║
║         │                    │                                           ║
║         │                    ▼                                           ║
║  Step 3: Send Notifications                                              ║
║  ═══════════════════════                                                 ║
║         │          ┌─────────────────┐                                   ║
║         │          │  Kafka Event    │                                   ║
║         │          │  Bus            │                                   ║
║         │          │─────────────────│                                   ║
║         │          │ Topic:          │                                   ║
║         │          │ "appointment-   │                                   ║
║         │          │  created"       │                                   ║
║         │          └────────┬────────┘                                   ║
║         │                   │                                            ║
║         │     ┌─────────────┼─────────────┐                              ║
║         │     │             │             │                              ║
║         │     ▼             ▼             ▼                              ║
║         │  ┌──────┐    ┌────────┐   ┌────────────┐                      ║
║         │  │ SMS  │    │ Email  │   │ Push       │                      ║
║         │  │Twilio│    │SendGrid│   │Notification│                      ║
║         │  └──┬───┘    └───┬────┘   └─────┬──────┘                      ║
║         │     │            │              │                              ║
║         │     ▼            ▼              ▼                              ║
║         │  ┌────────────────────────────────────┐                        ║
║         │  │ "Appointment scheduled for         │                        ║
║         │  │  March 15, 2024 at 2:00 PM"        │                        ║
║         │  │  Provider: Dr. Smith               │                        ║
║         │  │  Location: 123 Main St"            │                        ║
║         │  └────────────────────────────────────┘                        ║
║         │                                                                ║
║  Step 4: Schedule Reminder (24 hours before)                             ║
║  ════════════════════════════════════════════                            ║
║         │          ┌─────────────────────────┐                           ║
║         │          │  Scheduled Job          │                           ║
║         │          │─────────────────────────│                           ║
║         │          │  @Scheduled(cron)       │                           ║
║         │          │  Daily at 9:00 AM       │                           ║
║         │          │                         │                           ║
║         │          │  Find appointments      │                           ║
║         │          │  tomorrow & send        │                           ║
║         │          │  reminders              │                           ║
║         │          └─────────────────────────┘                           ║
║         │                                                                ║
║  Step 5: Check-in & Completion                                           ║
║  ══════════════════════════════                                          ║
║         │     ┌────────────┐    ┌──────────┐    ┌────────────┐          ║
║         │     │ SCHEDULED  │───►│CONFIRMED │───►│ COMPLETED  │          ║
║         │     └────────────┘    └──────────┘    └────────────┘          ║
║         │          │                                    │                ║
║         │          │                                    │                ║
║         │          ▼                                    ▼                ║
║         │     ┌────────────┐                   ┌────────────────┐       ║
║         │     │  CANCELLED │                   │ Trigger Billing│       ║
║         │     └────────────┘                   │ & Claims       │       ║
║         │          │                           └────────────────┘       ║
║         │          ▼                                                     ║
║         │     ┌────────────┐                                             ║
║         │     │  NO_SHOW   │                                             ║
║         │     │  (penalty) │                                             ║
║         │     └────────────┘                                             ║
║         │                                                                ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

@Service
public class AppointmentService {

    @Transactional
    public Appointment scheduleHomeVisit(AppointmentRequest request) {
        // Validate provider availability
        if (!providerService.isAvailable(request.getProviderId(),
                                         request.getScheduledDate())) {
            throw new ProviderUnavailableException();
        }

        // Create appointment
        Appointment appointment = new Appointment();
        appointment.setPatient(getPatient(request.getPatientId()));
        appointment.setProvider(getProvider(request.getProviderId()));
        appointment.setScheduledDate(request.getScheduledDate());
        appointment.setType(AppointmentType.HOME_VISIT);
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        Appointment saved = appointmentRepository.save(appointment);

        // Send notifications
        notificationService.sendSMS(
            saved.getPatient().getPhone(),
            "Appointment scheduled for " + saved.getScheduledDate()
        );

        // Publish event for downstream services
        kafkaTemplate.send("appointment-created",
            new AppointmentCreatedEvent(saved));

        return saved;
    }
}

// ============================================================================
// 4. INSURANCE SERVICE - Claims submission with HL7/FHIR
// ============================================================================

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║              🏥 INSURANCE CLAIM FLOW (HL7/FHIR) 🏥                        ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  Trigger: Visit Completed Event                                          ║
║  ═══════════════════════════════                                         ║
║                                                                           ║
║  ┌────────────────────┐                                                  ║
║  │  Clinical Service  │                                                  ║
║  │  (Visit Complete)  │                                                  ║
║  └──────────┬─────────┘                                                  ║
║             │                                                            ║
║             │ Publish Event                                              ║
║             ▼                                                            ║
║  ┌────────────────────────────────────────┐                              ║
║  │  Kafka Event Bus                       │                              ║
║  │────────────────────────────────────────│                              ║
║  │  Topic: "visit-completed"              │                              ║
║  │  Event: {                              │                              ║
║  │    visitId: "v-12345",                 │                              ║
║  │    patientId: "p-67890",               │                              ║
║  │    diagnoses: ["I10", "E11.9"],        │                              ║
║  │    procedures: ["99213"],              │                              ║
║  │    completedAt: "2024-03-15T..."       │                              ║
║  │  }                                     │                              ║
║  └──────────────────┬─────────────────────┘                              ║
║                     │                                                    ║
║                     │ @KafkaListener                                     ║
║                     ▼                                                    ║
║  ┌───────────────────────────────────────────────────────┐               ║
║  │        Insurance Service (Spring Boot)                │               ║
║  │        Port: 8084                                     │               ║
║  │  ┌─────────────────────────────────────────────────┐  │               ║
║  │  │ @KafkaListener                                  │  │               ║
║  │  │ processVisitCompletion(event)                   │  │               ║
║  │  │                                                 │  │               ║
║  │  │ Step 1: Retrieve Patient & Visit Data          │  │               ║
║  │  │ ────────────────────────────────────           │  │               ║
║  │  │ ► Get Patient from PatientService              │  │               ║
║  │  │ ► Get Visit Details from VisitService          │  │               ║
║  │  │ ► Get Insurance Info                           │  │               ║
║  │  └──────────────────┬──────────────────────────────┘  │               ║
║  │                     │                                  │               ║
║  │  ┌──────────────────▼──────────────────────────────┐  │               ║
║  │  │ Step 2: Convert to FHIR Claim Resource         │  │               ║
║  │  │ ───────────────────────────────────────         │  │               ║
║  │  │                                                 │  │               ║
║  │  │  FHIR R4 Claim Resource:                       │  │               ║
║  │  │  {                                             │  │               ║
║  │  │    "resourceType": "Claim",                    │  │               ║
║  │  │    "patient": {                                │  │               ║
║  │  │      "reference": "Patient/p-67890"            │  │               ║
║  │  │    },                                          │  │               ║
║  │  │    "insurance": [{                             │  │               ║
║  │  │      "coverage": {                             │  │               ║
║  │  │        "reference": "Coverage/cov-123"         │  │               ║
║  │  │      }                                         │  │               ║
║  │  │    }],                                         │  │               ║
║  │  │    "diagnosis": [{                             │  │               ║
║  │  │      "diagnosisCodeableConcept": {             │  │               ║
║  │  │        "coding": [{                            │  │               ║
║  │  │          "system": "ICD-10",                   │  │               ║
║  │  │          "code": "I10",                        │  │               ║
║  │  │          "display": "Essential HTN"            │  │               ║
║  │  │        }]                                      │  │               ║
║  │  │      }                                         │  │               ║
║  │  │    }],                                         │  │               ║
║  │  │    "item": [{                                  │  │               ║
║  │  │      "productOrService": {                     │  │               ║
║  │  │        "coding": [{                            │  │               ║
║  │  │          "system": "CPT",                      │  │               ║
║  │  │          "code": "99213"                       │  │               ║
║  │  │        }]                                      │  │               ║
║  │  │      },                                        │  │               ║
║  │  │      "unitPrice": {                            │  │               ║
║  │  │        "value": 150.00,                        │  │               ║
║  │  │        "currency": "USD"                       │  │               ║
║  │  │      }                                         │  │               ║
║  │  │    }]                                          │  │               ║
║  │  │  }                                             │  │               ║
║  │  └──────────────────┬──────────────────────────────┘  │               ║
║  └─────────────────────┼──────────────────────────────────┘               ║
║                        │                                                 ║
║                        │ HTTPS POST                                      ║
║                        ▼                                                 ║
║  ┌───────────────────────────────────────────────────────┐               ║
║  │    Insurance Company FHIR API Endpoint                │               ║
║  │───────────────────────────────────────────────────────│               ║
║  │  POST https://payer.example.com/fhir/Claim            │               ║
║  │  Authorization: Bearer {oauth_token}                  │               ║
║  │  Content-Type: application/fhir+json                  │               ║
║  │                                                       │               ║
║  │  Processing:                                          │               ║
║  │  ► Validate FHIR Resource                             │               ║
║  │  ► Check Patient Eligibility                          │               ║
║  │  ► Verify Coverage Active                             │               ║
║  │  ► Apply Billing Rules                                │               ║
║  │  ► Calculate Adjudication                             │               ║
║  └──────────────────────┬────────────────────────────────┘               ║
║                         │                                                ║
║                         │ Response                                       ║
║                         ▼                                                ║
║  ┌───────────────────────────────────────────────────────┐               ║
║  │  FHIR ClaimResponse Resource                          │               ║
║  │───────────────────────────────────────────────────────│               ║
║  │  {                                                    │               ║
║  │    "resourceType": "ClaimResponse",                   │               ║
║  │    "status": "active",                                │               ║
║  │    "outcome": "complete",                             │               ║
║  │    "item": [{                                         │               ║
║  │      "adjudication": [{                               │               ║
║  │        "category": {                                  │               ║
║  │          "coding": [{                                 │               ║
║  │            "code": "eligible"                         │               ║
║  │          }]                                           │               ║
║  │        },                                             │               ║
║  │        "amount": {                                    │               ║
║  │          "value": 120.00,                             │               ║
║  │          "currency": "USD"                            │               ║
║  │        }                                              │               ║
║  │      }, {                                             │               ║
║  │        "category": {                                  │               ║
║  │          "coding": [{                                 │               ║
║  │            "code": "copay"                            │               ║
║  │          }]                                           │               ║
║  │        },                                             │               ║
║  │        "amount": {                                    │               ║
║  │          "value": 30.00,                              │               ║
║  │          "currency": "USD"                            │               ║
║  │        }                                              │               ║
║  │      }]                                               │               ║
║  │    }]                                                 │               ║
║  │  }                                                    │               ║
║  └──────────────────────┬────────────────────────────────┘               ║
║                         │                                                ║
║                         ▼                                                ║
║  ┌───────────────────────────────────────┐                               ║
║  │  Insurance Service                    │                               ║
║  │  Update Claim Status                  │                               ║
║  │───────────────────────────────────────│                               ║
║  │  ✓ Claim Accepted                     │                               ║
║  │  ✓ Allowed Amount: $120.00            │                               ║
║  │  ✓ Patient Copay: $30.00              │                               ║
║  │  ✓ Status: APPROVED                   │                               ║
║  └───────────────────────────────────────┘                               ║
║                         │                                                ║
║                         │ Publish Event                                  ║
║                         ▼                                                ║
║  ┌───────────────────────────────────────┐                               ║
║  │  Kafka: "claim-approved"              │                               ║
║  └──────────┬────────────────────────────┘                               ║
║             │                                                            ║
║   ┌─────────┴─────────┐                                                  ║
║   ▼                   ▼                                                  ║
║ ┌────────┐      ┌──────────┐                                             ║
║ │Billing │      │ Patient  │                                             ║
║ │Service │      │  Portal  │                                             ║
║ └────────┘      └──────────┘                                             ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

@Service
public class InsuranceClaimService {

    @KafkaListener(topics = "visit-completed", groupId = "insurance-service")
    public void processVisitCompletion(VisitCompletedEvent event) {
        // Retrieve patient and visit data
        Patient patient = patientService.getPatient(event.getPatientId());
        Visit visit = visitService.getVisit(event.getVisitId());

        // Convert to FHIR Claim resource
        Claim fhirClaim = fhirConverter.toFhirClaim(patient, visit);

        // Submit to insurance company via FHIR API
        ClaimResponse response = insuranceClient.submitClaim(
            patient.getInsurance().getPayerId(),
            fhirClaim
        );

        // Update claim status
        updateClaimStatus(event.getVisitId(), response);
    }

    public Claim toFhirClaim(Patient patient, Visit visit) {
        Claim claim = new Claim();

        // Patient reference
        claim.setPatient(new Reference("Patient/" + patient.getId()));

        // Insurance information
        claim.setInsurance(List.of(
            new InsuranceComponent()
                .setFocal(true)
                .setCoverage(new Reference(
                    "Coverage/" + patient.getInsurance().getCoverageId()
                ))
        ));

        // Diagnosis codes
        for (Diagnosis diagnosis : visit.getDiagnoses()) {
            claim.addDiagnosis(
                new DiagnosisComponent()
                    .setDiagnosisCodeableConcept(
                        new CodeableConcept().addCoding(
                            new Coding()
                                .setSystem("http://hl7.org/fhir/sid/icd-10")
                                .setCode(diagnosis.getIcd10Code())
                        )
                    )
            );
        }

        return claim;
    }
}

// ============================================================================
// 5. SECURITY - HIPAA compliance with audit logging
// ============================================================================

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                 🔐 HIPAA SECURITY & AUDIT FLOW 🔐                         ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  Request Flow with Security Layers                                       ║
║  ══════════════════════════════════                                      ║
║                                                                           ║
║  ┌──────────────────┐                                                    ║
║  │   User (Doctor/  │                                                    ║
║  │   Nurse/Admin)   │                                                    ║
║  └────────┬─────────┘                                                    ║
║           │                                                              ║
║           │ Request: GET /api/v1/patients/12345                          ║
║           │ Authorization: Bearer eyJhbGciOiJSUzI1NiIs...                ║
║           │                                                              ║
║           ▼                                                              ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 1: TLS/SSL Encryption                                ║          ║
║  ║ ════════════════════════════                               ║          ║
║  ║ ✓ HTTPS Only (Port 443)                                   ║          ║
║  ║ ✓ TLS 1.3                                                 ║          ║
║  ║ ✓ Strong Cipher Suites                                    ║          ║
║  ║ ✓ Certificate Validation                                  ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 2: API Gateway (Kong/AWS)                            ║          ║
║  ║ ════════════════════════════════                           ║          ║
║  ║ ✓ Rate Limiting (100 req/min per user)                    ║          ║
║  ║ ✓ IP Whitelisting                                         ║          ║
║  ║ ✓ DDoS Protection                                         ║          ║
║  ║ ✓ Request Validation                                      ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 3: JWT Token Validation                              ║          ║
║  ║ ════════════════════════════                               ║          ║
║  ║  @Component                                                ║          ║
║  ║  JwtAuthenticationFilter                                   ║          ║
║  ║                                                            ║          ║
║  ║  Validate:                                                 ║          ║
║  ║  ► Token not expired                                       ║          ║
║  ║  ► Valid signature (RSA-256)                               ║          ║
║  ║  ► Issuer matches                                          ║          ║
║  ║  ► Audience correct                                        ║          ║
║  ║                                                            ║          ║
║  ║  Extract Claims:                                           ║          ║
║  ║  ► userId: "dr.smith@hospital.com"                         ║          ║
║  ║  ► roles: ["DOCTOR", "ADMIN"]                              ║          ║
║  ║  ► permissions: ["READ_PATIENT", "WRITE_PATIENT"]          ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 4: Role-Based Access Control (RBAC)                  ║          ║
║  ║ ═══════════════════════════════════════                    ║          ║
║  ║  @PreAuthorize("hasRole('DOCTOR') or hasRole('NURSE')")    ║          ║
║  ║                                                            ║          ║
║  ║  Authorization Matrix:                                     ║          ║
║  ║  ┌────────────┬────────┬────────┬────────┐                ║          ║
║  ║  │ Resource   │ Doctor │ Nurse  │ Admin  │                ║          ║
║  ║  ├────────────┼────────┼────────┼────────┤                ║          ║
║  ║  │ Read Pt    │   ✓    │   ✓    │   ✓    │                ║          ║
║  ║  │ Write Pt   │   ✓    │   ✓    │   ✓    │                ║          ║
║  ║  │ Delete Pt  │   ✗    │   ✗    │   ✓    │                ║          ║
║  ║  │ Prescribe  │   ✓    │   ✗    │   ✗    │                ║          ║
║  ║  │ View Bills │   ✗    │   ✗    │   ✓    │                ║          ║
║  ║  └────────────┴────────┴────────┴────────┘                ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 5: Attribute-Based Access (Policy Enforcement)       ║          ║
║  ║ ═════════════════════════════════════════════              ║          ║
║  ║  Open Policy Agent (OPA) Check:                            ║          ║
║  ║                                                            ║          ║
║  ║  Input:                                                    ║          ║
║  ║  {                                                         ║          ║
║  ║    user: "dr.smith",                                       ║          ║
║  ║    resource: "patient/12345",                              ║          ║
║  ║    action: "read",                                         ║          ║
║  ║    context: {                                              ║          ║
║  ║      userDepartment: "Cardiology",                         ║          ║
║  ║      patientDepartment: "Cardiology",                      ║          ║
║  ║      assignedPatients: ["12345", "67890"]                  ║          ║
║  ║    }                                                       ║          ║
║  ║  }                                                         ║          ║
║  ║                                                            ║          ║
║  ║  Policy Decision: ALLOW                                    ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 6: HIPAA Audit Logging (AOP Aspect)                  ║          ║
║  ║ ══════════════════════════════════════                     ║          ║
║  ║  @Around("@annotation(PHIAccess)")                         ║          ║
║  ║  public Object auditPHIAccess(ProceedingJoinPoint pjp)     ║          ║
║  ║                                                            ║          ║
║  ║  Log Record:                                               ║          ║
║  ║  {                                                         ║          ║
║  ║    timestamp: "2024-03-15T14:30:22Z",                      ║          ║
║  ║    userId: "dr.smith@hospital.com",                        ║          ║
║  ║    action: "getPatient",                                   ║          ║
║  ║    resourceType: "PATIENT_DATA",                           ║          ║
║  ║    resourceId: "12345",                                    ║          ║
║  ║    ipAddress: "192.168.1.100",                             ║          ║
║  ║    userAgent: "Mozilla/5.0...",                            ║          ║
║  ║    success: true,                                          ║          ║
║  ║    responseTime: "45ms"                                    ║          ║
║  ║  }                                                         ║          ║
║  ║                                                            ║          ║
║  ║  ⚠ Stored in tamper-proof audit log (Write-Once-Read-Many)║          ║
║  ║  ⚠ Retained for 7 years (HIPAA requirement)               ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ╔════════════════════════════════════════════════════════════╗          ║
║  ║ LAYER 7: Data Access & Encryption                          ║          ║
║  ║ ══════════════════════════════                             ║          ║
║  ║  PostgreSQL Database:                                      ║          ║
║  ║                                                            ║          ║
║  ║  SELECT id, first_name, last_name,                         ║          ║
║  ║         pgp_sym_decrypt(ssn_encrypted, :key) as ssn,       ║          ║
║  ║         date_of_birth                                      ║          ║
║  ║  FROM patients                                             ║          ║
║  ║  WHERE id = :patientId                                     ║          ║
║  ║                                                            ║          ║
║  ║  Encryption:                                               ║          ║
║  ║  ✓ AES-256-GCM for PHI fields                              ║          ║
║  ║  ✓ TDE (Transparent Data Encryption)                       ║          ║
║  ║  ✓ Encrypted backups                                       ║          ║
║  ║  ✓ Key rotation every 90 days                              ║          ║
║  ╚════════════════════╦═══════════════════════════════════════╝          ║
║                       │                                                  ║
║                       ▼                                                  ║
║  ┌─────────────────────────────────────────┐                             ║
║  │  Response (JSON)                        │                             ║
║  │─────────────────────────────────────────│                             ║
║  │  {                                      │                             ║
║  │    "id": "12345",                       │                             ║
║  │    "firstName": "John",                 │                             ║
║  │    "lastName": "Doe",                   │                             ║
║  │    "dateOfBirth": "1980-05-15",         │                             ║
║  │    "ssn": "***-**-6789"  (masked)       │                             ║
║  │  }                                      │                             ║
║  └─────────────────────────────────────────┘                             ║
║                       │                                                  ║
║                       │ Encrypted response                               ║
║                       ▼                                                  ║
║  ┌──────────────────┐                                                    ║
║  │   User receives  │                                                    ║
║  │   decrypted data │                                                    ║
║  └──────────────────┘                                                    ║
║                                                                           ║
║  Break-the-Glass Emergency Access:                                       ║
║  ══════════════════════════════════                                      ║
║  In life-threatening emergencies, authorized staff can override          ║
║  normal access controls. ALL break-the-glass accesses:                   ║
║  ► Trigger immediate alerts to Security Team                             ║
║  ► Require post-access justification within 24 hours                     ║
║  ► Generate incident reports for compliance review                       ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

@Aspect
@Component
public class PHIAuditAspect {

    @Around("@annotation(PHIAccess)")
    public Object auditPHIAccess(ProceedingJoinPoint joinPoint) throws Throwable {
        Authentication auth = SecurityContextHolder.getContext()
            .getAuthentication();

        AuditLog log = AuditLog.builder()
            .userId(auth.getName())
            .action(joinPoint.getSignature().getName())
            .resourceType("PATIENT_DATA")
            .resourceId(extractResourceId(joinPoint))
            .timestamp(Instant.now())
            .ipAddress(getClientIP())
            .userAgent(getUserAgent())
            .build();

        // Log before access
        auditRepository.save(log);

        try {
            Object result = joinPoint.proceed();
            log.setSuccess(true);
            return result;
        } catch (Exception e) {
            log.setSuccess(false);
            log.setErrorMessage(e.getMessage());
            throw e;
        } finally {
            auditRepository.save(log);
        }
    }
}

@Service
public class EncryptionService {

    private static final String ALGORITHM = "AES/GCM/NoPadding";

    public String encryptSSN(String ssn) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, getEncryptionKey());

            byte[] encrypted = cipher.doFinal(
                ssn.getBytes(StandardCharsets.UTF_8)
            );

            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new EncryptionException("Failed to encrypt SSN", e);
        }
    }
}

// ============================================================================
// 6. DATABASE SCHEMA - PostgreSQL for structured data
// ============================================================================

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                   📊 DATABASE SCHEMA (PostgreSQL) 📊                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  Entity Relationship Diagram                                             ║
║  ════════════════════════                                                ║
║                                                                           ║
║  ┌─────────────────────────────────────┐                                 ║
║  │           PATIENTS                  │                                 ║
║  ├─────────────────────────────────────┤                                 ║
║  │ • id (PK)          BIGSERIAL        │                                 ║
║  │ • external_id      VARCHAR(255) ⚷   │                                 ║
║  │ • first_name       VARCHAR(100)     │                                 ║
║  │ • last_name        VARCHAR(100)     │                                 ║
║  │ • date_of_birth    DATE             │                                 ║
║  │ • gender           VARCHAR(20)      │                                 ║
║  │ • ssn_encrypted    VARCHAR(255) 🔒  │                                 ║
║  │ • phone            VARCHAR(20)      │                                 ║
║  │ • email            VARCHAR(255)     │                                 ║
║  │ • insurance_id     BIGINT (FK) ─────┼──┐                              ║
║  │ • created_at       TIMESTAMP        │  │                              ║
║  │ • updated_at       TIMESTAMP        │  │                              ║
║  │ • created_by       VARCHAR(100)     │  │                              ║
║  │ • updated_by       VARCHAR(100)     │  │                              ║
║  └────────────┬────────────────────────┘  │                              ║
║               │                            │                              ║
║               │ 1:N                        │                              ║
║               │                            │                              ║
║               ▼                            │                              ║
║  ┌─────────────────────────────────────┐  │                              ║
║  │        APPOINTMENTS                 │  │                              ║
║  ├─────────────────────────────────────┤  │                              ║
║  │ • id (PK)          BIGSERIAL        │  │                              ║
║  │ • patient_id (FK)  BIGINT       ────┼──┘                              ║
║  │ • provider_id (FK) BIGINT       ────┼──┐                              ║
║  │ • appointment_type VARCHAR(50)      │  │                              ║
║  │ • status           VARCHAR(50)      │  │                              ║
║  │ • scheduled_date   TIMESTAMP        │  │                              ║
║  │ • duration_minutes INT              │  │                              ║
║  │ • location_lat     DECIMAL(10,8)    │  │                              ║
║  │ • location_lng     DECIMAL(11,8)    │  │                              ║
║  │ • address          TEXT             │  │                              ║
║  │ • notes            TEXT             │  │                              ║
║  │ • reminder_sent_at TIMESTAMP        │  │                              ║
║  │ • created_at       TIMESTAMP        │  │                              ║
║  └────────────┬────────────────────────┘  │                              ║
║               │                            │                              ║
║               │ 1:N                        │                              ║
║               │                            │                              ║
║               ▼                            │                              ║
║  ┌─────────────────────────────────────┐  │                              ║
║  │        CLINICAL_NOTES               │  │                              ║
║  ├─────────────────────────────────────┤  │                              ║
║  │ • id (PK)          UUID             │  │                              ║
║  │ • patient_id (FK)  BIGINT           │  │                              ║
║  │ • provider_id (FK) BIGINT       ────┼──┤                              ║
║  │ • encounter_id (FK)BIGINT           │  │                              ║
║  │ • note_type        VARCHAR(50)      │  │                              ║
║  │ • subjective       TEXT             │  │                              ║
║  │ • objective        TEXT             │  │                              ║
║  │ • assessment       TEXT             │  │                              ║
║  │ • plan             TEXT             │  │                              ║
║  │ • status           VARCHAR(50)      │  │                              ║
║  │ • note_datetime    TIMESTAMP        │  │                              ║
║  │ • signed_datetime  TIMESTAMP        │  │                              ║
║  │ • signature        VARCHAR(500) 🔒  │  │                              ║
║  │ • version          INT              │  │                              ║
║  │ • created_at       TIMESTAMP        │  │                              ║
║  └─────────────────────────────────────┘  │                              ║
║                                            │                              ║
║                                            │ 1:N                          ║
║                                            │                              ║
║  ┌─────────────────────────────────────┐  │                              ║
║  │          PROVIDERS                  │◄─┘                              ║
║  ├─────────────────────────────────────┤                                 ║
║  │ • id (PK)          BIGSERIAL        │                                 ║
║  │ • external_id      VARCHAR(255) ⚷   │                                 ║
║  │ • first_name       VARCHAR(100)     │                                 ║
║  │ • last_name        VARCHAR(100)     │                                 ║
║  │ • npi_number       VARCHAR(10) ⚷    │                                 ║
║  │ • dea_number       VARCHAR(20) 🔒   │                                 ║
║  │ • specialty        VARCHAR(100)     │                                 ║
║  │ • license_number   VARCHAR(50)      │                                 ║
║  │ • license_state    VARCHAR(2)       │                                 ║
║  │ • phone            VARCHAR(20)      │                                 ║
║  │ • email            VARCHAR(255)     │                                 ║
║  │ • status           VARCHAR(20)      │                                 ║
║  │ • created_at       TIMESTAMP        │                                 ║
║  └─────────────────────────────────────┘                                 ║
║                                                                           ║
║  ┌─────────────────────────────────────┐                                 ║
║  │        PRESCRIPTIONS                │                                 ║
║  ├─────────────────────────────────────┤                                 ║
║  │ • id (PK)          UUID             │                                 ║
║  │ • patient_id (FK)  BIGINT           │                                 ║
║  │ • provider_id (FK) BIGINT           │                                 ║
║  │ • medication_name  VARCHAR(200)     │                                 ║
║  │ • dosage           VARCHAR(100)     │                                 ║
║  │ • frequency        VARCHAR(100)     │                                 ║
║  │ • quantity         INT              │                                 ║
║  │ • refills          INT              │                                 ║
║  │ • dea_schedule     VARCHAR(10)      │                                 ║
║  │ • instructions     VARCHAR(500)     │                                 ║
║  │ • status           VARCHAR(50)      │                                 ║
║  │ • prescribed_date  DATE             │                                 ║
║  │ • expiration_date  DATE             │                                 ║
║  │ • signature        VARCHAR(500) 🔒  │                                 ║
║  │ • created_at       TIMESTAMP        │                                 ║
║  └─────────────────────────────────────┘                                 ║
║                                                                           ║
║  ┌─────────────────────────────────────┐                                 ║
║  │         INSURANCE_INFO              │                                 ║
║  ├─────────────────────────────────────┤                                 ║
║  │ • id (PK)          BIGSERIAL        │                                 ║
║  │ • patient_id (FK)  BIGINT           │                                 ║
║  │ • payer_id         VARCHAR(50)      │                                 ║
║  │ • payer_name       VARCHAR(200)     │                                 ║
║  │ • member_id        VARCHAR(50)      │                                 ║
║  │ • group_number     VARCHAR(50)      │                                 ║
║  │ • coverage_type    VARCHAR(50)      │                                 ║
║  │ • effective_date   DATE             │                                 ║
║  │ • termination_date DATE             │                                 ║
║  │ • copay_amount     DECIMAL(10,2)    │                                 ║
║  │ • deductible       DECIMAL(10,2)    │                                 ║
║  │ • out_of_pocket_max DECIMAL(10,2)   │                                 ║
║  │ • status           VARCHAR(20)      │                                 ║
║  │ • created_at       TIMESTAMP        │                                 ║
║  │ • updated_at       TIMESTAMP        │                                 ║
║  └─────────────────────────────────────┘                                 ║
║                                                                           ║
║  ┌─────────────────────────────────────┐                                 ║
║  │           AUDIT_LOGS                │                                 ║
║  ├─────────────────────────────────────┤                                 ║
║  │ • id (PK)          BIGSERIAL        │                                 ║
║  │ • user_id          VARCHAR(255)     │                                 ║
║  │ • event            VARCHAR(100)     │                                 ║
║  │ • resource_type    VARCHAR(100)     │                                 ║
║  │ • resource_id      VARCHAR(255)     │                                 ║
║  │ • description      TEXT             │                                 ║
║  │ • ip_address       VARCHAR(45)      │                                 ║
║  │ • user_agent       VARCHAR(500)     │                                 ║
║  │ • success          BOOLEAN          │                                 ║
║  │ • error_message    TEXT             │                                 ║
║  │ • timestamp        TIMESTAMP        │                                 ║
║  └─────────────────────────────────────┘                                 ║
║                                                                           ║
║  Indexes & Constraints                                                   ║
║  ═════════════════════                                                   ║
║                                                                           ║
║  CREATE INDEX idx_appointments_provider_date                             ║
║      ON appointments(provider_id, scheduled_date);                       ║
║                                                                           ║
║  CREATE INDEX idx_appointments_patient                                   ║
║      ON appointments(patient_id) WHERE status != 'CANCELLED';            ║
║                                                                           ║
║  CREATE INDEX idx_clinical_notes_patient                                 ║
║      ON clinical_notes(patient_id, note_datetime DESC);                  ║
║                                                                           ║
║  CREATE INDEX idx_prescriptions_patient_active                           ║
║      ON prescriptions(patient_id) WHERE status = 'ACTIVE';               ║
║                                                                           ║
║  CREATE INDEX idx_audit_logs_timestamp                                   ║
║      ON audit_logs(timestamp DESC);                                      ║
║                                                                           ║
║  CREATE INDEX idx_audit_logs_user_resource                               ║
║      ON audit_logs(user_id, resource_type, resource_id);                 ║
║                                                                           ║
║  Legend:                                                                 ║
║  ───────                                                                 ║
║  • PK = Primary Key                                                      ║
║  • FK = Foreign Key                                                      ║
║  • ⚷ = Unique Constraint                                                 ║
║  • 🔒 = Encrypted Field                                                  ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================
// 7. KUBERNETES DEPLOYMENT - Container orchestration
// ============================================================================

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║              ☸️  KUBERNETES DEPLOYMENT ARCHITECTURE ☸️                    ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  Multi-Region Kubernetes Cluster                                         ║
║  ═══════════════════════════════                                         ║
║                                                                           ║
║  ┌──────────────────────────────────────────────────────────────────┐    ║
║  │                      AWS EKS / Google GKE                        │    ║
║  │                    Production Cluster (US-East)                  │    ║
║  │──────────────────────────────────────────────────────────────────│    ║
║  │                                                                  │    ║
║  │  Namespace: medical-app-prod                                     │    ║
║  │  ═══════════════════════════                                     │    ║
║  │                                                                  │    ║
║  │  ┌──────────────────────────────────────────────────────┐       │    ║
║  │  │      Patient Service Deployment                      │       │    ║
║  │  │──────────────────────────────────────────────────────│       │    ║
║  │  │  Replicas: 3 (Auto-scaling: 3-10)                   │       │    ║
║  │  │                                                      │       │    ║
║  │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │       │    ║
║  │  │  │   Pod 1    │  │   Pod 2    │  │   Pod 3    │    │       │    ║
║  │  │  │────────────│  │────────────│  │────────────│    │       │    ║
║  │  │  │Container:  │  │Container:  │  │Container:  │    │       │    ║
║  │  │  │patient-svc │  │patient-svc │  │patient-svc │    │       │    ║
║  │  │  │:v1.2.3     │  │:v1.2.3     │  │:v1.2.3     │    │       │    ║
║  │  │  │            │  │            │  │            │    │       │    ║
║  │  │  │Port: 8081  │  │Port: 8081  │  │Port: 8081  │    │       │    ║
║  │  │  │CPU: 500m   │  │CPU: 500m   │  │CPU: 500m   │    │       │    ║
║  │  │  │Mem: 512Mi  │  │Mem: 512Mi  │  │Mem: 512Mi  │    │       │    ║
║  │  │  │            │  │            │  │            │    │       │    ║
║  │  │  │Health:     │  │Health:     │  │Health:     │    │       │    ║
║  │  │  │✓ Ready     │  │✓ Ready     │  │✓ Ready     │    │       │    ║
║  │  │  └────────────┘  └────────────┘  └────────────┘    │       │    ║
║  │  │                                                      │       │    ║
║  │  │  LoadBalancer Service (ClusterIP)                   │       │    ║
║  │  │  ► Distributes traffic across pods                  │       │    ║
║  │  └──────────────────────────────────────────────────────┘       │    ║
║  │                                                                  │    ║
║  │  ┌──────────────────────────────────────────────────────┐       │    ║
║  │  │    Appointment Service Deployment                    │       │    ║
║  │  │──────────────────────────────────────────────────────│       │    ║
║  │  │  Replicas: 2 (Auto-scaling: 2-8)                    │       │    ║
║  │  │  ┌────────────┐  ┌────────────┐                     │       │    ║
║  │  │  │   Pod 1    │  │   Pod 2    │                     │       │    ║
║  │  │  │appt-svc    │  │appt-svc    │                     │       │    ║
║  │  │  │:v1.2.3     │  │:v1.2.3     │                     │       │    ║
║  │  │  └────────────┘  └────────────┘                     │       │    ║
║  │  └──────────────────────────────────────────────────────┘       │    ║
║  │                                                                  │    ║
║  │  ┌──────────────────────────────────────────────────────┐       │    ║
║  │  │      Location Service Deployment                     │       │    ║
║  │  │──────────────────────────────────────────────────────│       │    ║
║  │  │  Replicas: 2 (Auto-scaling: 2-6)                    │       │    ║
║  │  │  ┌────────────┐  ┌────────────┐                     │       │    ║
║  │  │  │   Pod 1    │  │   Pod 2    │                     │       │    ║
║  │  │  │location-svc│  │location-svc│                     │       │    ║
║  │  │  │:v1.2.3     │  │:v1.2.3     │                     │       │    ║
║  │  │  └────────────┘  └────────────┘                     │       │    ║
║  │  └──────────────────────────────────────────────────────┘       │    ║
║  │                                                                  │    ║
║  │  ┌──────────────────────────────────────────────────────┐       │    ║
║  │  │      Stateful Services                               │       │    ║
║  │  │──────────────────────────────────────────────────────│       │    ║
║  │  │                                                      │       │    ║
║  │  │  ┌─────────────────┐  ┌──────────────────┐          │       │    ║
║  │  │  │  PostgreSQL     │  │   Redis Cluster  │          │       │    ║
║  │  │  │  StatefulSet    │  │   StatefulSet    │          │       │    ║
║  │  │  │─────────────────│  │──────────────────│          │       │    ║
║  │  │  │  Replicas: 3    │  │   Replicas: 6    │          │       │    ║
║  │  │  │  (Primary+2x    │  │   (3 Masters +   │          │       │    ║
║  │  │  │   Replicas)     │  │    3 Replicas)   │          │       │    ║
║  │  │  │                 │  │                  │          │       │    ║
║  │  │  │  PVC: 100Gi     │  │  PVC: 50Gi       │          │       │    ║
║  │  │  │  Storage Class: │  │  Storage Class:  │          │       │    ║
║  │  │  │  gp3-encrypted  │  │  gp3-encrypted   │          │       │    ║
║  │  │  └─────────────────┘  └──────────────────┘          │       │    ║
║  │  │                                                      │       │    ║
║  │  │  ┌─────────────────┐  ┌──────────────────┐          │       │    ║
║  │  │  │  Kafka Cluster  │  │   MongoDB        │          │       │    ║
║  │  │  │  StatefulSet    │  │   StatefulSet    │          │       │    ║
║  │  │  │─────────────────│  │──────────────────│          │       │    ║
║  │  │  │  Replicas: 3    │  │   Replicas: 3    │          │       │    ║
║  │  │  │  (Brokers)      │  │   (ReplicaSet)   │          │       │    ║
║  │  │  │                 │  │                  │          │       │    ║
║  │  │  │  PVC: 200Gi     │  │  PVC: 200Gi      │          │       │    ║
║  │  │  │  Retention: 7d  │  │  WiredTiger      │          │       │    ║
║  │  │  └─────────────────┘  └──────────────────┘          │       │    ║
║  │  └──────────────────────────────────────────────────────┘       │    ║
║  │                                                                  │    ║
║  │  ConfigMaps & Secrets                                            │    ║
║  │  ═══════════════════                                             │    ║
║  │  ● app-config (ConfigMap)                                        │    ║
║  │  ● db-credentials (Sealed Secret)                                │    ║
║  │  ● api-keys (Sealed Secret)                                      │    ║
║  │  ● tls-certs (Certificate via cert-manager)                      │    ║
║  │                                                                  │    ║
║  └──────────────────────────────────────────────────────────────────┘    ║
║                                                                           ║
║  Deployment Manifest Example:                                            ║
║  ════════════════════════════                                            ║
║                                                                           ║
║  apiVersion: apps/v1                                                     ║
║  kind: Deployment                                                        ║
║  metadata:                                                               ║
║    name: patient-service                                                 ║
║    namespace: medical-app-prod                                           ║
║    labels:                                                               ║
║      app: patient-service                                                ║
║      version: v1.2.3                                                     ║
║  spec:                                                                   ║
║    replicas: 3                                                           ║
║    strategy:                                                             ║
║      type: RollingUpdate                                                 ║
║      rollingUpdate:                                                      ║
║        maxSurge: 1                                                       ║
║        maxUnavailable: 0                                                 ║
║    selector:                                                             ║
║      matchLabels:                                                        ║
║        app: patient-service                                              ║
║    template:                                                             ║
║      metadata:                                                           ║
║        labels:                                                           ║
║          app: patient-service                                            ║
║          version: v1.2.3                                                 ║
║      spec:                                                               ║
║        containers:                                                       ║
║        - name: patient-service                                           ║
║          image: registry.example.com/patient-service:v1.2.3              ║
║          ports:                                                          ║
║          - containerPort: 8081                                           ║
║            name: http                                                    ║
║          - containerPort: 9090                                           ║
║            name: metrics                                                 ║
║          env:                                                            ║
║          - name: SPRING_PROFILES_ACTIVE                                  ║
║            value: "production"                                           ║
║          - name: KAFKA_BOOTSTRAP_SERVERS                                 ║
║            value: "kafka.medical-app-prod.svc:9092"                      ║
║          - name: DATABASE_URL                                            ║
║            valueFrom:                                                    ║
║              secretKeyRef:                                               ║
║                name: db-credentials                                      ║
║                key: url                                                  ║
║          resources:                                                      ║
║            requests:                                                     ║
║              memory: "512Mi"                                             ║
║              cpu: "500m"                                                 ║
║            limits:                                                       ║
║              memory: "1Gi"                                               ║
║              cpu: "1000m"                                                ║
║          livenessProbe:                                                  ║
║            httpGet:                                                      ║
║              path: /actuator/health/liveness                             ║
║              port: 8081                                                  ║
║            initialDelaySeconds: 60                                       ║
║            periodSeconds: 10                                             ║
║            timeoutSeconds: 5                                             ║
║            failureThreshold: 3                                           ║
║          readinessProbe:                                                 ║
║            httpGet:                                                      ║
║              path: /actuator/health/readiness                            ║
║              port: 8081                                                  ║
║            initialDelaySeconds: 30                                       ║
║            periodSeconds: 5                                              ║
║            timeoutSeconds: 3                                             ║
║            failureThreshold: 3                                           ║
║          startupProbe:                                                   ║
║            httpGet:                                                      ║
║              path: /actuator/health/startup                              ║
║              port: 8081                                                  ║
║            initialDelaySeconds: 0                                        ║
║            periodSeconds: 5                                              ║
║            failureThreshold: 30                                          ║
║                                                                           ║
║  Horizontal Pod Autoscaler (HPA):                                        ║
║  ═════════════════════════════════                                       ║
║                                                                           ║
║  apiVersion: autoscaling/v2                                              ║
║  kind: HorizontalPodAutoscaler                                           ║
║  metadata:                                                               ║
║    name: patient-service-hpa                                             ║
║  spec:                                                                   ║
║    scaleTargetRef:                                                       ║
║      apiVersion: apps/v1                                                 ║
║      kind: Deployment                                                    ║
║      name: patient-service                                               ║
║    minReplicas: 3                                                        ║
║    maxReplicas: 10                                                       ║
║    metrics:                                                              ║
║    - type: Resource                                                      ║
║      resource:                                                           ║
║        name: cpu                                                         ║
║        target:                                                           ║
║          type: Utilization                                               ║
║          averageUtilization: 70                                          ║
║    - type: Resource                                                      ║
║      resource:                                                           ║
║        name: memory                                                      ║
║        target:                                                           ║
║          type: Utilization                                               ║
║          averageUtilization: 80                                          ║
║                                                                           ║
║  Service Mesh (Istio):                                                   ║
║  ══════════════════════                                                  ║
║  ✓ mTLS between services                                                 ║
║  ✓ Circuit breakers                                                      ║
║  ✓ Retry policies                                                        ║
║  ✓ Traffic splitting (Canary deployments)                                ║
║  ✓ Observability (Tracing, Metrics)                                      ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================
// 8. API EXAMPLES
// ============================================================================

/*
POST /api/v1/appointments
Authorization: Bearer {JWT_TOKEN}

Request:
{
  "patientId": "12345",
  "providerId": "67890",
  "appointmentType": "HOME_VISIT",
  "scheduledDate": "2024-03-15T10:00:00Z",
  "location": {
    "address": "123 Main St, Dallas, TX 75201",
    "lat": 32.7767,
    "lng": -96.7970
  }
}

Response:
{
  "appointmentId": "app-123456",
  "status": "SCHEDULED",
  "estimatedArrival": "2024-03-15T09:55:00Z",
  "confirmationCode": "ABC123"
}
*/

// ============================================================================
// 9. AI/ML INTEGRATION - LLM for Clinical Coding + Vector DB for RAG
// ============================================================================

@Service
public class ClinicalCodingAI {

    private final OpenAIClient openAIClient;
    private final PineconeClient vectorDB;

    // AI-powered ICD-10 coding using GPT-4
    public Mono<List<DiagnosisCode>> suggestDiagnosisCodes(String clinicalNote) {
        String prompt = """
            You are a medical coding expert. Analyze this clinical note
            and suggest appropriate ICD-10 codes with confidence scores:

            """ + clinicalNote;

        return openAIClient.createChatCompletion(
            ChatCompletionRequest.builder()
                .model("gpt-4-turbo")
                .messages(List.of(
                    new ChatMessage("system", "You are a medical coding AI"),
                    new ChatMessage("user", prompt)
                ))
                .temperature(0.3)
                .build()
        ).map(this::parseICD10Codes);
    }

    // RAG: Retrieve similar cases from vector database
    public Mono<List<SimilarCase>> findSimilarCases(String clinicalNote) {
        // Generate embedding for query
        return openAIClient.createEmbedding(clinicalNote, "text-embedding-3-large")
            .flatMap(embedding ->
                // Search vector DB for similar cases
                vectorDB.query(
                    QueryRequest.builder()
                        .vector(embedding.getData().get(0).getEmbedding())
                        .topK(5)
                        .includeMetadata(true)
                        .build()
                )
            )
            .map(queryResponse -> queryResponse.getMatches().stream()
                .map(match -> new SimilarCase(
                    (String) match.getMetadata().get("patientId"),
                    (String) match.getMetadata().get("diagnosis"),
                    match.getScore()
                ))
                .toList()
            );
    }
}

// ============================================================================
// 10. OBSERVABILITY - OpenTelemetry + Distributed Tracing
// ============================================================================

@Configuration
public class ObservabilityConfig {

    @Bean
    public OpenTelemetry openTelemetry() {
        Resource resource = Resource.getDefault()
            .merge(Resource.create(Attributes.of(
                ResourceAttributes.SERVICE_NAME, "patient-service",
                ResourceAttributes.SERVICE_VERSION, "1.0.0"
            )));

        SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
            .addSpanProcessor(BatchSpanProcessor.builder(
                OtlpGrpcSpanExporter.builder()
                    .setEndpoint("http://jaeger:4317")
                    .build()
            ).build())
            .setResource(resource)
            .build();

        return OpenTelemetrySdk.builder()
            .setTracerProvider(tracerProvider)
            .setPropagators(ContextPropagators.create(
                W3CTraceContextPropagator.getInstance()
            ))
            .buildAndRegisterGlobal();
    }
}

@Service
public class TracedPatientService {

    private final Tracer tracer;

    public PatientDTO getPatient(UUID patientId) {
        Span span = tracer.spanBuilder("getPatient")
            .setAttribute("patient.id", patientId.toString())
            .startSpan();

        try (Scope scope = span.makeCurrent()) {
            PatientDTO patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException(patientId));

            span.setAttribute("patient.found", true);
            return patient;
        } catch (Exception e) {
            span.recordException(e);
            span.setStatus(StatusCode.ERROR, e.getMessage());
            throw e;
        } finally {
            span.end();
        }
    }
}

// ============================================================================
// 11. GITOPS - ArgoCD + Terraform + Kubernetes
// ============================================================================

// Terraform Infrastructure as Code
// terraform/main.tf
/*
terraform required_providers:
  - aws: hashicorp/aws ~> 5.0
  - kubernetes: hashicorp/kubernetes ~> 2.23

EKS Cluster Configuration:
  cluster_name: medical-app-production
  cluster_version: 1.28
  vpc_id: from module.vpc
  subnet_ids: private subnets
  enable_irsa: true

  eks_managed_node_groups:
    general:
      desired_size: 3
      min_size: 2
      max_size: 10
      instance_types: t3.xlarge
      capacity_type: SPOT

ArgoCD Application Manifest:
  apiVersion: argoproj.io/v1alpha1
  kind: Application
  metadata:
    name: patient-service
    namespace: argocd
  spec:
    project: medical-app
    source:
      repoURL: github.com/org/medical-app
      targetRevision: main
      path: k8s/patient-service
    destination:
      server: kubernetes.default.svc
      namespace: medical-app
    syncPolicy:
      automated: true
      prune: true
      selfHeal: true
*/

@Configuration
public class KubernetesConfig {

    // Kubernetes client for dynamic resource management
    @Bean
    public KubernetesClient kubernetesClient() {
        return new DefaultKubernetesClient();
    }

    // Health check probes configuration
    @Bean
    public HealthIndicator kubernetesHealthIndicator(KubernetesClient client) {
        return () -> {
            try {
                client.pods().inNamespace("medical-app").list();
                return Health.up()
                    .withDetail("kubernetes", "connected")
                    .build();
            } catch (Exception e) {
                return Health.down()
                    .withDetail("kubernetes", "disconnected")
                    .withDetail("error", e.getMessage())
                    .build();
            }
        };
    }
}

// ============================================================================
// 12. ZERO-TRUST SECURITY - OPA + Vault + mTLS
// ============================================================================

@Configuration
public class ZeroTrustSecurityConfig {

    // HashiCorp Vault for secrets management
    @Bean
    public VaultTemplate vaultTemplate() {
        VaultEndpoint endpoint = VaultEndpoint.create("vault.example.com", 8200);
        endpoint.setScheme("https");

        ClientAuthentication auth = new TokenAuthentication(
            System.getenv("VAULT_TOKEN")
        );

        return new VaultTemplate(endpoint, auth);
    }

    // Open Policy Agent (OPA) for policy enforcement
    @Bean
    public OpaClient opaClient() {
        return OpaClient.builder()
            .url("http://opa:8181")
            .build();
    }
}

@Service
public class PolicyEnforcementService {

    private final OpaClient opaClient;

    public boolean authorizeAccess(String userId, String resource, String action) {
        OpaQueryRequest request = OpaQueryRequest.builder()
            .input(Map.of(
                "user", userId,
                "resource", resource,
                "action", action
            ))
            .build();

        OpaQueryResponse response = opaClient.queryForDocument(
            "medical/authz/allow",
            request
        );

        return response.getResult();
    }
}

// Rego policy example (Open Policy Agent)
/*
package medical.authz

import future.keywords.if

default allow = false

allow if {
    input.action == "read"
    input.user.roles[_] == "doctor"
    input.resource.type == "patient"
}

allow if {
    input.action == "write"
    input.user.roles[_] == "nurse"
    input.resource.type == "vitals"
    input.user.assignedPatients[_] == input.resource.patientId
}
*/

// Output: Modern cloud-native architecture
// - Spring Boot 3.x with Virtual Threads (Project Loom)
// - Reactive programming with WebFlux for real-time features
// - Event-driven architecture with Kafka + EventBridge
// - AI/ML integration with GPT-4 and Vector DB (Pinecone)
// - Zero-trust security with Vault, OPA, and mTLS
// - Full observability with OpenTelemetry + distributed tracing
// - GitOps with ArgoCD + Terraform IaC
// - Multi-cloud active-active with AWS + Azure DR`
      }
    },
    {
      id: 1,
      title: '🏥 Patient Management',
      color: '#10b981',
      description: 'Comprehensive patient record management system',
      content: {
        overview: 'Patient Management system handles patient demographics, medical history, allergies, medications, and clinical notes. Implements HIPAA-compliant access controls and audit logging.',
        keyPoints: [
          'Patient demographics and insurance information',
          'Medical history and family history tracking',
          'Allergy and medication management',
          'Clinical notes with versioning',
          'HIPAA-compliant audit trails',
          'Patient portal for self-service access',
          'Emergency contact management',
          'Consent and authorization tracking'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Patient Entity Model (JPA)
// ═══════════════════════════════════════════════════════════════════════════

@Entity
@Table(name = "patients")
public class Patient {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(unique = true, nullable = false)
  private String mrn; // Medical Record Number

  @Column(nullable = false)
  private LocalDate dateOfBirth;

  @Enumerated(EnumType.STRING)
  private Gender gender;

  @Embedded
  private ContactInfo contactInfo;

  @Embedded
  private Insurance insurance;

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<Allergy> allergies = new ArrayList<>();

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<Medication> medications = new ArrayList<>();

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<ClinicalNote> clinicalNotes = new ArrayList<>();

  @CreatedDate
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;

  // HIPAA audit fields
  @Column(nullable = false)
  private String createdBy;

  @Column(nullable = false)
  private String lastModifiedBy;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Patient Service - Business Logic & HIPAA Audit Logging
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PatientService {

  @Autowired
  private PatientRepository patientRepository;

  @Autowired
  private AuditService auditService;

  @Transactional
  public Patient createPatient(PatientDTO dto, String userId) {
    // Validate required fields
    validatePatient(dto);

    // Check for duplicate MRN
    if (patientRepository.existsByMrn(dto.getMrn())) {
      throw new DuplicateMrnException("Patient with MRN already exists");
    }

    Patient patient = new Patient();
    patient.setFirstName(dto.getFirstName());
    patient.setLastName(dto.getLastName());
    patient.setMrn(generateMrn());
    patient.setDateOfBirth(dto.getDateOfBirth());
    patient.setGender(dto.getGender());
    patient.setContactInfo(dto.getContactInfo());
    patient.setInsurance(dto.getInsurance());
    patient.setCreatedBy(userId);
    patient.setLastModifiedBy(userId);

    Patient saved = patientRepository.save(patient);

    // HIPAA audit log
    auditService.logAccess(
      AuditEvent.PATIENT_CREATED,
      userId,
      saved.getId(),
      "Created patient: " + saved.getMrn()
    );

    return saved;
  }

  @Transactional(readOnly = true)
  @PreAuthorize("hasPermission(#patientId, 'Patient', 'READ')")
  public Patient getPatient(UUID patientId, String userId) {
    Patient patient = patientRepository.findById(patientId)
      .orElseThrow(() -> new PatientNotFoundException());

    // HIPAA audit log - every access must be logged
    auditService.logAccess(
      AuditEvent.PATIENT_ACCESSED,
      userId,
      patientId,
      "Viewed patient record"
    );

    return patient;
  }

  private String generateMrn() {
    // Generate unique MRN with checksum
    return "MRN" + System.currentTimeMillis() +
           RandomStringUtils.randomNumeric(4);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ REST Controller - Patient API Endpoints
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/v1/patients")
@Validated
public class PatientController {

  @Autowired
  private PatientService patientService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<PatientDTO> createPatient(
      @Valid @RequestBody PatientDTO dto,
      @AuthenticationPrincipal UserDetails userDetails) {

    Patient patient = patientService.createPatient(dto, userDetails.getUsername());
    return ResponseEntity.ok(PatientMapper.toDTO(patient));
  }

  @GetMapping("/{id}")
  public ResponseEntity<PatientDTO> getPatient(
      @PathVariable UUID id,
      @AuthenticationPrincipal UserDetails userDetails) {

    Patient patient = patientService.getPatient(id, userDetails.getUsername());
    return ResponseEntity.ok(PatientMapper.toDTO(patient));
  }
}

// Output: Patient created with MRN: MRN17098765431234
// Audit log: User john.doe accessed patient MRN17098765431234`
      }
    },
    {
      id: 2,
      title: '📅 Appointment Scheduling',
      color: '#3b82f6',
      description: 'Advanced appointment scheduling with conflict detection',
      content: {
        overview: 'Appointment Scheduling system manages provider calendars, patient appointments, waitlists, and automated reminders. Implements conflict detection and resource optimization.',
        keyPoints: [
          'Provider calendar management with availability',
          'Appointment booking with conflict detection',
          'Waitlist management and automatic filling',
          'SMS/Email appointment reminders',
          'Recurring appointment scheduling',
          'No-show tracking and penalties',
          'Multi-provider coordination',
          'Telemedicine appointment support'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Appointment Entity Model
// ═══════════════════════════════════════════════════════════════════════════

@Entity
@Table(name = "appointments")
public class Appointment {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "patient_id", nullable = false)
  private Patient patient;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "provider_id", nullable = false)
  private Provider provider;

  @Column(nullable = false)
  private LocalDateTime appointmentDateTime;

  @Column(nullable = false)
  private Integer durationMinutes;

  @Enumerated(EnumType.STRING)
  private AppointmentType type; // IN_PERSON, TELEMEDICINE

  @Enumerated(EnumType.STRING)
  private AppointmentStatus status; // SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW

  @Column(length = 1000)
  private String reason;

  private String notes;

  private LocalDateTime reminderSentAt;

  @CreatedDate
  private LocalDateTime createdAt;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Appointment Service - Scheduling & Conflict Detection
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class AppointmentService {

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private ProviderAvailabilityService availabilityService;

  @Autowired
  private NotificationService notificationService;

  @Transactional
  public Appointment scheduleAppointment(AppointmentRequest request) {
    // Check provider availability
    if (!availabilityService.isAvailable(
        request.getProviderId(),
        request.getDateTime(),
        request.getDurationMinutes())) {
      throw new TimeSlotUnavailableException("Provider not available");
    }

    // Check for conflicts
    List<Appointment> conflicts = appointmentRepository
      .findConflictingAppointments(
        request.getProviderId(),
        request.getDateTime(),
        request.getDurationMinutes()
      );

    if (!conflicts.isEmpty()) {
      throw new AppointmentConflictException("Time slot already booked");
    }

    // Create appointment
    Appointment appointment = new Appointment();
    appointment.setPatient(getPatient(request.getPatientId()));
    appointment.setProvider(getProvider(request.getProviderId()));
    appointment.setAppointmentDateTime(request.getDateTime());
    appointment.setDurationMinutes(request.getDurationMinutes());
    appointment.setType(request.getType());
    appointment.setStatus(AppointmentStatus.SCHEDULED);
    appointment.setReason(request.getReason());

    Appointment saved = appointmentRepository.save(appointment);

    // Send confirmation
    notificationService.sendAppointmentConfirmation(saved);

    // Schedule reminder (24 hours before)
    scheduleReminder(saved);

    return saved;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Automated Reminder System (Spring Scheduler)
// ═══════════════════════════════════════════════════════════════════════════

@Scheduled(cron = "0 0 9 * * *") // Daily at 9 AM
public void sendAppointmentReminders() {
  LocalDateTime tomorrow = LocalDateTime.now().plusDays(1);
  LocalDateTime startOfDay = tomorrow.toLocalDate().atStartOfDay();
  LocalDateTime endOfDay = tomorrow.toLocalDate().atTime(23, 59, 59);

  List<Appointment> upcomingAppointments = appointmentRepository
    .findByAppointmentDateTimeBetweenAndStatus(
      startOfDay,
      endOfDay,
      AppointmentStatus.SCHEDULED
    );

  for (Appointment appointment : upcomingAppointments) {
    if (appointment.getReminderSentAt() == null) {
      notificationService.sendReminder(appointment);
      appointment.setReminderSentAt(LocalDateTime.now());
      appointmentRepository.save(appointment);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ No-Show Tracking & Waitlist Management
// ═══════════════════════════════════════════════════════════════════════════

@Transactional
public void markNoShow(UUID appointmentId) {
  Appointment appointment = appointmentRepository.findById(appointmentId)
    .orElseThrow(() -> new AppointmentNotFoundException());

  appointment.setStatus(AppointmentStatus.NO_SHOW);
  appointmentRepository.save(appointment);

  // Track no-show count for patient
  patientService.incrementNoShowCount(appointment.getPatient().getId());

  // Try to fill from waitlist
  waitlistService.notifyWaitingPatients(
    appointment.getProvider().getId(),
    appointment.getAppointmentDateTime()
  );
}

// Output: Appointment scheduled for 2024-03-15 14:00
// Confirmation sent to patient via SMS and email`
      }
    },
    {
      id: 3,
      title: '💊 Prescription Management',
      color: '#8b5cf6',
      description: 'E-prescribing with drug interaction checking',
      content: {
        overview: 'Prescription Management system handles electronic prescriptions, drug interaction checking, pharmacy integration, and refill management. Complies with DEA regulations for controlled substances.',
        keyPoints: [
          'Electronic prescription creation (e-prescribing)',
          'Drug interaction and allergy checking',
          'Controlled substance tracking (EPCS)',
          'Pharmacy integration via NCPDP',
          'Prescription history and refills',
          'Medication adherence tracking',
          'Formulary checking and alternatives',
          'Prior authorization workflows'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Prescription Entity Model
// ═══════════════════════════════════════════════════════════════════════════

@Entity
@Table(name = "prescriptions")
public class Prescription {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "patient_id", nullable = false)
  private Patient patient;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "provider_id", nullable = false)
  private Provider provider;

  @Column(nullable = false)
  private String medicationName;

  @Column(nullable = false)
  private String dosage;

  @Column(nullable = false)
  private String frequency;

  @Column(nullable = false)
  private Integer quantity;

  @Column(nullable = false)
  private Integer refills;

  @Enumerated(EnumType.STRING)
  private DEASchedule schedule; // For controlled substances

  @Column(length = 500)
  private String instructions;

  @Enumerated(EnumType.STRING)
  private PrescriptionStatus status;

  @Column(nullable = false)
  private LocalDate prescribedDate;

  private LocalDate expirationDate;

  // Electronic signature
  @Column(nullable = false)
  private String providerSignature;

  @CreatedDate
  private LocalDateTime createdAt;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ E-Prescribing Service - Drug Interaction & Allergy Checking
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PrescriptionService {

  @Autowired
  private PrescriptionRepository prescriptionRepository;

  @Autowired
  private DrugInteractionService drugInteractionService;

  @Autowired
  private PharmacyService pharmacyService;

  @Transactional
  public Prescription createPrescription(
      PrescriptionRequest request,
      String providerId) {

    Patient patient = getPatient(request.getPatientId());

    // Check for drug allergies
    List<Allergy> allergies = patient.getAllergies();
    if (hasAllergy(allergies, request.getMedicationName())) {
      throw new DrugAllergyException(
        "Patient allergic to " + request.getMedicationName()
      );
    }

    // Check for drug interactions
    List<Medication> currentMeds = patient.getMedications();
    List<DrugInteraction> interactions =
      drugInteractionService.checkInteractions(
        request.getMedicationName(),
        currentMeds
      );

    if (hasSevereInteraction(interactions)) {
      throw new DrugInteractionException(
        "Severe drug interaction detected: " + interactions
      );
    }

    // Check if controlled substance
    DEASchedule schedule = getDeaSchedule(request.getMedicationName());
    if (schedule != null) {
      validateControlledSubstancePrescription(request, providerId);
    }

    // Create prescription
    Prescription prescription = new Prescription();
    prescription.setPatient(patient);
    prescription.setProvider(getProvider(providerId));
    prescription.setMedicationName(request.getMedicationName());
    prescription.setDosage(request.getDosage());
    prescription.setFrequency(request.getFrequency());
    prescription.setQuantity(request.getQuantity());
    prescription.setRefills(request.getRefills());
    prescription.setSchedule(schedule);
    prescription.setInstructions(request.getInstructions());
    prescription.setStatus(PrescriptionStatus.ACTIVE);
    prescription.setPrescribedDate(LocalDate.now());
    prescription.setExpirationDate(calculateExpirationDate(schedule));
    prescription.setProviderSignature(signPrescription(providerId));

    Prescription saved = prescriptionRepository.save(prescription);

    // Send to pharmacy electronically (NCPDP)
    pharmacyService.sendElectronicPrescription(
      saved,
      request.getPharmacyId()
    );

    // Update patient medication list
    addToMedicationList(patient, saved);

    return saved;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Prescription Refill Management
// ═══════════════════════════════════════════════════════════════════════════

@Transactional
public void requestRefill(UUID prescriptionId, UUID patientId) {
  Prescription prescription = prescriptionRepository
    .findById(prescriptionId)
    .orElseThrow(() -> new PrescriptionNotFoundException());

  // Verify patient ownership
  if (!prescription.getPatient().getId().equals(patientId)) {
    throw new UnauthorizedAccessException();
  }

  // Check if refills available
  if (prescription.getRefills() <= 0) {
    throw new NoRefillsAvailableException(
      "No refills available. Contact provider."
    );
  }

  // Check expiration
  if (prescription.getExpirationDate().isBefore(LocalDate.now())) {
    throw new PrescriptionExpiredException(
      "Prescription expired. New prescription required."
    );
  }

  // Decrement refills
  prescription.setRefills(prescription.getRefills() - 1);
  prescriptionRepository.save(prescription);

  // Notify pharmacy
  pharmacyService.sendRefillRequest(prescription);
}

private LocalDate calculateExpirationDate(DEASchedule schedule) {
  if (schedule == null) {
    return LocalDate.now().plusYears(1); // Non-controlled: 1 year
  }

  // Controlled substances: 6 months max
  return LocalDate.now().plusMonths(6);
}

// Output: Prescription created for Lisinopril 10mg
// No drug interactions detected
// Electronic prescription sent to CVS Pharmacy #1234`
      }
    },
    {
      id: 4,
      title: '📋 Clinical Documentation',
      color: '#f59e0b',
      description: 'EHR clinical notes with ICD-10/CPT coding',
      content: {
        overview: 'Clinical Documentation system manages SOAP notes, progress notes, discharge summaries, and clinical orders. Integrates ICD-10 diagnosis codes and CPT procedure codes for billing.',
        keyPoints: [
          'SOAP note templates and customization',
          'ICD-10 diagnosis code integration',
          'CPT procedure code selection',
          'Clinical decision support',
          'Voice dictation and transcription',
          'Note co-signing workflows',
          'Amendment and addendum tracking',
          'Clinical documentation improvement (CDI)'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Clinical Note Entity Model with SOAP Structure
// ═══════════════════════════════════════════════════════════════════════════

@Entity
@Table(name = "clinical_notes")
public class ClinicalNote {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "patient_id", nullable = false)
  private Patient patient;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "provider_id", nullable = false)
  private Provider provider;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "encounter_id", nullable = false)
  private Encounter encounter;

  @Enumerated(EnumType.STRING)
  private NoteType type; // SOAP, PROGRESS, DISCHARGE, CONSULTATION

  @Column(length = 5000)
  private String subjective; // Patient's description

  @Column(length = 5000)
  private String objective; // Provider's observations

  @Column(length = 5000)
  private String assessment; // Diagnosis

  @Column(length = 5000)
  private String plan; // Treatment plan

  @ElementCollection
  @CollectionTable(name = "note_diagnoses")
  private List<DiagnosisCode> diagnosisCodes = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "note_procedures")
  private List<ProcedureCode> procedureCodes = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  private NoteStatus status; // DRAFT, SIGNED, AMENDED

  @Column(nullable = false)
  private LocalDateTime noteDateTime;

  private LocalDateTime signedDateTime;

  @Column(length = 2000)
  private String electronicsignature;

  @Version
  private Long version; // Optimistic locking

  @CreatedDate
  private LocalDateTime createdAt;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Medical Coding Models (ICD-10 and CPT)
// ═══════════════════════════════════════════════════════════════════════════

@Embeddable
public class DiagnosisCode {
  @Column(nullable = false)
  private String icd10Code; // e.g., "I10" for hypertension

  @Column(nullable = false)
  private String description;

  @Enumerated(EnumType.STRING)
  private DiagnosisType type; // PRIMARY, SECONDARY, RULE_OUT
}

@Embeddable
public class ProcedureCode {
  @Column(nullable = false)
  private String cptCode; // e.g., "99213" for office visit

  @Column(nullable = false)
  private String description;

  private String modifier; // CPT modifiers if applicable
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Clinical Note Creation with AI-Assisted Coding
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class ClinicalNoteService {

  @Autowired
  private ClinicalNoteRepository noteRepository;

  @Autowired
  private CodingService codingService;

  @Autowired
  private ClinicalDecisionSupport cdsService;

  @Transactional
  public ClinicalNote createSoapNote(SoapNoteRequest request, String providerId) {
    ClinicalNote note = new ClinicalNote();
    note.setPatient(getPatient(request.getPatientId()));
    note.setProvider(getProvider(providerId));
    note.setEncounter(getEncounter(request.getEncounterId()));
    note.setType(NoteType.SOAP);
    note.setSubjective(request.getSubjective());
    note.setObjective(request.getObjective());
    note.setAssessment(request.getAssessment());
    note.setPlan(request.getPlan());
    note.setNoteDateTime(LocalDateTime.now());
    note.setStatus(NoteStatus.DRAFT);

    // AI-assisted ICD-10 coding
    List<DiagnosisCode> suggestedCodes =
      codingService.suggestDiagnosisCodes(
        request.getAssessment(),
        request.getSubjective()
      );
    note.setDiagnosisCodes(suggestedCodes);

    // Suggest CPT codes based on encounter type
    List<ProcedureCode> procedureCodes =
      codingService.suggestProcedureCodes(
        request.getEncounterType(),
        request.getDuration()
      );
    note.setProcedureCodes(procedureCodes);

    // Clinical decision support
    List<CdsAlert> alerts = cdsService.analyzeNote(note);
    if (!alerts.isEmpty()) {
      // Return warnings to provider
      note.setCdsAlerts(alerts);
    }

    return noteRepository.save(note);
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Note Signing Workflow with Electronic Signature
// ═══════════════════════════════════════════════════════════════════════════

  @Transactional
  public void signNote(UUID noteId, String providerId, String signature) {
    ClinicalNote note = noteRepository.findById(noteId)
      .orElseThrow(() -> new NoteNotFoundException());

    // Verify provider authorization
    if (!note.getProvider().getId().equals(providerId)) {
      throw new UnauthorizedSignatureException();
    }

    // Verify note is complete
    if (!isNoteComplete(note)) {
      throw new IncompleteNoteException(
        "Note missing required fields"
      );
    }

    note.setStatus(NoteStatus.SIGNED);
    note.setSignedDateTime(LocalDateTime.now());
    note.setElectronicsignature(encryptSignature(signature));

    noteRepository.save(note);

    // Trigger billing workflow
    billingService.createClaim(note);
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Note Amendment and Addendum Tracking
// ═══════════════════════════════════════════════════════════════════════════

  @Transactional
  public ClinicalNote amendNote(
      UUID noteId,
      String amendment,
      String providerId) {

    ClinicalNote original = noteRepository.findById(noteId)
      .orElseThrow(() -> new NoteNotFoundException());

    if (original.getStatus() != NoteStatus.SIGNED) {
      throw new InvalidAmendmentException("Can only amend signed notes");
    }

    // Create amendment record
    Amendment amendmentRecord = new Amendment();
    amendmentRecord.setOriginalNote(original);
    amendmentRecord.setAmendmentText(amendment);
    amendmentRecord.setAmendedBy(providerId);
    amendmentRecord.setAmendedDateTime(LocalDateTime.now());

    original.setStatus(NoteStatus.AMENDED);
    original.getAmendments().add(amendmentRecord);

    return noteRepository.save(original);
  }

  private boolean isNoteComplete(ClinicalNote note) {
    return note.getSubjective() != null &&
           note.getObjective() != null &&
           note.getAssessment() != null &&
           note.getPlan() != null &&
           !note.getDiagnosisCodes().isEmpty();
  }
}

// Output: SOAP note created for patient MRN17098765431234
// Suggested ICD-10 codes: I10 (Hypertension), E11.9 (Type 2 Diabetes)
// Suggested CPT code: 99213 (Office visit, level 3)`
      }
    },
    {
      id: 5,
      title: '🔐 HIPAA Compliance',
      color: '#ef4444',
      description: 'HIPAA-compliant security and audit logging',
      content: {
        overview: 'HIPAA Compliance module ensures all PHI (Protected Health Information) access is logged, encrypted, and restricted. Implements the HIPAA Security Rule technical safeguards.',
        keyPoints: [
          'PHI encryption at rest and in transit',
          'Role-based access control (RBAC)',
          'Comprehensive audit logging',
          'Automatic session timeout',
          'Break-the-glass emergency access',
          'Data breach notification workflows',
          'Business Associate Agreement (BAA) tracking',
          'Regular security risk assessments'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Comprehensive Audit Logging Service
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class HipaaAuditService {

  @Autowired
  private AuditLogRepository auditLogRepository;

  @Autowired
  private EncryptionService encryptionService;

  public void logAccess(
      AuditEvent event,
      String userId,
      UUID resourceId,
      String description) {

    AuditLog log = new AuditLog();
    log.setEvent(event);
    log.setUserId(userId);
    log.setResourceId(resourceId);
    log.setDescription(description);
    log.setIpAddress(getCurrentIpAddress());
    log.setUserAgent(getCurrentUserAgent());
    log.setTimestamp(LocalDateTime.now());
    log.setAccessGranted(true);

    auditLogRepository.save(log);
  }

  public void logFailedAccess(
      String userId,
      UUID resourceId,
      String reason) {

    AuditLog log = new AuditLog();
    log.setEvent(AuditEvent.ACCESS_DENIED);
    log.setUserId(userId);
    log.setResourceId(resourceId);
    log.setDescription("Access denied: " + reason);
    log.setIpAddress(getCurrentIpAddress());
    log.setTimestamp(LocalDateTime.now());
    log.setAccessGranted(false);

    auditLogRepository.save(log);

    // Alert security team if suspicious
    if (isSuspiciousActivity(userId, resourceId)) {
      securityAlertService.notifySecurityTeam(log);
    }
  }

  @Scheduled(cron = "0 0 2 * * *") // Daily at 2 AM
  public void generateAuditReport() {
    LocalDateTime yesterday = LocalDateTime.now().minusDays(1);

    List<AuditLog> logs = auditLogRepository
      .findByTimestampAfter(yesterday);

    AuditReport report = new AuditReport();
    report.setTotalAccesses(logs.size());
    report.setFailedAccesses(
      logs.stream()
        .filter(l -> !l.isAccessGranted())
        .count()
    );
    report.setUniqueUsers(
      logs.stream()
        .map(AuditLog::getUserId)
        .distinct()
        .count()
    );

    // Send to compliance team
    complianceService.submitAuditReport(report);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ HIPAA Security Configuration with RBAC
// ═══════════════════════════════════════════════════════════════════════════

@Configuration
@EnableWebSecurity
public class HipaaSecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**").permitAll()
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .requestMatchers("/api/patient/**").hasAnyRole("DOCTOR", "NURSE", "ADMIN")
        .anyRequest().authenticated()
      )
      .sessionManagement(session -> session
        .maximumSessions(1)
        .expiredUrl("/session-expired")
        .maxSessionsPreventsLogin(true)
      )
      // Auto logout after 15 minutes of inactivity (HIPAA requirement)
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        .invalidSessionUrl("/session-invalid")
        .sessionFixation().migrateSession()
      )
      // HTTPS only
      .requiresChannel(channel -> channel
        .anyRequest().requiresSecure()
      )
      .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

    return http.build();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ PHI Encryption Service (AES-256-GCM)
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PhiEncryptionService {

  private static final String ALGORITHM = "AES/GCM/NoPadding";
  private static final int GCM_TAG_LENGTH = 128;

  @Value("\${hipaa.encryption.key}")
  private String encryptionKey;

  public String encryptPhi(String plainText) {
    try {
      SecretKey key = getSecretKey();
      Cipher cipher = Cipher.getInstance(ALGORITHM);

      // Generate random IV for each encryption
      byte[] iv = new byte[12];
      new SecureRandom().nextBytes(iv);
      GCMParameterSpec gcmSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);

      cipher.init(Cipher.ENCRYPT_MODE, key, gcmSpec);
      byte[] encrypted = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

      // Combine IV and encrypted data
      byte[] combined = new byte[iv.length + encrypted.length];
      System.arraycopy(iv, 0, combined, 0, iv.length);
      System.arraycopy(encrypted, 0, combined, iv.length, encrypted.length);

      return Base64.getEncoder().encodeToString(combined);
    } catch (Exception e) {
      throw new EncryptionException("Failed to encrypt PHI", e);
    }
  }

  public String decryptPhi(String encryptedText) {
    try {
      byte[] combined = Base64.getDecoder().decode(encryptedText);

      // Extract IV
      byte[] iv = new byte[12];
      System.arraycopy(combined, 0, iv, 0, 12);

      // Extract encrypted data
      byte[] encrypted = new byte[combined.length - 12];
      System.arraycopy(combined, 12, encrypted, 0, encrypted.length);

      SecretKey key = getSecretKey();
      Cipher cipher = Cipher.getInstance(ALGORITHM);
      GCMParameterSpec gcmSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);

      cipher.init(Cipher.DECRYPT_MODE, key, gcmSpec);
      byte[] decrypted = cipher.doFinal(encrypted);

      return new String(decrypted, StandardCharsets.UTF_8);
    } catch (Exception e) {
      throw new DecryptionException("Failed to decrypt PHI", e);
    }
  }
}

// Output: Audit log: User dr.smith accessed patient MRN12345
// All PHI encrypted with AES-256-GCM
// Session timeout: 15 minutes`
      }
    },
    {
      id: 6,
      title: '🔄 HL7/FHIR Integration',
      color: '#06b6d4',
      description: 'Healthcare interoperability with HL7 v2 and FHIR',
      content: {
        overview: 'HL7/FHIR Integration enables data exchange between healthcare systems. HL7 v2 for legacy systems, FHIR (Fast Healthcare Interoperability Resources) for modern REST APIs.',
        keyPoints: [
          'HL7 v2 message parsing (ADT, ORM, ORU)',
          'FHIR REST API implementation',
          'FHIR resource mapping (Patient, Observation, etc.)',
          'CDA (Clinical Document Architecture) support',
          'DICOM integration for medical imaging',
          'IHE (Integrating the Healthcare Enterprise) profiles',
          'Real-time ADT (Admit/Discharge/Transfer) feeds',
          'Lab results interface (ORU messages)'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ HL7 v2 Message Parser (ADT Messages)
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class Hl7MessageService {

  public void processAdtMessage(String hl7Message) throws HL7Exception {
    // Parse HL7 v2.5 ADT message
    HapiContext context = new DefaultHapiContext();
    Parser parser = context.getPipeParser();
    Message message = parser.parse(hl7Message);

    // ADT^A01 = Patient admission
    if (message instanceof ADT_A01) {
      ADT_A01 adtMessage = (ADT_A01) message;

      // Extract patient demographics from PID segment
      PID pid = adtMessage.getPID();
      String mrn = pid.getPatientIdentifierList(0).getIDNumber().getValue();
      String lastName = pid.getPatientName(0).getFamilyName().getSurname().getValue();
      String firstName = pid.getPatientName(0).getGivenName().getValue();
      String dob = pid.getDateTimeOfBirth().getValue();

      // Extract visit information from PV1 segment
      PV1 pv1 = adtMessage.getPV1();
      String visitNumber = pv1.getVisitNumber().getIDNumber().getValue();
      String patientClass = pv1.getPatientClass().getValue();
      String admitDateTime = pv1.getAdmitDateTime().getValue();

      // Update or create patient
      Patient patient = patientService.findByMrn(mrn);
      if (patient == null) {
        patient = new Patient();
        patient.setMrn(mrn);
      }
      patient.setFirstName(firstName);
      patient.setLastName(lastName);
      patient.setDateOfBirth(parseHl7Date(dob));
      patientService.save(patient);

      // Create encounter
      Encounter encounter = new Encounter();
      encounter.setPatient(patient);
      encounter.setVisitNumber(visitNumber);
      encounter.setPatientClass(patientClass);
      encounter.setAdmitDateTime(parseHl7DateTime(admitDateTime));
      encounterService.save(encounter);

      System.out.println("Processed ADT^A01: Patient " + mrn + " admitted");
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ FHIR REST API Controller (Search, Read, Create)
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/fhir")
public class FhirController {

  @Autowired
  private PatientService patientService;

  @Autowired
  private FhirConverter fhirConverter;

  // FHIR Patient Search
  @GetMapping("/Patient")
  public Bundle searchPatients(
      @RequestParam(required = false) String family,
      @RequestParam(required = false) String given,
      @RequestParam(required = false) String birthdate) {

    List<Patient> patients;

    if (family != null && given != null) {
      patients = patientService.findByName(given, family);
    } else if (birthdate != null) {
      LocalDate dob = LocalDate.parse(birthdate);
      patients = patientService.findByDateOfBirth(dob);
    } else {
      throw new InvalidRequestException("Search parameters required");
    }

    // Convert to FHIR Bundle
    Bundle bundle = new Bundle();
    bundle.setType(Bundle.BundleType.SEARCHSET);
    bundle.setTotal(patients.size());

    for (Patient patient : patients) {
      org.hl7.fhir.r4.model.Patient fhirPatient =
        fhirConverter.toFhirPatient(patient);

      Bundle.BundleEntryComponent entry = bundle.addEntry();
      entry.setResource(fhirPatient);
      entry.setFullUrl("/fhir/Patient/" + patient.getId());
    }

    return bundle;
  }

  // FHIR Patient Read
  @GetMapping("/Patient/{id}")
  public org.hl7.fhir.r4.model.Patient getPatient(@PathVariable UUID id) {
    Patient patient = patientService.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

    return fhirConverter.toFhirPatient(patient);
  }

  // FHIR Patient Create
  @PostMapping("/Patient")
  public ResponseEntity<org.hl7.fhir.r4.model.Patient> createPatient(
      @RequestBody org.hl7.fhir.r4.model.Patient fhirPatient) {

    // Convert FHIR to internal model
    Patient patient = fhirConverter.fromFhirPatient(fhirPatient);
    Patient saved = patientService.save(patient);

    org.hl7.fhir.r4.model.Patient response =
      fhirConverter.toFhirPatient(saved);

    return ResponseEntity
      .created(URI.create("/fhir/Patient/" + saved.getId()))
      .body(response);
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ FHIR Observation Resources (Lab Results with LOINC Codes)
// ═══════════════════════════════════════════════════════════════════════════

  // FHIR Observation (Lab Results)
  @GetMapping("/Observation")
  public Bundle searchObservations(
      @RequestParam String patient,
      @RequestParam(required = false) String code) {

    UUID patientId = UUID.fromString(patient);
    List<LabResult> labResults;

    if (code != null) {
      // LOINC code search
      labResults = labService.findByPatientAndLoincCode(patientId, code);
    } else {
      labResults = labService.findByPatient(patientId);
    }

    Bundle bundle = new Bundle();
    bundle.setType(Bundle.BundleType.SEARCHSET);
    bundle.setTotal(labResults.size());

    for (LabResult result : labResults) {
      Observation observation = fhirConverter.toFhirObservation(result);

      Bundle.BundleEntryComponent entry = bundle.addEntry();
      entry.setResource(observation);
      entry.setFullUrl("/fhir/Observation/" + result.getId());
    }

    return bundle;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ FHIR Resource Converter (Internal Model to FHIR)
// ═══════════════════════════════════════════════════════════════════════════

@Component
public class FhirConverter {

  public org.hl7.fhir.r4.model.Patient toFhirPatient(Patient patient) {
    org.hl7.fhir.r4.model.Patient fhirPatient =
      new org.hl7.fhir.r4.model.Patient();

    // Identifier (MRN)
    fhirPatient.addIdentifier()
      .setSystem("http://hospital.example.com/mrn")
      .setValue(patient.getMrn());

    // Name
    HumanName name = fhirPatient.addName();
    name.setFamily(patient.getLastName());
    name.addGiven(patient.getFirstName());
    name.setUse(HumanName.NameUse.OFFICIAL);

    // Birth date
    fhirPatient.setBirthDate(
      Date.from(patient.getDateOfBirth()
        .atStartOfDay(ZoneId.systemDefault())
        .toInstant())
    );

    // Gender
    if (patient.getGender() == Gender.MALE) {
      fhirPatient.setGender(Enumerations.AdministrativeGender.MALE);
    } else if (patient.getGender() == Gender.FEMALE) {
      fhirPatient.setGender(Enumerations.AdministrativeGender.FEMALE);
    }

    // Contact info
    if (patient.getContactInfo() != null) {
      ContactPoint phone = fhirPatient.addTelecom();
      phone.setSystem(ContactPoint.ContactPointSystem.PHONE);
      phone.setValue(patient.getContactInfo().getPhone());

      ContactPoint email = fhirPatient.addTelecom();
      email.setSystem(ContactPoint.ContactPointSystem.EMAIL);
      email.setValue(patient.getContactInfo().getEmail());

      Address address = fhirPatient.addAddress();
      address.addLine(patient.getContactInfo().getStreet());
      address.setCity(patient.getContactInfo().getCity());
      address.setState(patient.getContactInfo().getState());
      address.setPostalCode(patient.getContactInfo().getZip());
    }

    return fhirPatient;
  }
}

// Output: FHIR Patient resource created
// HL7 ADT^A01 message processed: Patient MRN12345 admitted
// FHIR Observation bundle returned with 12 lab results`
      }
    },
    {
      id: 7,
      title: '💰 Medical Billing',
      color: '#ec4899',
      description: 'Claims management and billing workflows',
      content: {
        overview: 'Medical Billing system handles insurance claims (CMS-1500, UB-04), EOB processing, patient statements, and payment posting. Integrates with clearinghouses for electronic claim submission.',
        keyPoints: [
          'CMS-1500 and UB-04 claim generation',
          'Electronic claim submission to clearinghouses',
          'Real-time eligibility verification',
          'EOB (Explanation of Benefits) processing',
          'Patient statement generation',
          'Payment posting and reconciliation',
          'Denial management and appeals',
          'Revenue cycle analytics'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Medical Claim Entity Model
// ═══════════════════════════════════════════════════════════════════════════

@Entity
@Table(name = "claims")
public class MedicalClaim {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(unique = true, nullable = false)
  private String claimNumber;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "patient_id", nullable = false)
  private Patient patient;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "provider_id", nullable = false)
  private Provider provider;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "encounter_id", nullable = false)
  private Encounter encounter;

  @Enumerated(EnumType.STRING)
  private ClaimType claimType; // CMS_1500, UB_04

  @ElementCollection
  @CollectionTable(name = "claim_lines")
  private List<ClaimLine> claimLines = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  private ClaimStatus status; // DRAFT, SUBMITTED, ACCEPTED, REJECTED, PAID, DENIED

  private BigDecimal totalCharges;
  private BigDecimal allowedAmount;
  private BigDecimal paidAmount;
  private BigDecimal patientResponsibility;

  private LocalDate serviceDate;
  private LocalDate submittedDate;
  private LocalDate paidDate;

  @Column(length = 1000)
  private String denialReason;

  @CreatedDate
  private LocalDateTime createdAt;
}

@Embeddable
public class ClaimLine {
  @Column(nullable = false)
  private String cptCode;

  private String modifier;

  @Column(nullable = false)
  private String icd10Code;

  @Column(nullable = false)
  private Integer units;

  @Column(nullable = false)
  private BigDecimal chargeAmount;

  private BigDecimal allowedAmount;
  private BigDecimal paidAmount;

  @Enumerated(EnumType.STRING)
  private LineStatus status;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Claim Creation with Eligibility Verification
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class ClaimService {

  @Autowired
  private ClaimRepository claimRepository;

  @Autowired
  private ClearinghouseService clearinghouseService;

  @Autowired
  private EligibilityService eligibilityService;

  @Transactional
  public MedicalClaim createClaim(ClinicalNote note) {
    Patient patient = note.getPatient();

    // Verify insurance eligibility
    EligibilityResponse eligibility =
      eligibilityService.verifyEligibility(
        patient.getInsurance().getPayerId(),
        patient.getInsurance().getMemberId(),
        note.getEncounter().getServiceDate()
      );

    if (!eligibility.isEligible()) {
      throw new InsuranceNotActiveException(
        "Patient insurance not active on service date"
      );
    }

    // Create claim
    MedicalClaim claim = new MedicalClaim();
    claim.setClaimNumber(generateClaimNumber());
    claim.setPatient(patient);
    claim.setProvider(note.getProvider());
    claim.setEncounter(note.getEncounter());
    claim.setClaimType(ClaimType.CMS_1500);
    claim.setServiceDate(note.getEncounter().getServiceDate());
    claim.setStatus(ClaimStatus.DRAFT);

    // Add claim lines from clinical note
    BigDecimal totalCharges = BigDecimal.ZERO;

    for (ProcedureCode procedure : note.getProcedureCodes()) {
      ClaimLine line = new ClaimLine();
      line.setCptCode(procedure.getCptCode());
      line.setModifier(procedure.getModifier());

      // Link primary diagnosis
      if (!note.getDiagnosisCodes().isEmpty()) {
        line.setIcd10Code(
          note.getDiagnosisCodes().get(0).getIcd10Code()
        );
      }

      // Get fee schedule amount
      BigDecimal chargeAmount =
        feeScheduleService.getChargeAmount(procedure.getCptCode());
      line.setChargeAmount(chargeAmount);
      line.setUnits(1);
      line.setStatus(LineStatus.PENDING);

      claim.getClaimLines().add(line);
      totalCharges = totalCharges.add(chargeAmount);
    }

    claim.setTotalCharges(totalCharges);

    return claimRepository.save(claim);
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Electronic Claim Submission (EDI 837)
// ═══════════════════════════════════════════════════════════════════════════

  @Transactional
  public void submitClaim(UUID claimId) {
    MedicalClaim claim = claimRepository.findById(claimId)
      .orElseThrow(() -> new ClaimNotFoundException());

    if (claim.getStatus() != ClaimStatus.DRAFT) {
      throw new InvalidClaimStatusException("Claim already submitted");
    }

    // Validate claim completeness
    validateClaim(claim);

    // Generate EDI 837 file
    String edi837 = generateEdi837(claim);

    // Submit to clearinghouse
    ClearinghouseResponse response =
      clearinghouseService.submitClaim(edi837);

    if (response.isAccepted()) {
      claim.setStatus(ClaimStatus.SUBMITTED);
      claim.setSubmittedDate(LocalDate.now());
    } else {
      claim.setStatus(ClaimStatus.REJECTED);
      claim.setDenialReason(response.getErrorMessage());
    }

    claimRepository.save(claim);
  }

  private String generateEdi837(MedicalClaim claim) {
    StringBuilder edi = new StringBuilder();

    // ISA segment (Interchange Control Header)
    edi.append("ISA*00*          *00*          *ZZ*");
    edi.append(submitterId).append("*ZZ*");
    edi.append(claim.getPatient().getInsurance().getPayerId());
    edi.append("*").append(formatDate(LocalDate.now()));
    edi.append("*").append(formatTime(LocalTime.now()));
    edi.append("*^*00501*").append(generateIcn());
    edi.append("*0*P*:~");

    // GS segment (Functional Group Header)
    edi.append("GS*HC*").append(submitterId).append("*");
    edi.append(claim.getPatient().getInsurance().getPayerId());
    edi.append("*").append(formatDate(LocalDate.now()));
    edi.append("*").append(formatTime(LocalTime.now()));
    edi.append("*1*X*005010X222A1~");

    // Continue with ST, BHT, NM1, CLM segments...
    // (Full EDI 837 generation is complex)

    return edi.toString();
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ EOB Processing and Payment Posting
// ═══════════════════════════════════════════════════════════════════════════

  @Transactional
  public void processEob(EobFile eobFile) {
    // Parse EDI 835 (Electronic Remittance Advice)
    List<EobDetail> details = eobParser.parse(eobFile);

    for (EobDetail detail : details) {
      MedicalClaim claim = claimRepository
        .findByClaimNumber(detail.getClaimNumber())
        .orElseThrow(() -> new ClaimNotFoundException());

      // Post payment
      claim.setAllowedAmount(detail.getAllowedAmount());
      claim.setPaidAmount(detail.getPaidAmount());
      claim.setPatientResponsibility(detail.getPatientResponsibility());
      claim.setPaidDate(detail.getPaymentDate());

      if (detail.isPaid()) {
        claim.setStatus(ClaimStatus.PAID);
      } else if (detail.isDenied()) {
        claim.setStatus(ClaimStatus.DENIED);
        claim.setDenialReason(detail.getDenialReason());
      }

      claimRepository.save(claim);

      // Create patient statement for patient responsibility
      if (claim.getPatientResponsibility().compareTo(BigDecimal.ZERO) > 0) {
        statementService.createStatement(claim);
      }
    }
  }

  private String generateClaimNumber() {
    return "CLM" + System.currentTimeMillis() +
           RandomStringUtils.randomNumeric(4);
  }
}

// Output: Claim CLM17098765431234 created
// Total charges: $350.00
// Claim submitted to Clearinghouse - Accepted
// EOB processed: Paid $280.00, Patient responsibility: $70.00`
      }
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          ← Back to Menu
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          🏥 Medi/Health System
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          maxWidth: '800px'
        }}>
          Healthcare management system with patient records, appointment scheduling, e-prescribing, clinical documentation, HIPAA compliance, HL7/FHIR integration, and medical billing
        </p>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {/* Topics Grid */}
      {!selectedTopic && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map(topic => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                border: '2px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                e.currentTarget.style.borderColor = topic.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.75rem',
                color: topic.color
              }}>
                {topic.title}
              </div>
              <p style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Topic Detail View */}
      {selectedTopic && (
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Two-column layout: Sidebar + Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '2rem'
          }}>
            {/* Left sidebar - Topic list */}
            <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Healthcare Topics
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {topics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTopic(t)}
                    style={{
                      backgroundColor: selectedTopic.id === t.id ? `${t.color}15` : 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic.id === t.id ? `3px solid ${t.color}` : '2px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (selectedTopic.id !== t.id) {
                        e.currentTarget.style.backgroundColor = '#f9fafb'
                        e.currentTarget.style.borderColor = t.color
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedTopic.id !== t.id) {
                        e.currentTarget.style.backgroundColor = 'white'
                        e.currentTarget.style.borderColor = '#e5e7eb'
                      }
                    }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: selectedTopic.id === t.id ? t.color : '#374151',
                      marginBottom: '0.25rem'
                    }}>
                      {t.title}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      lineHeight: '1.3'
                    }}>
                      {t.description.substring(0, 60)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content area */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              border: `3px solid ${selectedTopic.color}`,
              marginBottom: '2rem'
            }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {selectedTopic.title}
            </h2>

            {/* Diagram */}
            {selectedTopic.diagram && selectedTopic.diagram()}

            <div style={{
              backgroundColor: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              borderLeft: `4px solid ${selectedTopic.color}`
            }}>
              <p style={{
                fontSize: '1.05rem',
                color: '#374151',
                lineHeight: '1.7',
                margin: 0
              }}>
                {selectedTopic.content.overview}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                🔑 Key Features
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '0.75rem'
              }}>
                {selectedTopic.content.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '0.9rem',
                      color: '#374151'
                    }}
                  >
                    • {point}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: selectedTopic.color
                }} />
                Implementation Details
              </h3>

              {parseCodeSections(selectedTopic.content.codeExample).map((section, index) => {
                const sectionId = `section-${index}`
                const isExpanded = expandedSections[sectionId]

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Section header - clickable */}
                    <div
                      onClick={() => toggleSection(sectionId)}
                      style={{
                        padding: '1.25rem 1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: isExpanded ? `${selectedTopic.color}08` : 'white',
                        transition: 'all 0.2s ease',
                        borderBottom: isExpanded ? `2px solid ${selectedTopic.color}20` : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.backgroundColor = '#f9fafb'
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.backgroundColor = 'white'
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: `${selectedTopic.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: selectedTopic.color,
                          fontWeight: '700',
                          fontSize: '1rem'
                        }}>
                          {index + 1}
                        </div>
                        <h4 style={{
                          margin: 0,
                          fontSize: '1.15rem',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {section.title}
                        </h4>
                      </div>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: isExpanded ? selectedTopic.color : '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        color: isExpanded ? 'white' : '#6b7280',
                        fontSize: '1.25rem',
                        fontWeight: '700'
                      }}>
                        {isExpanded ? '−' : '+'}
                      </div>
                    </div>

                    {/* Section content - expandable */}
                    {isExpanded && (
                      <div style={{
                        backgroundColor: '#1e1e1e',
                        padding: '1.5rem',
                        overflow: 'auto'
                      }}>
                        <SyntaxHighlighter code={section.code} />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Expand/Collapse all button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <button
                  onClick={() => {
                    const allExpanded = {}
                    parseCodeSections(selectedTopic.content.codeExample).forEach((_, index) => {
                      allExpanded[`section-${index}`] = true
                    })
                    setExpandedSections(allExpanded)
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    backgroundColor: selectedTopic.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: `0 4px 12px -2px ${selectedTopic.color}60`
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = `0 6px 16px -2px ${selectedTopic.color}80`
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = `0 4px 12px -2px ${selectedTopic.color}60`
                  }}
                >
                  Expand All
                </button>
                <button
                  onClick={() => setExpandedSections({})}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'white'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Collapse All
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediHealth

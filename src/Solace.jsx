import { useState, useEffect, useRef } from 'react'

const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments first
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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|Properties|BytesXMLMessage|TextMessage|SDTMap|JCSMPProperties|JCSMPSession|XMLMessageProducer|XMLMessageConsumer|Topic|Queue|Flow|FlowReceiver|Destination|MessageConsumer|Session|ConnectionFactory)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')
      .replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

    // Restore protected content
    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      border: '2px solid #3b82f6',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      whiteSpace: 'pre',
      textAlign: 'left',
      margin: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="140" width="380" height="280" rx="16" fill="#3b82f6" />
          <text x="240" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Publishers
          </text>

          <rect x="550" y="240" width="300" height="220" rx="16" fill="#10b981" />
          <text x="700" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Solace Broker
          </text>

          <rect x="970" y="140" width="380" height="280" rx="16" fill="#8b5cf6" />
          <text x="1160" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Subscribers
          </text>

          <rect x="550" y="500" width="300" height="120" rx="16" fill="#ef4444" />
          <text x="700" y="530" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626" opacity="0.6">
            Management
          </text>

          <rect x="350" y="650" width="700" height="100" rx="16" fill="#f59e0b" />
          <text x="700" y="680" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706" opacity="0.6">
            Infrastructure
          </text>
        </g>

        {/* Connecting lines */}
        <g fill="none">
          <line x1="420" y1="200" x2="570" y2="300" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="495" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            publishes
          </text>

          <line x1="420" y1="350" x2="570" y2="350" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="495" y="340" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            sends
          </text>

          <line x1="830" y1="300" x2="990" y2="200" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="910" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            subscribes
          </text>

          <line x1="830" y1="350" x2="990" y2="350" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="910" y="340" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            receives
          </text>

          <line x1="700" y1="460" x2="700" y2="520" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="730" y="495" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="start">
            manages
          </text>

          <line x1="500" y1="650" x2="700" y2="620" stroke="#64748b" strokeWidth="3" strokeDasharray="5,3" strokeOpacity="0.5" markerEnd="url(#arrowDashed)"/>
          <text x="600" y="625" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            schema
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 40}
              textAnchor="middle"
              fontSize="52"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 85}
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 115 + (idx * 18)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {typeof detail === 'string' ? detail : detail.name}
              </text>
            ))}

          </g>
        )})}
      </svg>
    </div>
  )
}

function Solace({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'broker', x: 580, y: 250, width: 240, height: 180,
      icon: '🔥', title: 'Solace Broker', color: 'green',
      details: [
        { name: 'Session Management', codeExample: `import com.solacesystems.jcsmp.*;

public class SolaceSessionManager {
  public static void main(String[] args) throws JCSMPException {
    // Create connection properties
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");
    properties.setProperty(JCSMPProperties.PASSWORD, "admin");

    // Create session
    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    System.out.println("Connected to Solace broker");
    System.out.println("Broker: " + session.getProperty(JCSMPProperties.HOST));
    System.out.println("VPN: " + session.getProperty(JCSMPProperties.VPN_NAME));

    // Session is now ready for publishers/consumers
    session.closeSession();
  }
}
// Output: Connected to Solace broker
// Output: Broker: tcp://localhost:55555
// Output: VPN: default` },
        { name: 'High Availability', codeExample: `import com.solacesystems.jcsmp.*;

public class HAConnection {
  public static void main(String[] args) throws JCSMPException {
    JCSMPProperties properties = new JCSMPProperties();

    // Configure multiple broker URLs for HA
    properties.setProperty(JCSMPProperties.HOST, "tcp://primary:55555,tcp://backup:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "production");
    properties.setProperty(JCSMPProperties.USERNAME, "app-user");
    properties.setProperty(JCSMPProperties.PASSWORD, "secure-pass");

    // Auto-reconnect configuration
    properties.setProperty(JCSMPProperties.REAPPLY_SUBSCRIPTIONS, true);
    properties.setProperty(JCSMPProperties.RECONNECT_RETRIES, -1); // Infinite retries
    properties.setProperty(JCSMPProperties.CONNECT_RETRIES, 3);

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);

    // Add event handler for connection events
    session.getMessageConsumer().setEventHandler(new SessionEventHandler() {
      @Override
      public void handleEvent(SessionEventArgs event) {
        System.out.println("Session event: " + event.getEvent());
        if (event.getEvent() == SessionEventArgs.Event.RECONNECTED) {
          System.out.println("Successfully reconnected to backup broker");
        }
      }
    });

    session.connect();
    System.out.println("HA session established");

    // Keep running
    Thread.sleep(60000);
  }
}
// Output: HA session established
// Output: Session event: RECONNECTED
// Output: Successfully reconnected to backup broker` },
        { name: 'Performance Tuning', codeExample: `import com.solacesystems.jcsmp.*;

public class PerformanceTuning {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    // Performance optimizations
    properties.setProperty(JCSMPProperties.SUB_ACK_WINDOW_SIZE, 255);
    properties.setProperty(JCSMPProperties.PUB_ACK_WINDOW_SIZE, 255);
    properties.setProperty(JCSMPProperties.CALCULATE_MESSAGE_EXPIRATION, false);
    properties.setProperty(JCSMPProperties.MESSAGE_CALLBACK_ON_REACTOR, true);

    // TCP tuning
    properties.setProperty(JCSMPProperties.TCP_NO_DELAY, true);
    properties.setProperty(JCSMPProperties.SOCKET_SEND_BUFFER_SIZE, 262144); // 256KB
    properties.setProperty(JCSMPProperties.SOCKET_RECEIVE_BUFFER_SIZE, 262144);

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    System.out.println("Session optimized for high throughput");
    System.out.println("Window size: " + properties.getIntegerProperty(JCSMPProperties.PUB_ACK_WINDOW_SIZE));
    System.out.println("TCP no delay: " + properties.getBooleanProperty(JCSMPProperties.TCP_NO_DELAY));
  }
}
// Output: Session optimized for high throughput
// Output: Window size: 255
// Output: TCP no delay: true` }
      ],
      description: 'Enterprise-grade message broker providing high-performance, reliable messaging infrastructure with built-in high availability and disaster recovery capabilities.'
    },
    {
      id: 'eventportal', x: 600, y: 500, width: 200, height: 120,
      icon: '🌐', title: 'Event Portal', color: 'red',
      details: [
        { name: 'Event Catalog', codeExample: `import com.solace.eventportal.api.*;

public class EventCatalog {
  public static void main(String[] args) {
    // Event Portal REST API client
    EventPortalClient client = EventPortalClient.builder()
      .apiToken("your-api-token")
      .organizationId("your-org-id")
      .build();

    // Define event schema in Event Portal
    EventSchema orderCreatedSchema = EventSchema.builder()
      .name("OrderCreated")
      .schemaType("JSON_SCHEMA")
      .contentType("application/json")
      .schema("""
        {
          "type": "object",
          "properties": {
            "orderId": {"type": "string"},
            "customerId": {"type": "string"},
            "amount": {"type": "number"},
            "timestamp": {"type": "string", "format": "date-time"}
          },
          "required": ["orderId", "customerId", "amount"]
        }
      """)
      .build();

    // Register event in catalog
    Event orderEvent = Event.builder()
      .name("com.company.orders.OrderCreated")
      .description("Published when a new order is created")
      .schemaVersion("1.0.0")
      .schema(orderCreatedSchema)
      .build();

    client.events().create(orderEvent);
    System.out.println("Event registered in Event Portal catalog");
    System.out.println("Event: " + orderEvent.getName());
  }
}
// Output: Event registered in Event Portal catalog
// Output: Event: com.company.orders.OrderCreated` },
        { name: 'Runtime Discovery', codeExample: `import com.solace.eventportal.api.*;
import java.util.List;

public class RuntimeDiscovery {
  public static void main(String[] args) {
    EventPortalClient client = EventPortalClient.builder()
      .apiToken("your-api-token")
      .organizationId("your-org-id")
      .build();

    // Discover events at runtime
    RuntimeDiscoveryAgent agent = RuntimeDiscoveryAgent.builder()
      .brokerUrl("tcp://localhost:55555")
      .vpnName("default")
      .monitorTopics(List.of("orders/>", "payments/>", "shipping/>"))
      .build();

    agent.start();
    System.out.println("Runtime discovery agent started");

    // Agent automatically discovers and reports events
    agent.onEventDiscovered(event -> {
      System.out.println("Discovered event: " + event.getTopic());
      System.out.println("  Payload size: " + event.getPayloadSize());
      System.out.println("  Publisher: " + event.getPublisherClientName());

      // Auto-register in Event Portal
      client.events().registerDiscoveredEvent(event);
    });

    Thread.sleep(60000); // Monitor for 1 minute
  }
}
// Output: Runtime discovery agent started
// Output: Discovered event: orders/created/12345
// Output:   Payload size: 512
// Output:   Publisher: order-service-instance-1` },
        { name: 'Governance & Lifecycle', codeExample: `import com.solace.eventportal.api.*;

public class EventGovernance {
  public static void main(String[] args) {
    EventPortalClient client = EventPortalClient.builder()
      .apiToken("your-api-token")
      .organizationId("your-org-id")
      .build();

    // Define event lifecycle
    Event event = client.events().getByName("OrderCreated");

    // Set governance policies
    GovernancePolicy policy = GovernancePolicy.builder()
      .eventId(event.getId())
      .state(EventState.APPROVED)
      .owners(List.of("platform-team@company.com"))
      .approvers(List.of("architecture-team@company.com"))
      .deprecationPolicy(DeprecationPolicy.builder()
        .noticeMonths(6)
        .sunsetMonths(12)
        .build())
      .build();

    client.governance().applyPolicy(policy);
    System.out.println("Governance policy applied");

    // Track event lifecycle
    LifecycleInfo lifecycle = event.getLifecycle();
    System.out.println("State: " + lifecycle.getState());
    System.out.println("Version: " + lifecycle.getVersion());
    System.out.println("Consumers: " + lifecycle.getConsumerCount());
    System.out.println("Deprecated: " + lifecycle.isDeprecated());
  }
}
// Output: Governance policy applied
// Output: State: APPROVED
// Output: Version: 2.1.0
// Output: Consumers: 12
// Output: Deprecated: false` }
      ],
      description: 'Event-driven architecture management platform for designing, documenting, and governing event streams across your organization with automated discovery and lifecycle management.'
    },
    {
      id: 'messagevpn', x: 80, y: 190, width: 330, height: 140,
      icon: '🔐', title: 'Message VPN', color: 'blue',
      details: [
        { name: 'VPN Configuration', codeExample: `import com.solacesystems.jcsmp.*;

public class MessageVPNConfig {
  public static void main(String[] args) throws JCSMPException {
    // Multi-tenancy with Message VPNs
    JCSMPProperties prodProps = new JCSMPProperties();
    prodProps.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    prodProps.setProperty(JCSMPProperties.VPN_NAME, "production-vpn");
    prodProps.setProperty(JCSMPProperties.USERNAME, "prod-user");
    prodProps.setProperty(JCSMPProperties.PASSWORD, "prod-pass");

    JCSMPSession prodSession = JCSMPFactory.onlyInstance()
      .createSession(prodProps);
    prodSession.connect();

    JCSMPProperties devProps = new JCSMPProperties();
    devProps.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    devProps.setProperty(JCSMPProperties.VPN_NAME, "development-vpn");
    devProps.setProperty(JCSMPProperties.USERNAME, "dev-user");
    devProps.setProperty(JCSMPProperties.PASSWORD, "dev-pass");

    JCSMPSession devSession = JCSMPFactory.onlyInstance()
      .createSession(devProps);
    devSession.connect();

    System.out.println("Production VPN: " + prodProps.getStringProperty(JCSMPProperties.VPN_NAME));
    System.out.println("Development VPN: " + devProps.getStringProperty(JCSMPProperties.VPN_NAME));
    System.out.println("Isolated environments on same broker");
  }
}
// Output: Production VPN: production-vpn
// Output: Development VPN: development-vpn
// Output: Isolated environments on same broker` },
        { name: 'Access Control', codeExample: `import com.solacesystems.jcsmp.*;

public class VPNAccessControl {
  public static void main(String[] args) throws JCSMPException {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "secure-vpn");
    properties.setProperty(JCSMPProperties.USERNAME, "restricted-user");
    properties.setProperty(JCSMPProperties.PASSWORD, "secure-pass");

    // ACL-based access control at VPN level
    properties.setProperty(JCSMPProperties.CLIENT_NAME, "order-service-01");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Only allowed topics can be published/subscribed
    Topic allowedTopic = JCSMPFactory.onlyInstance().createTopic("orders/created");
    Topic deniedTopic = JCSMPFactory.onlyInstance().createTopic("admin/config");

    XMLMessageProducer producer = session.getMessageProducer(new JCSMPStreamingPublishEventHandler() {
      @Override
      public void responseReceived(String messageID) {
        System.out.println("Message sent: " + messageID);
      }

      @Override
      public void handleError(String messageID, JCSMPException e, long timestamp) {
        System.err.println("Access denied: " + e.getMessage());
      }
    });

    // This will succeed
    TextMessage msg1 = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
    msg1.setText("Order data");
    producer.send(msg1, allowedTopic);

    // This will fail - ACL denies access
    TextMessage msg2 = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
    msg2.setText("Admin config");
    producer.send(msg2, deniedTopic);
  }
}
// Output: Message sent: ID:00001
// Output: Access denied: Permission denied for topic admin/config` },
        { name: 'Resource Limits', codeExample: `import com.solacesystems.jcsmp.*;

public class VPNResourceLimits {
  public static void main(String[] args) throws JCSMPException {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "limited-vpn");
    properties.setProperty(JCSMPProperties.USERNAME, "app-user");
    properties.setProperty(JCSMPProperties.PASSWORD, "pass");

    // VPN has resource quotas configured on broker:
    // - Max connections: 1000
    // - Max queues: 500
    // - Max spool usage: 10GB
    // - Max message rate: 50,000 msg/sec

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Query VPN statistics
    System.out.println("Connected to VPN with resource limits");
    System.out.println("VPN Name: limited-vpn");
    System.out.println("Max Connections: 1000");
    System.out.println("Max Queues: 500");
    System.out.println("Max Spool Usage: 10GB");
    System.out.println("Current Spool Usage: " + getCurrentSpoolUsage(session) + "GB");
    System.out.println("Rate Limit: 50,000 msg/sec");

    // Application stays within VPN limits
    session.closeSession();
  }

  private static double getCurrentSpoolUsage(JCSMPSession session) {
    // In real implementation, query via SEMP API
    return 2.5; // 2.5GB used
  }
}
// Output: Connected to VPN with resource limits
// Output: VPN Name: limited-vpn
// Output: Max Connections: 1000
// Output: Current Spool Usage: 2.5GB
// Output: Rate Limit: 50,000 msg/sec` }
      ],
      description: 'Virtual private networking within Solace broker enabling multi-tenancy, security isolation, and resource management for different applications and teams.'
    },
    {
      id: 'queuestopics', x: 990, y: 190, width: 340, height: 140,
      icon: '📬', title: 'Queues & Topics', color: 'purple',
      details: [
        { name: 'Topic Publishing', codeExample: `import com.solacesystems.jcsmp.*;

public class TopicPublisher {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    XMLMessageProducer producer = session.getMessageProducer(
      new JCSMPStreamingPublishEventHandler() {
        @Override
        public void responseReceived(String messageID) {
          System.out.println("Published: " + messageID);
        }

        @Override
        public void handleError(String messageID, JCSMPException e, long timestamp) {
          System.err.println("Error: " + e.getMessage());
        }
      });

    // Hierarchical topic structure
    Topic ordersTopic = JCSMPFactory.onlyInstance().createTopic("commerce/orders/created");
    Topic paymentsTopic = JCSMPFactory.onlyInstance().createTopic("commerce/payments/processed");

    // Publish to topics
    for (int i = 0; i < 100; i++) {
      TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
      msg.setText("Order-" + i);
      producer.send(msg, ordersTopic);

      if (i % 10 == 0) {
        TextMessage paymentMsg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        paymentMsg.setText("Payment-" + i);
        producer.send(paymentMsg, paymentsTopic);
      }
    }

    System.out.println("Published 100 order events and 10 payment events");
    session.closeSession();
  }
}
// Output: Published: ID:00001
// Output: Published: ID:00002
// Output: Published 100 order events and 10 payment events` },
        { name: 'Queue Consumers', codeExample: `import com.solacesystems.jcsmp.*;

public class QueueConsumer {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Create durable queue
    Queue queue = JCSMPFactory.onlyInstance().createQueue("OrderProcessingQueue");

    // Consumer with flow control
    ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
    flowProps.setEndpoint(queue);
    flowProps.setAckMode(JCSMPProperties.SUPPORTED_MESSAGE_ACK_CLIENT);

    FlowReceiver flowReceiver = session.createFlow(
      new XMLMessageListener() {
        @Override
        public void onReceive(BytesXMLMessage message) {
          if (message instanceof TextMessage) {
            TextMessage textMessage = (TextMessage) message;
            System.out.println("Received: " + textMessage.getText());

            // Process message
            try {
              processOrder(textMessage.getText());

              // Acknowledge successful processing
              message.ackMessage();
              System.out.println("Acknowledged message");
            } catch (Exception e) {
              System.err.println("Processing failed, message will be redelivered");
            }
          }
        }

        @Override
        public void onException(JCSMPException e) {
          System.err.println("Consumer exception: " + e.getMessage());
        }
      },
      flowProps,
      null);

    flowReceiver.start();
    System.out.println("Queue consumer started, waiting for messages...");

    Thread.sleep(60000); // Run for 1 minute
    flowReceiver.close();
    session.closeSession();
  }

  private static void processOrder(String order) {
    // Process order logic
  }
}
// Output: Queue consumer started, waiting for messages...
// Output: Received: Order-1
// Output: Acknowledged message` },
        { name: 'Topic to Queue Mapping', codeExample: `import com.solacesystems.jcsmp.*;

public class TopicToQueueMapping {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Create queue
    Queue queue = JCSMPFactory.onlyInstance().createQueue("HighPriorityOrders");

    // Add topic subscriptions to queue
    // Queue will attract messages from these topics
    Topic highPriorityTopic = JCSMPFactory.onlyInstance()
      .createTopic("orders/priority/high");
    Topic urgentTopic = JCSMPFactory.onlyInstance()
      .createTopic("orders/urgent/*");

    session.addSubscription(queue, highPriorityTopic, JCSMPSession.WAIT_FOR_CONFIRM);
    session.addSubscription(queue, urgentTopic, JCSMPSession.WAIT_FOR_CONFIRM);

    System.out.println("Queue subscriptions configured:");
    System.out.println("  Queue: HighPriorityOrders");
    System.out.println("  Topics: orders/priority/high, orders/urgent/*");
    System.out.println("Messages published to these topics will be queued");

    // Now publish a message to the topic
    XMLMessageProducer producer = session.getMessageProducer(
      new JCSMPStreamingPublishEventHandler() {
        @Override
        public void responseReceived(String messageID) {}
        @Override
        public void handleError(String messageID, JCSMPException e, long timestamp) {}
      });

    TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
    msg.setText("Urgent order: VIP customer");
    producer.send(msg, urgentTopic);

    System.out.println("Message sent to topic and attracted to queue");

    session.closeSession();
  }
}
// Output: Queue subscriptions configured:
// Output:   Queue: HighPriorityOrders
// Output:   Topics: orders/priority/high, orders/urgent/*
// Output: Messages published to these topics will be queued` }
      ],
      description: 'Flexible messaging patterns supporting publish-subscribe with topics and point-to-point with queues, enabling dynamic routing and workload distribution.'
    },
    {
      id: 'persistent', x: 100, y: 340, width: 310, height: 100,
      icon: '💾', title: 'Persistent Messaging', color: 'blue',
      details: [
        { name: 'Guaranteed Delivery', codeExample: `import com.solacesystems.jcsmp.*;

public class GuaranteedDelivery {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Persistent message producer with acknowledgment
    XMLMessageProducer producer = session.getMessageProducer(
      new JCSMPStreamingPublishCorrelationEventHandler() {
        @Override
        public void handleErrorEx(Object key, JCSMPException cause, long timestamp) {
          System.err.println("Delivery failed for message: " + key);
        }

        @Override
        public void responseReceivedEx(Object key) {
          System.out.println("Delivery confirmed for message: " + key);
        }
      });

    Queue queue = JCSMPFactory.onlyInstance().createQueue("PersistentQueue");

    // Send persistent messages
    for (int i = 0; i < 1000; i++) {
      TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
      msg.setText("Critical transaction: " + i);

      // Set delivery mode to PERSISTENT
      msg.setDeliveryMode(DeliveryMode.PERSISTENT);

      // Set correlation key for acknowledgment tracking
      String correlationKey = "msg-" + i;
      producer.send(msg, queue, correlationKey);
    }

    System.out.println("Sent 1000 persistent messages");
    System.out.println("All messages guaranteed to be delivered");

    // Wait for acknowledgments
    Thread.sleep(5000);
    session.closeSession();
  }
}
// Output: Delivery confirmed for message: msg-0
// Output: Delivery confirmed for message: msg-1
// Output: Sent 1000 persistent messages
// Output: All messages guaranteed to be delivered` },
        { name: 'Transactional Publishing', codeExample: `import com.solacesystems.jcsmp.*;

public class TransactionalPublisher {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Create transacted session
    XMLMessageProducer producer = session.getMessageProducer(
      new JCSMPStreamingPublishEventHandler() {
        @Override
        public void responseReceived(String messageID) {}
        @Override
        public void handleError(String messageID, JCSMPException e, long timestamp) {}
      });

    Queue orderQueue = JCSMPFactory.onlyInstance().createQueue("OrderQueue");
    Queue inventoryQueue = JCSMPFactory.onlyInstance().createQueue("InventoryQueue");
    Queue paymentQueue = JCSMPFactory.onlyInstance().createQueue("PaymentQueue");

    // Begin transaction
    session.startTransaction();
    System.out.println("Transaction started");

    try {
      // Send multiple messages in a transaction
      TextMessage orderMsg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
      orderMsg.setText("Order: 12345");
      orderMsg.setDeliveryMode(DeliveryMode.PERSISTENT);
      producer.send(orderMsg, orderQueue);

      TextMessage inventoryMsg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
      inventoryMsg.setText("Reserve: Item-789");
      inventoryMsg.setDeliveryMode(DeliveryMode.PERSISTENT);
      producer.send(inventoryMsg, inventoryQueue);

      TextMessage paymentMsg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
      paymentMsg.setText("Charge: $99.99");
      paymentMsg.setDeliveryMode(DeliveryMode.PERSISTENT);
      producer.send(paymentMsg, paymentQueue);

      // Commit transaction - all messages delivered atomically
      session.commit();
      System.out.println("Transaction committed successfully");
      System.out.println("All 3 messages delivered atomically");
    } catch (Exception e) {
      // Rollback on error - no messages delivered
      session.rollback();
      System.err.println("Transaction rolled back: " + e.getMessage());
    }

    session.closeSession();
  }
}
// Output: Transaction started
// Output: Transaction committed successfully
// Output: All 3 messages delivered atomically` },
        { name: 'Message Spooling', codeExample: `import com.solacesystems.jcsmp.*;

public class MessageSpooling {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Messages are spooled (persisted) on broker disk
    Queue queue = JCSMPFactory.onlyInstance().createQueue("SpooledQueue");

    XMLMessageProducer producer = session.getMessageProducer(
      new JCSMPStreamingPublishEventHandler() {
        @Override
        public void responseReceived(String messageID) {}
        @Override
        public void handleError(String messageID, JCSMPException e, long timestamp) {}
      });

    // Send messages to queue - they will be spooled
    long startTime = System.currentTimeMillis();
    int messageCount = 100000;

    for (int i = 0; i < messageCount; i++) {
      BytesXMLMessage msg = JCSMPFactory.onlyInstance().createMessage(BytesXMLMessage.class);

      // Large payload (10KB)
      byte[] payload = new byte[10240];
      msg.writeBytes(payload);
      msg.setDeliveryMode(DeliveryMode.PERSISTENT);

      producer.send(msg, queue);
    }

    long duration = System.currentTimeMillis() - startTime;

    System.out.println("Spooled " + messageCount + " messages in " + duration + "ms");
    System.out.println("Throughput: " + (messageCount * 1000L / duration) + " msg/sec");
    System.out.println("Data spooled: " + (messageCount * 10240L / 1024 / 1024) + " MB");
    System.out.println("Messages persisted on broker disk");

    session.closeSession();
  }
}
// Output: Spooled 100000 messages in 5234ms
// Output: Throughput: 19106 msg/sec
// Output: Data spooled: 976 MB
// Output: Messages persisted on broker disk` }
      ],
      description: 'Enterprise-grade message persistence with guaranteed delivery, transactional support, and disk-based spooling ensuring zero message loss.'
    },
    {
      id: 'replay', x: 1010, y: 340, width: 320, height: 100,
      icon: '⏮️', title: 'Replay & Time Travel', color: 'teal',
      details: [
        { name: 'Message Replay', codeExample: `import com.solacesystems.jcsmp.*;

public class MessageReplay {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    // Configure queue with replay capability
    Queue replayQueue = JCSMPFactory.onlyInstance().createQueue("ReplayableQueue");

    // Create flow with replay configuration
    ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
    flowProps.setEndpoint(replayQueue);

    // Replay from specific date/time
    // Replay messages from 1 hour ago
    long replayStartTime = System.currentTimeMillis() - (60 * 60 * 1000);
    flowProps.setReplayStartLocation(ReplayStartLocation.DATE);
    flowProps.setReplayStartTime(replayStartTime);

    System.out.println("Starting replay from: " + new java.util.Date(replayStartTime));

    FlowReceiver flowReceiver = session.createFlow(
      new XMLMessageListener() {
        private int count = 0;

        @Override
        public void onReceive(BytesXMLMessage message) {
          count++;
          System.out.println("Replayed message #" + count);
          System.out.println("  Original timestamp: " +
            new java.util.Date(message.getSenderTimestamp()));
          System.out.println("  Replaying historical data");

          message.ackMessage();
        }

        @Override
        public void onException(JCSMPException e) {
          System.err.println("Replay exception: " + e.getMessage());
        }
      },
      flowProps,
      null);

    flowReceiver.start();
    System.out.println("Replay consumer started");

    Thread.sleep(30000); // Replay for 30 seconds
    flowReceiver.close();
    session.closeSession();
  }
}
// Output: Starting replay from: Mon Jan 01 09:00:00 UTC 2025
// Output: Replay consumer started
// Output: Replayed message #1
// Output:   Original timestamp: Mon Jan 01 09:15:00 UTC 2025
// Output:   Replaying historical data` },
        { name: 'Time-Based Replay', codeExample: `import com.solacesystems.jcsmp.*;
import java.time.*;

public class TimeBasedReplay {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    Queue queue = JCSMPFactory.onlyInstance().createQueue("TimeTravelQueue");

    // Replay messages from specific time range
    // Example: Replay yesterday's trading session (9 AM - 4 PM EST)
    Instant yesterday9AM = Instant.now()
      .minus(Duration.ofDays(1))
      .atZone(ZoneId.of("America/New_York"))
      .withHour(9)
      .withMinute(0)
      .toInstant();

    Instant yesterday4PM = yesterday9AM.plus(Duration.ofHours(7));

    ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
    flowProps.setEndpoint(queue);
    flowProps.setReplayStartLocation(ReplayStartLocation.DATE);
    flowProps.setReplayStartTime(yesterday9AM.toEpochMilli());

    System.out.println("Time travel replay:");
    System.out.println("  Start: " + yesterday9AM);
    System.out.println("  End:   " + yesterday4PM);
    System.out.println("  Replaying yesterday's trading session");

    FlowReceiver flowReceiver = session.createFlow(
      new XMLMessageListener() {
        private long firstTimestamp = 0;
        private int messageCount = 0;

        @Override
        public void onReceive(BytesXMLMessage message) {
          long timestamp = message.getSenderTimestamp();

          if (firstTimestamp == 0) {
            firstTimestamp = timestamp;
          }

          messageCount++;

          // Stop replay at end time
          if (timestamp > yesterday4PM.toEpochMilli()) {
            System.out.println("Reached end time, stopping replay");
            return;
          }

          if (messageCount % 1000 == 0) {
            long elapsedMs = timestamp - firstTimestamp;
            System.out.println("Replayed " + messageCount + " messages");
            System.out.println("  Session time elapsed: " +
              Duration.ofMillis(elapsedMs).toMinutes() + " minutes");
          }

          message.ackMessage();
        }

        @Override
        public void onException(JCSMPException e) {
          System.err.println("Exception: " + e.getMessage());
        }
      },
      flowProps,
      null);

    flowReceiver.start();
    Thread.sleep(120000); // Replay for 2 minutes
  }
}
// Output: Time travel replay:
// Output:   Start: 2025-01-01T14:00:00Z
// Output:   End:   2025-01-01T21:00:00Z
// Output:   Replaying yesterday's trading session
// Output: Replayed 1000 messages
// Output:   Session time elapsed: 5 minutes` },
        { name: 'Replay with Filtering', codeExample: `import com.solacesystems.jcsmp.*;

public class FilteredReplay {
  public static void main(String[] args) throws Exception {
    JCSMPProperties properties = new JCSMPProperties();
    properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
    properties.setProperty(JCSMPProperties.VPN_NAME, "default");
    properties.setProperty(JCSMPProperties.USERNAME, "admin");

    JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
    session.connect();

    Queue queue = JCSMPFactory.onlyInstance().createQueue("FilteredReplayQueue");

    // Replay with message selector (filter)
    ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
    flowProps.setEndpoint(queue);

    // Replay from 6 hours ago
    long replayStartTime = System.currentTimeMillis() - (6 * 60 * 60 * 1000);
    flowProps.setReplayStartLocation(ReplayStartLocation.DATE);
    flowProps.setReplayStartTime(replayStartTime);

    // Only replay messages matching selector
    // Example: Only high-value trades
    flowProps.setSelector("amount > 100000");

    System.out.println("Filtered replay configuration:");
    System.out.println("  Time range: Last 6 hours");
    System.out.println("  Filter: amount > 100000");
    System.out.println("  Replaying high-value trades only");

    FlowReceiver flowReceiver = session.createFlow(
      new XMLMessageListener() {
        private int count = 0;
        private double totalAmount = 0;

        @Override
        public void onReceive(BytesXMLMessage message) {
          count++;

          // Extract amount from message properties
          SDTMap properties = message.getProperties();
          if (properties != null && properties.containsKey("amount")) {
            double amount = properties.getDouble("amount");
            totalAmount += amount;

            System.out.println("High-value trade #" + count);
            System.out.println("  Amount: $" + String.format("%,.2f", amount));
          }

          message.ackMessage();
        }

        @Override
        public void onException(JCSMPException e) {
          System.err.println("Exception: " + e.getMessage());
        }
      },
      flowProps,
      null);

    flowReceiver.start();

    Thread.sleep(60000);
    System.out.println("\\nReplay complete:");
    System.out.println("  Trades replayed: " + flowReceiver.getStats().getMessageCount());

    flowReceiver.close();
    session.closeSession();
  }
}
// Output: Filtered replay configuration:
// Output:   Time range: Last 6 hours
// Output:   Filter: amount > 100000
// Output:   Replaying high-value trades only
// Output: High-value trade #1
// Output:   Amount: $250,000.00` }
      ],
      description: 'Advanced message replay capabilities enabling time-travel debugging, historical data analysis, and event sourcing with time-based and filtered replay options.'
    }
  ]

  // Set initial focus on mount
  useEffect(() => {
    setFocusedComponentIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIsModalOpen = isModalOpenRef.current
      console.log('Solace KeyDown:', e.key, 'isModalOpen:', currentIsModalOpen)

      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentIsModalOpen) {
          e.preventDefault()
          e.stopImmediatePropagation()
          closeModal()
          return
        }
        return
      }

      if (isModalOpen) {
        // Modal is open, don't handle other keys
        return
      }

      // Navigation when modal is closed
      const componentCount = components.length

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev + 1) % componentCount)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev - 1 + componentCount) % componentCount)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (components[focusedComponentIndex]) {
            handleComponentClick(components[focusedComponentIndex])
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
  }

  // Use refs to access current modal state in event handler
  const isModalOpenRef = useRef(isModalOpen)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])


  return (
    <div style={{
      padding: '2rem',
      maxWidth: '2000px',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(59, 130, 246, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
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
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          ☁️ Solace PubSub+
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '2px solid rgba(59, 130, 246, 0.2)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.1rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.6',
          textAlign: 'center'
        }}>
          Advanced event broker platform combining messaging, streaming, and event management with enterprise-grade
          reliability. Features message VPNs for multi-tenancy, replay for time-travel debugging, and Event Portal
          for comprehensive event-driven architecture governance.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Solace Architecture Overview"
        width={1400}
        height={800}
        containerWidth={1800}
        focusedIndex={focusedComponentIndex}
      />

      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(59, 130, 246, 0.3)'
        }}>
          <h3 style={{
            color: '#1e40af',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🔧 Key Features
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• Multi-Protocol Support (MQTT, AMQP, REST)</div>
            <div>• Message VPNs for Multi-Tenancy</div>
            <div>• Event Portal for Governance</div>
            <div>• Message Replay & Time Travel</div>
            <div>• Guaranteed Delivery</div>
            <div>• Dynamic Message Routing</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <h3 style={{
            color: '#7c3aed',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🌐 Use Cases
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• Event-Driven Microservices</div>
            <div>• IoT & Device Integration</div>
            <div>• Real-Time Analytics</div>
            <div>• Event Sourcing & CQRS</div>
            <div>• Multi-Cloud Event Mesh</div>
            <div>• Financial Trading Systems</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1000px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(59, 130, 246, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Code Examples
              </h3>
              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedComponent.details.map((detail, idx) => (
                  <div key={idx}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        color: '#166534',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {idx + 1}
                      </span>
                      {detail.name}
                    </h4>
                    <SyntaxHighlighter code={detail.codeExample} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Solace
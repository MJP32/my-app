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
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|Properties|ConnectionFactory|Connection|Channel|Queue|Exchange|AMQP|BasicProperties|Consumer|DefaultConsumer|Delivery|Envelope|GetResponse|QueueingConsumer|Address|TopologyRecoveryException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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
            Producers
          </text>

          <rect x="550" y="240" width="300" height="220" rx="16" fill="#10b981" />
          <text x="700" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            RabbitMQ Broker
          </text>

          <rect x="970" y="140" width="380" height="280" rx="16" fill="#8b5cf6" />
          <text x="1160" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Consumers
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
            consumes
          </text>

          <line x1="830" y1="350" x2="990" y2="350" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="910" y="340" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            subscribes
          </text>

          <line x1="700" y1="460" x2="700" y2="520" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="730" y="495" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="start">
            manages
          </text>

          <line x1="500" y1="650" x2="700" y2="620" stroke="#64748b" strokeWidth="3" strokeDasharray="5,3" strokeOpacity="0.5" markerEnd="url(#arrowDashed)"/>
          <text x="600" y="625" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            monitors
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

function RabbitMQ({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'broker', x: 580, y: 250, width: 240, height: 180,
      icon: '🐰', title: 'RabbitMQ Broker', color: 'green',
      details: [
        { name: 'Connection Management', codeExample: `import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Channel;

public class RabbitMQConnection {
  public static void main(String[] args) throws Exception {
    // Configure connection factory
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");
    factory.setPort(5672);
    factory.setUsername("guest");
    factory.setPassword("guest");
    factory.setVirtualHost("/");

    // Connection pooling
    factory.setConnectionTimeout(30000);
    factory.setRequestedHeartbeat(60);
    factory.setAutomaticRecoveryEnabled(true);
    factory.setNetworkRecoveryInterval(10000);

    // Create connection
    Connection connection = factory.newConnection("order-service");
    System.out.println("Connected to RabbitMQ");
    System.out.println("Host: " + factory.getHost());
    System.out.println("Virtual Host: " + factory.getVirtualHost());

    // Create channel
    Channel channel = connection.createChannel();
    System.out.println("Channel created: " + channel.getChannelNumber());

    // Channel is now ready for publishing/consuming
    channel.close();
    connection.close();
  }
}
// Output: Connected to RabbitMQ
// Output: Host: localhost
// Output: Virtual Host: /
// Output: Channel created: 1` },
        { name: 'Publisher Confirms', codeExample: `import com.rabbitmq.client.*;

public class PublisherConfirms {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Enable publisher confirms
      channel.confirmSelect();

      String queueName = "confirmed-queue";
      channel.queueDeclare(queueName, true, false, false, null);

      // Publish with confirmation
      for (int i = 0; i < 1000; i++) {
        String message = "Message " + i;
        channel.basicPublish("", queueName,
          MessageProperties.PERSISTENT_TEXT_PLAIN,
          message.getBytes());

        // Wait for confirmation
        if (channel.waitForConfirms(5000)) {
          System.out.println("Message " + i + " confirmed");
        } else {
          System.err.println("Message " + i + " not confirmed");
        }
      }

      System.out.println("All messages confirmed by broker");
    }
  }
}
// Output: Message 0 confirmed
// Output: Message 1 confirmed
// Output: All messages confirmed by broker` },
        { name: 'High Availability', codeExample: `import com.rabbitmq.client.*;
import java.util.*;

public class HAConfiguration {
  public static void main(String[] args) throws Exception {
    // Configure multiple broker addresses for HA
    Address[] addresses = {
      new Address("rabbit1.example.com", 5672),
      new Address("rabbit2.example.com", 5672),
      new Address("rabbit3.example.com", 5672)
    };

    ConnectionFactory factory = new ConnectionFactory();
    factory.setUsername("admin");
    factory.setPassword("admin");
    factory.setVirtualHost("production");

    // Automatic reconnection
    factory.setAutomaticRecoveryEnabled(true);
    factory.setTopologyRecoveryEnabled(true);
    factory.setNetworkRecoveryInterval(10000);

    // Create connection with failover
    Connection connection = factory.newConnection(addresses);
    System.out.println("Connected to HA cluster");

    Channel channel = connection.createChannel();

    // Declare HA queue with policy
    Map<String, Object> args = new HashMap<>();
    args.put("x-ha-policy", "all"); // Replicate to all nodes
    args.put("x-queue-type", "quorum"); // Use quorum queue

    channel.queueDeclare("ha-orders", true, false, false, args);
    System.out.println("HA queue created with replication");

    // Connection will automatically failover on node failure
    System.out.println("Automatic failover enabled");

    Thread.sleep(60000);
  }
}
// Output: Connected to HA cluster
// Output: HA queue created with replication
// Output: Automatic failover enabled` }
      ],
      description: 'Reliable, scalable message broker implementing AMQP protocol with support for multiple messaging patterns, high availability clustering, and enterprise-grade features.'
    },
    {
      id: 'exchanges', x: 80, y: 190, width: 330, height: 140,
      icon: '🔄', title: 'Exchanges', color: 'blue',
      details: [
        { name: 'Direct Exchange', codeExample: `import com.rabbitmq.client.*;

public class DirectExchange {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare direct exchange
      String exchangeName = "order_routing";
      channel.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT, true);

      // Declare queues
      channel.queueDeclare("high_priority_orders", true, false, false, null);
      channel.queueDeclare("normal_orders", true, false, false, null);
      channel.queueDeclare("low_priority_orders", true, false, false, null);

      // Bind queues to exchange with routing keys
      channel.queueBind("high_priority_orders", exchangeName, "priority.high");
      channel.queueBind("normal_orders", exchangeName, "priority.normal");
      channel.queueBind("low_priority_orders", exchangeName, "priority.low");

      System.out.println("Direct exchange configured");
      System.out.println("Exchange: " + exchangeName);

      // Publish messages with routing keys
      String[] priorities = {"priority.high", "priority.normal", "priority.low"};
      for (int i = 0; i < 100; i++) {
        String routingKey = priorities[i % 3];
        String message = "Order-" + i;

        channel.basicPublish(exchangeName, routingKey, null, message.getBytes());
        System.out.println("Sent: " + message + " with key: " + routingKey);
      }
    }
  }
}
// Output: Direct exchange configured
// Output: Exchange: order_routing
// Output: Sent: Order-0 with key: priority.high
// Output: Sent: Order-1 with key: priority.normal` },
        { name: 'Topic Exchange', codeExample: `import com.rabbitmq.client.*;

public class TopicExchange {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare topic exchange
      String exchangeName = "logs_topic";
      channel.exchangeDeclare(exchangeName, BuiltinExchangeType.TOPIC, true);

      // Declare queues for different log consumers
      channel.queueDeclare("error_logs", true, false, false, null);
      channel.queueDeclare("all_logs", true, false, false, null);
      channel.queueDeclare("kernel_logs", true, false, false, null);

      // Bind with wildcard patterns
      channel.queueBind("error_logs", exchangeName, "*.error");
      channel.queueBind("all_logs", exchangeName, "#"); // All messages
      channel.queueBind("kernel_logs", exchangeName, "kern.*");

      System.out.println("Topic exchange configured");

      // Publish messages with hierarchical routing keys
      String[] routingKeys = {
        "kern.critical",
        "kern.error",
        "auth.info",
        "app.error",
        "kern.warning"
      };

      for (String routingKey : routingKeys) {
        String message = "Log message for " + routingKey;
        channel.basicPublish(exchangeName, routingKey, null, message.getBytes());
        System.out.println("Published: " + routingKey);
      }

      System.out.println("Messages routed by pattern matching");
    }
  }
}
// Output: Topic exchange configured
// Output: Published: kern.critical
// Output: Published: kern.error
// Output: Messages routed by pattern matching` },
        { name: 'Fanout Exchange', codeExample: `import com.rabbitmq.client.*;

public class FanoutExchange {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare fanout exchange - broadcasts to all bound queues
      String exchangeName = "notifications";
      channel.exchangeDeclare(exchangeName, BuiltinExchangeType.FANOUT, true);

      // Declare multiple subscriber queues
      channel.queueDeclare("email_notifications", true, false, false, null);
      channel.queueDeclare("sms_notifications", true, false, false, null);
      channel.queueDeclare("push_notifications", true, false, false, null);
      channel.queueDeclare("webhook_notifications", true, false, false, null);

      // Bind all queues to fanout exchange (routing key ignored)
      channel.queueBind("email_notifications", exchangeName, "");
      channel.queueBind("sms_notifications", exchangeName, "");
      channel.queueBind("push_notifications", exchangeName, "");
      channel.queueBind("webhook_notifications", exchangeName, "");

      System.out.println("Fanout exchange configured");
      System.out.println("Broadcasting to 4 subscribers");

      // Publish a notification - goes to all queues
      for (int i = 0; i < 10; i++) {
        String message = "User action notification: " + i;
        channel.basicPublish(exchangeName, "", null, message.getBytes());
        System.out.println("Broadcast: " + message);
      }

      System.out.println("All subscribers received all messages");
    }
  }
}
// Output: Fanout exchange configured
// Output: Broadcasting to 4 subscribers
// Output: Broadcast: User action notification: 0
// Output: All subscribers received all messages` }
      ],
      description: 'Message routing engines supporting direct, topic, fanout, and headers exchange types for flexible message distribution patterns and complex routing topologies.'
    },
    {
      id: 'queues', x: 1010, y: 190, width: 320, height: 140,
      icon: '📥', title: 'Queues', color: 'purple',
      details: [
        { name: 'Durable Queues', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class DurableQueues {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare durable queue with additional properties
      String queueName = "persistent_orders";
      Map<String, Object> args = new HashMap<>();
      args.put("x-message-ttl", 86400000); // 24 hour TTL
      args.put("x-max-length", 100000); // Max queue length
      args.put("x-queue-mode", "lazy"); // Lazy mode for large queues
      args.put("x-max-priority", 10); // Enable priority

      channel.queueDeclare(queueName,
        true,  // durable - survives broker restart
        false, // not exclusive
        false, // not auto-delete
        args);

      System.out.println("Durable queue created: " + queueName);
      System.out.println("Properties:");
      System.out.println("  TTL: 24 hours");
      System.out.println("  Max length: 100,000 messages");
      System.out.println("  Mode: lazy");
      System.out.println("  Max priority: 10");

      // Publish persistent messages
      AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
        .deliveryMode(2) // persistent
        .priority(5)
        .build();

      for (int i = 0; i < 1000; i++) {
        String message = "Order-" + i;
        channel.basicPublish("", queueName, props, message.getBytes());
      }

      System.out.println("Published 1000 persistent messages");
    }
  }
}
// Output: Durable queue created: persistent_orders
// Output: Properties:
// Output:   TTL: 24 hours
// Output:   Max length: 100,000 messages
// Output: Published 1000 persistent messages` },
        { name: 'Consumer Acknowledgment', codeExample: `import com.rabbitmq.client.*;

public class AcknowledgmentModes {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    Connection connection = factory.newConnection();
    Channel channel = connection.createChannel();

    String queueName = "processing_queue";
    channel.queueDeclare(queueName, true, false, false, null);

    // Manual acknowledgment for reliability
    boolean autoAck = false;
    int prefetchCount = 10; // QoS - process 10 at a time

    channel.basicQos(prefetchCount);

    System.out.println("Consumer started with manual ack");
    System.out.println("Prefetch count: " + prefetchCount);

    DeliverCallback deliverCallback = (consumerTag, delivery) -> {
      String message = new String(delivery.getBody(), "UTF-8");
      long deliveryTag = delivery.getEnvelope().getDeliveryTag();

      try {
        System.out.println("Processing: " + message);

        // Simulate processing
        processMessage(message);

        // Acknowledge successful processing
        channel.basicAck(deliveryTag, false);
        System.out.println("Acknowledged: " + deliveryTag);

      } catch (Exception e) {
        System.err.println("Processing failed: " + e.getMessage());

        // Negative acknowledgment - requeue for retry
        channel.basicNack(deliveryTag, false, true);
        System.err.println("Message requeued for retry");
      }
    };

    channel.basicConsume(queueName, autoAck, deliverCallback, consumerTag -> {});

    Thread.sleep(60000);
  }

  private static void processMessage(String message) throws Exception {
    // Processing logic
    Thread.sleep(100);
  }
}
// Output: Consumer started with manual ack
// Output: Prefetch count: 10
// Output: Processing: Order-1
// Output: Acknowledged: 1` },
        { name: 'Priority Queues', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class PriorityQueues {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare queue with priority support
      String queueName = "priority_processing";
      Map<String, Object> args = new HashMap<>();
      args.put("x-max-priority", 10); // Priority levels 0-10

      channel.queueDeclare(queueName, true, false, false, args);
      System.out.println("Priority queue created");

      // Publish messages with different priorities
      for (int priority = 0; priority <= 10; priority++) {
        AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
          .priority(priority)
          .build();

        String message = "Task with priority " + priority;
        channel.basicPublish("", queueName, props, message.getBytes());
        System.out.println("Sent: " + message);
      }

      // Also send some normal priority messages
      for (int i = 0; i < 20; i++) {
        AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
          .priority(5) // Medium priority
          .build();

        channel.basicPublish("", queueName, props,
          ("Normal task " + i).getBytes());
      }

      System.out.println("\\nMessages will be consumed in priority order:");
      System.out.println("  Priority 10 (highest) first");
      System.out.println("  Priority 0 (lowest) last");

      // Consumer will receive high priority messages first
      DeliverCallback deliverCallback = (consumerTag, delivery) -> {
        String message = new String(delivery.getBody(), "UTF-8");
        Integer priority = delivery.getProperties().getPriority();
        System.out.println("Consumed: " + message + " (priority: " + priority + ")");
        channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
      };

      channel.basicConsume(queueName, false, deliverCallback, consumerTag -> {});
      Thread.sleep(5000);
    }
  }
}
// Output: Priority queue created
// Output: Sent: Task with priority 10
// Output: Consumed: Task with priority 10 (priority: 10)
// Output: Consumed: Task with priority 9 (priority: 9)` }
      ],
      description: 'Message storage and delivery with durable persistence, priority support, consumer acknowledgments, and quality-of-service controls for reliable message processing.'
    },
    {
      id: 'bindings', x: 100, y: 340, width: 310, height: 100,
      icon: '🔗', title: 'Bindings', color: 'blue',
      details: [
        { name: 'Queue Bindings', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class QueueBindings {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare exchange and queues
      String exchange = "ecommerce";
      channel.exchangeDeclare(exchange, BuiltinExchangeType.TOPIC, true);

      channel.queueDeclare("order_processing", true, false, false, null);
      channel.queueDeclare("inventory_updates", true, false, false, null);
      channel.queueDeclare("analytics", true, false, false, null);

      // Create bindings with routing patterns
      channel.queueBind("order_processing", exchange, "order.created");
      channel.queueBind("order_processing", exchange, "order.updated");

      channel.queueBind("inventory_updates", exchange, "inventory.*");

      channel.queueBind("analytics", exchange, "#"); // All events

      System.out.println("Bindings created:");
      System.out.println("  order_processing <- order.created, order.updated");
      System.out.println("  inventory_updates <- inventory.*");
      System.out.println("  analytics <- # (all)");

      // Publish test messages
      String[] routingKeys = {
        "order.created",
        "order.updated",
        "inventory.reduced",
        "payment.processed"
      };

      for (String routingKey : routingKeys) {
        String message = "Event: " + routingKey;
        channel.basicPublish(exchange, routingKey, null, message.getBytes());
        System.out.println("\\nPublished: " + message);
        System.out.println("  Routed to queues matching: " + routingKey);
      }
    }
  }
}
// Output: Bindings created:
// Output:   order_processing <- order.created, order.updated
// Output: Published: Event: order.created
// Output:   Routed to queues matching: order.created` },
        { name: 'Headers Exchange Binding', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class HeadersBinding {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare headers exchange
      String exchange = "headers_routing";
      channel.exchangeDeclare(exchange, BuiltinExchangeType.HEADERS, true);

      // Declare queues
      channel.queueDeclare("critical_alerts", true, false, false, null);
      channel.queueDeclare("us_orders", true, false, false, null);

      // Binding with header matching
      Map<String, Object> criticalHeaders = new HashMap<>();
      criticalHeaders.put("x-match", "any"); // Match any header
      criticalHeaders.put("severity", "critical");
      criticalHeaders.put("severity", "error");
      channel.queueBind("critical_alerts", exchange, "", criticalHeaders);

      Map<String, Object> usHeaders = new HashMap<>();
      usHeaders.put("x-match", "all"); // Match all headers
      usHeaders.put("region", "US");
      usHeaders.put("type", "order");
      channel.queueBind("us_orders", exchange, "", usHeaders);

      System.out.println("Headers bindings created");

      // Publish with headers
      Map<String, Object> messageHeaders = new HashMap<>();
      messageHeaders.put("severity", "critical");
      messageHeaders.put("region", "US");
      messageHeaders.put("type", "order");

      AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
        .headers(messageHeaders)
        .build();

      channel.basicPublish(exchange, "", props, "Critical US order".getBytes());
      System.out.println("Message routed based on headers");
      System.out.println("  Headers: " + messageHeaders);
    }
  }
}
// Output: Headers bindings created
// Output: Message routed based on headers
// Output:   Headers: {severity=critical, region=US, type=order}` },
        { name: 'Dynamic Binding', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class DynamicBinding {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      String exchange = "dynamic_routing";
      channel.exchangeDeclare(exchange, BuiltinExchangeType.TOPIC, true);

      String queueName = "dynamic_consumer";
      channel.queueDeclare(queueName, true, false, false, null);

      System.out.println("Dynamic binding manager started");

      // Start with initial bindings
      String[] initialBindings = {"user.*.created", "order.#"};
      for (String pattern : initialBindings) {
        channel.queueBind(queueName, exchange, pattern);
        System.out.println("Added binding: " + pattern);
      }

      // Simulate runtime: add new binding
      Thread.sleep(5000);
      String newBinding = "payment.processed";
      channel.queueBind(queueName, exchange, newBinding);
      System.out.println("\\nAdded new binding at runtime: " + newBinding);

      // Remove a binding
      Thread.sleep(5000);
      String removeBinding = "user.*.created";
      channel.queueUnbind(queueName, exchange, removeBinding);
      System.out.println("Removed binding: " + removeBinding);

      System.out.println("\\nCurrent bindings:");
      System.out.println("  order.#");
      System.out.println("  payment.processed");

      // Test with various routing keys
      String[] testKeys = {
        "user.admin.created",  // No longer bound
        "order.created",       // Still bound
        "payment.processed"    // Newly bound
      };

      for (String key : testKeys) {
        channel.basicPublish(exchange, key, null, key.getBytes());
        System.out.println("Published: " + key);
      }
    }
  }
}
// Output: Dynamic binding manager started
// Output: Added binding: user.*.created
// Output: Added new binding at runtime: payment.processed
// Output: Removed binding: user.*.created` }
      ],
      description: 'Flexible routing configuration connecting exchanges to queues with pattern-based, header-based, or direct routing rules that can be dynamically managed at runtime.'
    },
    {
      id: 'clustering', x: 600, y: 500, width: 200, height: 120,
      icon: '🔧', title: 'Clustering', color: 'red',
      details: [
        { name: 'Cluster Formation', codeExample: `import com.rabbitmq.client.*;
import java.util.*;

public class ClusterConnection {
  public static void main(String[] args) throws Exception {
    // Define cluster nodes
    List<Address> clusterNodes = Arrays.asList(
      new Address("rabbit1.cluster.local", 5672),
      new Address("rabbit2.cluster.local", 5672),
      new Address("rabbit3.cluster.local", 5672)
    );

    ConnectionFactory factory = new ConnectionFactory();
    factory.setUsername("admin");
    factory.setPassword("admin");
    factory.setVirtualHost("/");

    // Automatic recovery and topology recovery
    factory.setAutomaticRecoveryEnabled(true);
    factory.setTopologyRecoveryEnabled(true);
    factory.setNetworkRecoveryInterval(5000);

    // Connect to cluster
    Connection connection = factory.newConnection(clusterNodes, "cluster-client");
    System.out.println("Connected to RabbitMQ cluster");

    Channel channel = connection.createChannel();

    // The connection will automatically use available nodes
    System.out.println("Channel: " + channel.getChannelNumber());
    System.out.println("Cluster provides:");
    System.out.println("  - Load balancing across nodes");
    System.out.println("  - Automatic failover");
    System.out.println("  - High availability");

    Thread.sleep(5000);
    channel.close();
    connection.close();
  }
}
// Output: Connected to RabbitMQ cluster
// Output: Channel: 1
// Output: Cluster provides:
// Output:   - Load balancing across nodes
// Output:   - Automatic failover` },
        { name: 'Quorum Queues', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class QuorumQueues {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("rabbit1.cluster.local");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Declare quorum queue - replicated across cluster
      String queueName = "quorum_orders";
      Map<String, Object> args = new HashMap<>();
      args.put("x-queue-type", "quorum");
      args.put("x-quorum-initial-group-size", 3); // Replicate to 3 nodes

      channel.queueDeclare(queueName, true, false, false, args);

      System.out.println("Quorum queue created: " + queueName);
      System.out.println("Replicated across 3 cluster nodes");
      System.out.println("Features:");
      System.out.println("  - Raft consensus protocol");
      System.out.println("  - Data safety (no message loss)");
      System.out.println("  - Automatic leader election");
      System.out.println("  - Poison message handling");

      // Publish messages - automatically replicated
      for (int i = 0; i < 1000; i++) {
        AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
          .deliveryMode(2) // persistent
          .build();

        String message = "Order-" + i;
        channel.basicPublish("", queueName, props, message.getBytes());
      }

      System.out.println("\\nPublished 1000 messages");
      System.out.println("All messages replicated to quorum");

      // Consumer with at-least-once delivery
      DeliverCallback deliverCallback = (consumerTag, delivery) -> {
        String message = new String(delivery.getBody(), "UTF-8");
        System.out.println("Received: " + message);
        channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
      };

      channel.basicConsume(queueName, false, deliverCallback, consumerTag -> {});
      Thread.sleep(10000);
    }
  }
}
// Output: Quorum queue created: quorum_orders
// Output: Replicated across 3 cluster nodes
// Output: Features:
// Output:   - Raft consensus protocol
// Output: Published 1000 messages` },
        { name: 'Mirrored Queues', codeExample: `import com.rabbitmq.client.*;
import java.util.HashMap;
import java.util.Map;

public class MirroredQueues {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("rabbit1.cluster.local");

    try (Connection connection = factory.newConnection();
         Channel channel = connection.createChannel()) {

      // Create queue that will be mirrored via policy
      String queueName = "ha_transactions";
      Map<String, Object> args = new HashMap<>();
      args.put("x-ha-policy", "all");  // Mirror to all nodes
      args.put("x-ha-sync-mode", "automatic"); // Automatic sync

      channel.queueDeclare(queueName, true, false, false, args);

      System.out.println("Mirrored queue created: " + queueName);
      System.out.println("Policy: Mirror to all cluster nodes");
      System.out.println("Sync mode: Automatic");

      // Alternatively, set via management policy:
      // rabbitmqctl set_policy ha-all "^ha\\\\." '{"ha-mode":"all"}'

      System.out.println("\\nHA Configuration:");
      System.out.println("  Master node: rabbit1");
      System.out.println("  Mirrors: rabbit2, rabbit3");
      System.out.println("  Synchronization: Automatic");

      // Publish to master
      for (int i = 0; i < 100; i++) {
        AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
          .deliveryMode(2)
          .build();

        channel.basicPublish("", queueName, props,
          ("Transaction-" + i).getBytes());
      }

      System.out.println("\\nPublished 100 transactions");
      System.out.println("Messages synchronized to all mirrors");
      System.out.println("Master failure will promote a mirror");

      Thread.sleep(5000);
    }
  }
}
// Output: Mirrored queue created: ha_transactions
// Output: Policy: Mirror to all cluster nodes
// Output: HA Configuration:
// Output:   Master node: rabbit1
// Output: Published 100 transactions` }
      ],
      description: 'Distributed cluster architecture with quorum queues, mirrored queues, automatic failover, and Raft-based consensus for high availability and data safety across multiple nodes.'
    },
    {
      id: 'management', x: 1020, y: 340, width: 310, height: 100,
      icon: '📊', title: 'Management UI', color: 'teal',
      details: [
        { name: 'Management API', codeExample: `import java.net.http.*;
import java.net.URI;
import java.util.Base64;

public class ManagementAPI {
  public static void main(String[] args) throws Exception {
    String baseUrl = "http://localhost:15672/api";
    String username = "admin";
    String password = "admin";

    // Basic auth
    String auth = username + ":" + password;
    String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

    HttpClient client = HttpClient.newHttpClient();

    // Get cluster overview
    HttpRequest overviewRequest = HttpRequest.newBuilder()
      .uri(URI.create(baseUrl + "/overview"))
      .header("Authorization", "Basic " + encodedAuth)
      .GET()
      .build();

    HttpResponse<String> overviewResponse =
      client.send(overviewRequest, HttpResponse.BodyHandlers.ofString());

    System.out.println("Cluster Overview:");
    System.out.println(overviewResponse.body());

    // List all queues
    HttpRequest queuesRequest = HttpRequest.newBuilder()
      .uri(URI.create(baseUrl + "/queues"))
      .header("Authorization", "Basic " + encodedAuth)
      .GET()
      .build();

    HttpResponse<String> queuesResponse =
      client.send(queuesRequest, HttpResponse.BodyHandlers.ofString());

    System.out.println("\\nQueues:");
    System.out.println(queuesResponse.body());

    // Get queue statistics
    String queueName = "orders";
    HttpRequest statsRequest = HttpRequest.newBuilder()
      .uri(URI.create(baseUrl + "/queues/%2f/" + queueName))
      .header("Authorization", "Basic " + encodedAuth)
      .GET()
      .build();

    HttpResponse<String> statsResponse =
      client.send(statsRequest, HttpResponse.BodyHandlers.ofString());

    System.out.println("\\nQueue Stats for '" + queueName + "':");
    System.out.println(statsResponse.body());
  }
}
// Output: Cluster Overview:
// Output: {"rabbitmq_version":"3.12.0", "cluster_name":"rabbit@localhost"}
// Output: Queues:
// Output: [{"name":"orders", "messages":1234}]` },
        { name: 'Monitoring & Metrics', codeExample: `import java.net.http.*;
import java.net.URI;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RabbitMQMonitoring {
  private static final String BASE_URL = "http://localhost:15672/api";
  private static final String AUTH = "Basic " +
    Base64.getEncoder().encodeToString("admin:admin".getBytes());

  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    ObjectMapper mapper = new ObjectMapper();

    // Monitor queue metrics
    String queueStats = getQueueStats(client, "orders");
    Map<String, Object> stats = mapper.readValue(queueStats, Map.class);

    System.out.println("Queue Metrics:");
    System.out.println("  Name: " + stats.get("name"));
    System.out.println("  Messages: " + stats.get("messages"));
    System.out.println("  Messages ready: " + stats.get("messages_ready"));
    System.out.println("  Messages unacked: " + stats.get("messages_unacknowledged"));
    System.out.println("  Consumers: " + stats.get("consumers"));

    // Get message rates
    Map<String, Object> messageStats = (Map) stats.get("message_stats");
    if (messageStats != null) {
      System.out.println("\\nMessage Rates:");
      System.out.println("  Publish rate: " +
        ((Map) messageStats.get("publish_details")).get("rate"));
      System.out.println("  Deliver rate: " +
        ((Map) messageStats.get("deliver_details")).get("rate"));
      System.out.println("  Ack rate: " +
        ((Map) messageStats.get("ack_details")).get("rate"));
    }

    // Check node health
    String nodeHealth = getNodeHealth(client);
    System.out.println("\\nNode Health: " + nodeHealth);

    // Alert on high memory usage
    Map<String, Object> overview = mapper.readValue(
      getOverview(client), Map.class);

    long memoryUsed = (Long) ((Map) overview.get("node")).get("mem_used");
    long memoryLimit = (Long) ((Map) overview.get("node")).get("mem_limit");
    double memoryPercent = (memoryUsed * 100.0) / memoryLimit;

    System.out.println("\\nMemory Usage: " + String.format("%.2f%%", memoryPercent));
    if (memoryPercent > 80) {
      System.out.println("WARNING: High memory usage!");
    }
  }

  private static String getQueueStats(HttpClient client, String queue)
      throws Exception {
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + "/queues/%2f/" + queue))
      .header("Authorization", AUTH)
      .GET()
      .build();
    return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
  }

  private static String getNodeHealth(HttpClient client) throws Exception {
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + "/healthchecks/node"))
      .header("Authorization", AUTH)
      .GET()
      .build();
    return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
  }

  private static String getOverview(HttpClient client) throws Exception {
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + "/overview"))
      .header("Authorization", AUTH)
      .GET()
      .build();
    return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
  }
}
// Output: Queue Metrics:
// Output:   Name: orders
// Output:   Messages: 1234
// Output:   Messages ready: 856
// Output: Memory Usage: 45.32%` },
        { name: 'Policy Management', codeExample: `import java.net.http.*;
import java.net.URI;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PolicyManagement {
  private static final String BASE_URL = "http://localhost:15672/api";
  private static final String AUTH = "Basic " +
    Base64.getEncoder().encodeToString("admin:admin".getBytes());

  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    ObjectMapper mapper = new ObjectMapper();

    // Create HA policy for all queues starting with "ha."
    Map<String, Object> haPolicy = new HashMap<>();
    haPolicy.put("pattern", "^ha\\\\.");
    haPolicy.put("apply-to", "queues");

    Map<String, Object> definition = new HashMap<>();
    definition.put("ha-mode", "all");
    definition.put("ha-sync-mode", "automatic");
    haPolicy.put("definition", definition);

    String policyJson = mapper.writeValueAsString(haPolicy);

    HttpRequest createPolicyRequest = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + "/policies/%2f/ha-all"))
      .header("Authorization", AUTH)
      .header("Content-Type", "application/json")
      .PUT(HttpRequest.BodyPublishers.ofString(policyJson))
      .build();

    HttpResponse<String> response = client.send(createPolicyRequest,
      HttpResponse.BodyHandlers.ofString());

    System.out.println("HA Policy created: " + response.statusCode());
    System.out.println("  Pattern: ^ha\\\\.");
    System.out.println("  Mode: Mirror to all nodes");
    System.out.println("  Sync: Automatic");

    // Create TTL policy
    Map<String, Object> ttlPolicy = new HashMap<>();
    ttlPolicy.put("pattern", "^temp\\\\.");
    ttlPolicy.put("apply-to", "queues");

    Map<String, Object> ttlDef = new HashMap<>();
    ttlDef.put("message-ttl", 3600000); // 1 hour
    ttlDef.put("expires", 7200000); // Queue expires after 2 hours
    ttlPolicy.put("definition", ttlDef);

    String ttlPolicyJson = mapper.writeValueAsString(ttlPolicy);

    HttpRequest ttlRequest = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + "/policies/%2f/temp-ttl"))
      .header("Authorization", AUTH)
      .header("Content-Type", "application/json")
      .PUT(HttpRequest.BodyPublishers.ofString(ttlPolicyJson))
      .build();

    HttpResponse<String> ttlResponse = client.send(ttlRequest,
      HttpResponse.BodyHandlers.ofString());

    System.out.println("\\nTTL Policy created: " + ttlResponse.statusCode());
    System.out.println("  Pattern: ^temp\\\\.");
    System.out.println("  Message TTL: 1 hour");
    System.out.println("  Queue expiry: 2 hours");

    // List all policies
    HttpRequest listRequest = HttpRequest.newBuilder()
      .uri(URI.create(BASE_URL + "/policies"))
      .header("Authorization", AUTH)
      .GET()
      .build();

    HttpResponse<String> listResponse = client.send(listRequest,
      HttpResponse.BodyHandlers.ofString());

    System.out.println("\\nAll Policies:");
    System.out.println(listResponse.body());
  }
}
// Output: HA Policy created: 204
// Output:   Pattern: ^ha\\.
// Output:   Mode: Mirror to all nodes
// Output: TTL Policy created: 204
// Output:   Pattern: ^temp\\.` }
      ],
      description: 'Comprehensive web-based management interface and REST API for monitoring cluster health, managing resources, viewing metrics, and configuring policies across the broker.'
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
      console.log('RabbitMQ KeyDown:', e.key, 'isModalOpen:', currentIsModalOpen)

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
          🐰 RabbitMQ
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
          Robust AMQP message broker supporting multiple messaging patterns with powerful routing capabilities.
          Features exchanges, queues, bindings for flexible message distribution, clustering for high availability,
          and comprehensive management tools for operations and monitoring.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="RabbitMQ Architecture Overview"
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
            <div>• AMQP Protocol Support</div>
            <div>• Multiple Exchange Types</div>
            <div>• Flexible Message Routing</div>
            <div>• Publisher Confirms</div>
            <div>• Quorum & Mirrored Queues</div>
            <div>• Management UI & API</div>
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
            <div>• Microservices Communication</div>
            <div>• Task Queue Processing</div>
            <div>• Pub/Sub Messaging</div>
            <div>• Request/Reply Patterns</div>
            <div>• Work Distribution</div>
            <div>• Event Notification Systems</div>
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

export default RabbitMQ
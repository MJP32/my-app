import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function SolaceQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with -)
      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Client Initiates:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text with subtle left padding
      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Solace PubSub+ and explain its architecture and core concepts',
      answer: `**Solace PubSub+:**
Enterprise-grade messaging platform supporting multiple protocols (SMF, MQTT, AMQP, REST, WebSocket) with advanced features for high-performance, reliable message delivery

**Key Features:**
- Multi-protocol support (SMF, MQTT, AMQP 1.0, REST, WebSocket)
- Topic-based publish/subscribe
- Point-to-point queuing
- Request/reply messaging
- High availability and disaster recovery
- Message replay and time-to-live
- Dynamic Message Routing (DMR)
- Event mesh for hybrid/multi-cloud
- Low latency (sub-millisecond)
- High throughput (millions of messages/sec)

**Architecture Components:**

**1. Message VPN (Virtual Private Network):**
\`\`\`
Logical container providing:
- Isolation between applications
- Separate security domains
- Independent configuration
- Multi-tenancy support

Similar to RabbitMQ virtual hosts
Each VPN has own:
- Topics
- Queues
- Client connections
- Access controls
\`\`\`

**2. Topics:**
\`\`\`
Hierarchical structure using "/" delimiter
Examples:
- trading/stocks/AAPL/prices
- orders/region/US/store/123
- events/user/login/success

Wildcard support:
- * (single level): trading/stocks/*/prices
- > (multi-level): trading/stocks/>
\`\`\`

**3. Queues:**
\`\`\`
Durable endpoints for guaranteed delivery
- Store messages persistently
- Support multiple consumers
- Message ordering preserved
- Configurable delivery modes
\`\`\`

**4. Message Delivery Modes:**

**Direct Messages:**
\`\`\`java
// Best effort, no persistence
// Lowest latency, highest throughput
// Lost if broker restarts

final Topic topic = JCSMPFactory.onlyInstance()
    .createTopic("trading/stocks/AAPL");

producer.send(message, topic);
\`\`\`

**Persistent Messages:**
\`\`\`java
// Guaranteed delivery
// Stored to disk
// Survives broker restart
// Higher latency, acknowledged

message.setDeliveryMode(DeliveryMode.PERSISTENT);
producer.send(message, topic);
\`\`\`

**Non-Persistent Messages:**
\`\`\`
// Guaranteed while broker running
// Memory-based storage
// Lost on broker restart
\`\`\`

**5. Quality of Service (QoS):**

**QoS 0 (At Most Once):**
\`\`\`
- Fire and forget
- No acknowledgment
- Fastest, least reliable
\`\`\`

**QoS 1 (At Least Once):**
\`\`\`
- Acknowledged delivery
- May receive duplicates
- Moderate performance
\`\`\`

**QoS 2 (Exactly Once):**
\`\`\`
- Four-way handshake
- No duplicates
- Slowest, most reliable
\`\`\`

**6. Topic to Queue Mapping:**
\`\`\`
Topics → Topic Subscriptions → Queue

Queue subscribes to topics:
queue1 subscribes to "orders/>"
queue2 subscribes to "orders/US/*"

Messages published to topics automatically
delivered to matching queues
\`\`\`

**7. Client Profiles:**
\`\`\`java
// Connection configuration
ClientProfile:
- Max connections per client
- Max subscriptions
- Guaranteed messaging settings
- TCP/TLS settings
- Compression options
\`\`\`

**8. ACL (Access Control Lists):**
\`\`\`
Control client access:
- Publish permissions
- Subscribe permissions
- Topic/queue restrictions

Example:
Client "order-service" can:
- Publish to: orders/>
- Subscribe to: orders/responses/>
- Connect to: vpn "production"
\`\`\`

**Solace Messaging API (JCSMP):**

**Connection:**
\`\`\`java
import com.solacesystems.jcsmp.*;

public class SolaceConnection {
    public JCSMPSession createSession() throws JCSMPException {
        final JCSMPProperties properties = new JCSMPProperties();
        properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
        properties.setProperty(JCSMPProperties.VPN_NAME, "default");
        properties.setProperty(JCSMPProperties.USERNAME, "admin");
        properties.setProperty(JCSMPProperties.PASSWORD, "admin");

        // Optional properties
        properties.setProperty(JCSMPProperties.REAPPLY_SUBSCRIPTIONS, true);
        properties.setProperty(JCSMPProperties.GENERATE_SEQUENCE_NUMBERS, true);

        final JCSMPSession session = JCSMPFactory.onlyInstance()
            .createSession(properties);

        session.connect();
        return session;
    }
}
\`\`\`

**Publisher:**
\`\`\`java
public class DirectPublisher {
    public void publish(JCSMPSession session, String topicName, String message)
        throws JCSMPException {

        // Create producer
        final XMLMessageProducer producer = session.getMessageProducer(
            new JCSMPStreamingPublishEventHandler() {
                @Override
                public void responseReceived(String messageID) {
                    log.info("Producer received response for msg: {}", messageID);
                }

                @Override
                public void handleError(String messageID, JCSMPException e, long timestamp) {
                    log.error("Producer error for msg: {}", messageID, e);
                }
            }
        );

        // Create topic
        final Topic topic = JCSMPFactory.onlyInstance().createTopic(topicName);

        // Create message
        final TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        msg.setText(message);

        // Send message
        producer.send(msg, topic);

        log.info("Message published to topic: {}", topicName);
    }
}
\`\`\`

**Subscriber:**
\`\`\`java
public class DirectSubscriber {
    public void subscribe(JCSMPSession session, String topicName) throws JCSMPException {

        // Create consumer
        final XMLMessageConsumer consumer = session.getMessageConsumer(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    if (message instanceof TextMessage) {
                        TextMessage textMsg = (TextMessage) message;
                        log.info("Received message: {}", textMsg.getText());
                        log.info("Topic: {}", message.getDestination().getName());
                    }
                }

                @Override
                public void onException(JCSMPException e) {
                    log.error("Consumer exception", e);
                }
            }
        );

        // Create topic and subscribe
        final Topic topic = JCSMPFactory.onlyInstance().createTopic(topicName);
        session.addSubscription(topic);

        // Start consumer
        consumer.start();

        log.info("Subscribed to topic: {}", topicName);
    }
}
\`\`\`

**Guaranteed Messaging:**
\`\`\`java
public class GuaranteedPublisher {
    public void publishGuaranteed(JCSMPSession session, String queueName, String message)
        throws JCSMPException {

        // Create queue
        final Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);

        // Create producer with flow control
        final XMLMessageProducer producer = session.getMessageProducer(
            new JCSMPStreamingPublishCorrelatingEventHandler() {
                @Override
                public void responseReceivedEx(Object key) {
                    log.info("Message acknowledged: {}", key);
                }

                @Override
                public void handleErrorEx(Object key, JCSMPException cause, long timestamp) {
                    log.error("Message failed: {}", key, cause);
                }
            }
        );

        // Create persistent message
        final TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        msg.setText(message);
        msg.setDeliveryMode(DeliveryMode.PERSISTENT);

        // Send with correlation key
        String correlationKey = UUID.randomUUID().toString();
        producer.send(msg, queue, correlationKey);

        log.info("Persistent message sent to queue: {}", queueName);
    }
}
\`\`\``
    },
    {
      id: 2,
      category: 'Topic Hierarchies',
      difficulty: 'Medium',
      question: 'Explain Solace topic hierarchies, wildcards, and subscription patterns',
      answer: `**Solace Topic Hierarchies:**

**Topic Structure:**
\`\`\`
Hierarchical structure with "/" delimiter

Basic pattern:
<category>/<subcategory>/<entity>/<attribute>/<detail>

Examples:
trading/stocks/NASDAQ/AAPL/price
trading/stocks/NYSE/IBM/volume
orders/region/US/state/CA/store/123
events/user/12345/login/success
sensors/building/A/floor/3/room/301/temperature
\`\`\`

**Wildcard Matching:**

**Single Level Wildcard (*):**
\`\`\`
Matches exactly one level

Subscription: trading/stocks/*/AAPL
Matches:
  ✓ trading/stocks/NASDAQ/AAPL
  ✓ trading/stocks/NYSE/AAPL
  ✗ trading/stocks/AAPL
  ✗ trading/stocks/NASDAQ/AAPL/price

Subscription: orders/region/*/store/123
Matches:
  ✓ orders/region/US/store/123
  ✓ orders/region/EU/store/123
  ✗ orders/region/US/state/CA/store/123
\`\`\`

**Multi Level Wildcard (>):**
\`\`\`
Matches zero or more levels
Must be last token in subscription

Subscription: trading/stocks/>
Matches:
  ✓ trading/stocks/AAPL
  ✓ trading/stocks/NASDAQ/AAPL
  ✓ trading/stocks/NASDAQ/AAPL/price
  ✓ trading/stocks/NYSE/IBM/volume/realtime
  ✗ trading/forex/EURUSD

Subscription: orders/>
Matches:
  ✓ orders/created
  ✓ orders/region/US/store/123
  ✓ orders/status/pending/priority/high
\`\`\`

**Combined Wildcards:**
\`\`\`
Subscription: trading/stocks/*/AAPL/>
Matches:
  ✓ trading/stocks/NASDAQ/AAPL/price
  ✓ trading/stocks/NYSE/AAPL/volume
  ✓ trading/stocks/NASDAQ/AAPL/price/realtime/USD
  ✗ trading/stocks/AAPL/price

Subscription: sensors/building/*/floor/*/temperature
Matches:
  ✓ sensors/building/A/floor/1/temperature
  ✓ sensors/building/B/floor/3/temperature
  ✗ sensors/building/A/floor/1/room/301/temperature
\`\`\`

**Java Examples:**

**Simple Topic Publishing:**
\`\`\`java
@Service
public class TradingService {
    private final SolacePublisher publisher;

    public void publishStockPrice(Stock stock) {
        String topic = String.format(
            "trading/stocks/%s/%s/price",
            stock.getExchange(),
            stock.getSymbol()
        );

        StockPrice price = new StockPrice(
            stock.getSymbol(),
            stock.getPrice(),
            Instant.now()
        );

        publisher.publish(topic, price);
    }

    public void publishOrderEvent(Order order) {
        String topic = String.format(
            "orders/region/%s/store/%s/status/%s",
            order.getRegion(),
            order.getStoreId(),
            order.getStatus()
        );

        publisher.publish(topic, order);
    }
}
\`\`\`

**Topic Subscriptions:**
\`\`\`java
@Service
public class MarketDataSubscriber {

    public void subscribeToAllStocks(JCSMPSession session) throws JCSMPException {
        // Subscribe to all stock prices
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("trading/stocks/>")
        );
    }

    public void subscribeToNasdaqStocks(JCSMPSession session) throws JCSMPException {
        // Subscribe to NASDAQ stocks only
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("trading/stocks/NASDAQ/>")
        );
    }

    public void subscribeToSpecificStock(JCSMPSession session, String symbol)
        throws JCSMPException {
        // Subscribe to all data for specific stock
        String topicPattern = "trading/stocks/*/" + symbol + "/>";
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic(topicPattern)
        );
    }

    public void subscribeToStockPrices(JCSMPSession session) throws JCSMPException {
        // Subscribe to prices only (all exchanges, all stocks)
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("trading/stocks/*/*/price")
        );
    }
}
\`\`\`

**Dynamic Subscriptions:**
\`\`\`java
@Service
public class DynamicSubscriptionService {
    private final JCSMPSession session;
    private final Set<Topic> activeSubscriptions = new ConcurrentHashMap.newKeySet();

    public void subscribeToRegion(String region) throws JCSMPException {
        String topicPattern = "orders/region/" + region + "/>";
        Topic topic = JCSMPFactory.onlyInstance().createTopic(topicPattern);

        session.addSubscription(topic);
        activeSubscriptions.add(topic);

        log.info("Subscribed to region: {}", region);
    }

    public void unsubscribeFromRegion(String region) throws JCSMPException {
        String topicPattern = "orders/region/" + region + "/>";
        Topic topic = JCSMPFactory.onlyInstance().createTopic(topicPattern);

        session.removeSubscription(topic);
        activeSubscriptions.remove(topic);

        log.info("Unsubscribed from region: {}", region);
    }

    public void subscribeToStoreEvents(String storeId) throws JCSMPException {
        // Subscribe to all events for specific store
        String topicPattern = "orders/region/*/store/" + storeId + "/>";
        Topic topic = JCSMPFactory.onlyInstance().createTopic(topicPattern);

        session.addSubscription(topic);
        activeSubscriptions.add(topic);
    }
}
\`\`\`

**Message Filtering:**
\`\`\`java
@Service
public class MessageFilterService {
    private final XMLMessageConsumer consumer;

    public void setupConsumerWithFiltering(JCSMPSession session) throws JCSMPException {
        consumer = session.getMessageConsumer(new XMLMessageListener() {
            @Override
            public void onReceive(BytesXMLMessage message) {
                String topic = message.getDestination().getName();

                // Extract components from topic
                String[] parts = topic.split("/");

                if (parts.length >= 4) {
                    String category = parts[0];    // trading
                    String type = parts[1];        // stocks
                    String exchange = parts[2];    // NASDAQ
                    String symbol = parts[3];      // AAPL

                    // Process based on topic structure
                    if ("stocks".equals(type) && "NASDAQ".equals(exchange)) {
                        processNasdaqStock(symbol, message);
                    } else if ("stocks".equals(type) && "NYSE".equals(exchange)) {
                        processNyseStock(symbol, message);
                    }
                }
            }

            @Override
            public void onException(JCSMPException e) {
                log.error("Consumer exception", e);
            }
        });

        // Subscribe to all stock data
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("trading/stocks/>")
        );

        consumer.start();
    }
}
\`\`\`

**Topic Best Practices:**

**1. Design Principles:**
\`\`\`
Good topic design:
✓ trading/stocks/NASDAQ/AAPL/price
✓ orders/region/US/state/CA/store/123
✓ events/user/12345/action/login
✓ sensors/building/A/floor/3/room/301/temperature

Poor topic design:
✗ trading-stocks-NASDAQ-AAPL-price (use "/" not "-")
✗ AAPL (too generic, no hierarchy)
✗ trading/NASDAQ-AAPL (mixed hierarchy)
✗ user_12345_login (use "/" for structure)
\`\`\`

**2. Hierarchy Guidelines:**
\`\`\`
- Most general to most specific (left to right)
- Use consistent naming conventions
- Keep levels meaningful and queryable
- Plan for future expansion
- Document topic structure
- Limit nesting depth (typically 5-7 levels)
\`\`\`

**3. Topic Configuration:**
\`\`\`java
// Reject messages to unknown topics
session.getProperty(JCSMPProperties.MESSAGE_CALLBACK_ON_REACTOR);

// Set topic dispatch properties
session.getProperty(JCSMPProperties.SUB_CONFIRM_MODE);

// Configure topic permissions in VPN
// Publish ACL: orders/>
// Subscribe ACL: orders/responses/>
\`\`\``
    },
    {
      id: 3,
      category: 'Guaranteed Messaging',
      difficulty: 'Hard',
      question: 'Explain Solace guaranteed messaging, queues, and Spring integration',
      answer: `**Solace Guaranteed Messaging:**

**Queue Configuration:**
\`\`\`java
import com.solacesystems.jcsmp.*;

public class QueueProvisioner {
    public void provisionQueue(JCSMPSession session, String queueName)
        throws JCSMPException {

        // Create endpoint properties
        EndpointProperties endpointProps = new EndpointProperties();
        endpointProps.setPermission(EndpointProperties.PERMISSION_CONSUME);
        endpointProps.setAccessType(EndpointProperties.ACCESSTYPE_EXCLUSIVE);

        // Queue configuration
        endpointProps.setMaxMsgSize(10000000);  // 10MB
        endpointProps.setQuota(5000);           // 5000 messages
        endpointProps.setRespectsTTL(true);

        // Create queue
        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);
        session.provision(queue, endpointProps, JCSMPSession.FLAG_IGNORE_ALREADY_EXISTS);

        // Add topic subscription to queue
        Topic topic = JCSMPFactory.onlyInstance().createTopic("orders/>");
        session.addSubscription(queue, topic, JCSMPSession.WAIT_FOR_CONFIRM);

        log.info("Queue provisioned: {}", queueName);
    }
}
\`\`\`

**Guaranteed Publisher:**
\`\`\`java
@Service
public class GuaranteedPublisher {
    private final JCSMPSession session;
    private XMLMessageProducer producer;

    @PostConstruct
    public void init() throws JCSMPException {
        producer = session.getMessageProducer(
            new JCSMPStreamingPublishCorrelatingEventHandler() {
                @Override
                public void responseReceivedEx(Object key) {
                    log.info("Message acknowledged: {}", key);
                }

                @Override
                public void handleErrorEx(Object key, JCSMPException cause, long timestamp) {
                    log.error("Message send failed: {}", key, cause);
                    // Retry logic here
                    retryMessage(key);
                }
            }
        );
    }

    public void publishToQueue(String queueName, Order order) throws JCSMPException {
        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);

        TextMessage message = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        message.setText(toJson(order));
        message.setDeliveryMode(DeliveryMode.PERSISTENT);

        // Set message properties
        message.setCorrelationId(order.getId());
        message.setApplicationMessageId(UUID.randomUUID().toString());
        message.setTimeToLive(60000);  // 60 seconds

        // Custom properties
        SDTMap userProperties = JCSMPFactory.onlyInstance().createMap();
        userProperties.putString("orderType", order.getType());
        userProperties.putString("region", order.getRegion());
        message.setProperties(userProperties);

        // Send with correlation key for tracking
        String correlationKey = order.getId();
        producer.send(message, queue, correlationKey);

        log.info("Published order {} to queue {}", order.getId(), queueName);
    }

    public void publishToTopic(String topicName, Object payload) throws JCSMPException {
        Topic topic = JCSMPFactory.onlyInstance().createTopic(topicName);

        TextMessage message = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        message.setText(toJson(payload));
        message.setDeliveryMode(DeliveryMode.PERSISTENT);

        producer.send(message, topic);
    }
}
\`\`\`

**Guaranteed Consumer:**
\`\`\`java
@Service
public class GuaranteedConsumer {
    private final JCSMPSession session;
    private FlowReceiver flowReceiver;

    public void startConsuming(String queueName) throws JCSMPException {
        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);

        // Configure flow properties
        ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
        flowProps.setEndpoint(queue);
        flowProps.setAckMode(JCSMPProperties.SUPPORTED_MESSAGE_ACK_CLIENT);

        // Create flow receiver
        flowReceiver = session.createFlow(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    if (message instanceof TextMessage) {
                        try {
                            TextMessage textMsg = (TextMessage) message;
                            Order order = fromJson(textMsg.getText(), Order.class);

                            // Process message
                            processOrder(order);

                            // Acknowledge message
                            message.ackMessage();

                            log.info("Processed and acknowledged order: {}", order.getId());

                        } catch (Exception e) {
                            log.error("Failed to process message", e);
                            // Don't acknowledge - message will be redelivered
                        }
                    }
                }

                @Override
                public void onException(JCSMPException e) {
                    log.error("Flow receiver exception", e);
                }
            },
            flowProps,
            null
        );

        // Start flow
        flowReceiver.start();

        log.info("Started consuming from queue: {}", queueName);
    }

    @PreDestroy
    public void stopConsuming() {
        if (flowReceiver != null) {
            flowReceiver.close();
        }
    }
}
\`\`\`

**Spring Boot Integration:**

**Dependencies:**
\`\`\`xml
<dependency>
    <groupId>com.solace.spring.boot</groupId>
    <artifactId>solace-spring-boot-starter</artifactId>
    <version>1.3.0</version>
</dependency>

<dependency>
    <groupId>com.solace.spring.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-solace</artifactId>
    <version>3.3.0</version>
</dependency>
\`\`\`

**Configuration:**
\`\`\`yaml
# application.yml
solace:
  java:
    host: tcp://localhost:55555
    msg-vpn: default
    client-username: admin
    client-password: admin
    connect-retries: 3
    reconnect-retries: 3
    connect-retries-per-host: 5

spring:
  cloud:
    stream:
      bindings:
        output:
          destination: orders/created
          group: order-service
        input:
          destination: orders/>
          group: order-processor
          consumer:
            concurrency: 3
      solace:
        bindings:
          input:
            consumer:
              queue-additional-subscriptions:
                - orders/updated
                - orders/cancelled
              queue-access-type: 0  # Exclusive
\`\`\`

**Spring Cloud Stream:**
\`\`\`java
@Configuration
public class SolaceConfig {

    @Bean
    public Function<Order, Order> processOrder() {
        return order -> {
            log.info("Processing order: {}", order);
            order.setStatus("PROCESSED");
            return order;
        };
    }

    @Bean
    public Consumer<Order> handleOrder() {
        return order -> {
            log.info("Handling order: {}", order);
            // Process order
        };
    }

    @Bean
    public Supplier<Order> orderSupplier() {
        return () -> {
            // Generate orders periodically
            return createOrder();
        };
    }
}

@Service
public class OrderService {
    private final StreamBridge streamBridge;

    public void publishOrder(Order order) {
        // Publish to dynamic destination
        streamBridge.send("orders/created", order);

        // With headers
        Message<Order> message = MessageBuilder
            .withPayload(order)
            .setHeader("orderType", order.getType())
            .setHeader("priority", order.getPriority())
            .build();

        streamBridge.send("orders/created", message);
    }
}
\`\`\`

**Spring JMS Integration:**
\`\`\`java
@Configuration
@EnableJms
public class SolaceJmsConfig {

    @Bean
    public ConnectionFactory connectionFactory() {
        SolConnectionFactory factory = new SolConnectionFactory();
        factory.setHost("tcp://localhost:55555");
        factory.setVPN("default");
        factory.setUsername("admin");
        factory.setPassword("admin");
        return factory;
    }

    @Bean
    public JmsTemplate jmsTemplate(ConnectionFactory connectionFactory) {
        JmsTemplate template = new JmsTemplate(connectionFactory);
        template.setDeliveryPersistent(true);
        template.setExplicitQosEnabled(true);
        template.setPubSubDomain(false);  // Queue mode
        return template;
    }

    @Bean
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(
        ConnectionFactory connectionFactory
    ) {
        DefaultJmsListenerContainerFactory factory =
            new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setConcurrency("3-10");
        factory.setSessionAcknowledgeMode(Session.CLIENT_ACKNOWLEDGE);
        return factory;
    }
}

@Service
public class OrderJmsService {
    private final JmsTemplate jmsTemplate;

    public void sendOrder(Order order) {
        jmsTemplate.convertAndSend("orders-queue", order, message -> {
            message.setStringProperty("orderType", order.getType());
            message.setStringProperty("region", order.getRegion());
            return message;
        });
    }

    @JmsListener(destination = "orders-queue", concurrency = "3-5")
    public void receiveOrder(Order order, Message message) {
        try {
            log.info("Received order: {}", order);
            processOrder(order);
            message.acknowledge();
        } catch (Exception e) {
            log.error("Failed to process order", e);
            // Don't acknowledge - message will be redelivered
        }
    }
}
\`\`\`

**Transaction Support:**
\`\`\`java
@Service
public class TransactionalService {
    private final JCSMPSession session;

    @Transactional
    public void processOrderWithTransaction(Order order) throws JCSMPException {
        // Create transacted session
        SessionEventHandler eventHandler = new SessionEventHandler() {
            @Override
            public void handleEvent(SessionEventArgs event) {
                log.info("Session event: {}", event);
            }
        };

        JCSMPSession txSession = session.createTransactedSession(
            null,
            eventHandler
        );

        try {
            XMLMessageProducer producer = txSession.getMessageProducer(null);

            // Publish messages within transaction
            TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
            msg.setText(toJson(order));
            msg.setDeliveryMode(DeliveryMode.PERSISTENT);

            Queue queue = JCSMPFactory.onlyInstance().createQueue("orders-queue");
            producer.send(msg, queue);

            // Commit transaction
            txSession.commit();

            log.info("Transaction committed for order: {}", order.getId());

        } catch (Exception e) {
            // Rollback transaction
            txSession.rollback();
            log.error("Transaction rolled back", e);
            throw e;
        } finally {
            txSession.closeSession();
        }
    }
}
\`\`\`

**Message Replay:**
\`\`\`java
@Service
public class MessageReplayService {

    public void replayMessages(JCSMPSession session, String queueName, Date startTime)
        throws JCSMPException {

        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);

        // Configure replay
        ReplayStartLocation startLocation = new ReplayStartLocationDate(startTime);

        ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
        flowProps.setEndpoint(queue);
        flowProps.setStartState(true);
        flowProps.setReplayStartLocation(startLocation);

        FlowReceiver flowReceiver = session.createFlow(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    log.info("Replayed message: {}", message);
                    // Process replayed message
                }

                @Override
                public void onException(JCSMPException e) {
                    log.error("Replay exception", e);
                }
            },
            flowProps,
            null
        );

        flowReceiver.start();
    }
}
\`\`\``
    },
    {
      id: 4,
      category: 'Patterns',
      difficulty: 'Medium',
      question: 'Explain Solace messaging patterns and best practices',
      answer: `**Solace Messaging Patterns:**

**1. Publish/Subscribe Pattern:**
\`\`\`java
// Publisher
@Service
public class EventPublisher {
    private final JCSMPSession session;
    private final XMLMessageProducer producer;

    public void publishEvent(String eventType, Object payload) throws JCSMPException {
        String topic = "events/" + eventType;

        TextMessage message = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        message.setText(toJson(payload));

        Topic topicDestination = JCSMPFactory.onlyInstance().createTopic(topic);
        producer.send(message, topicDestination);

        log.info("Published event to topic: {}", topic);
    }
}

// Subscribers
@Service
public class EventSubscriber1 {
    public void subscribe(JCSMPSession session) throws JCSMPException {
        XMLMessageConsumer consumer = session.getMessageConsumer(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    handleEvent(message);
                }

                @Override
                public void onException(JCSMPException e) {
                    log.error("Subscriber error", e);
                }
            }
        );

        // Subscribe to specific events
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("events/order/*")
        );

        consumer.start();
    }
}

@Service
public class EventSubscriber2 {
    public void subscribe(JCSMPSession session) throws JCSMPException {
        // Subscribe to all events
        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("events/>")
        );
    }
}
\`\`\`

**2. Request/Reply Pattern:**
\`\`\`java
@Service
public class RequestReplyService {

    // Requester
    public String sendRequest(JCSMPSession session, String request)
        throws JCSMPException, InterruptedException, TimeoutException {

        // Create temporary reply-to topic
        Topic replyTopic = session.createTemporaryTopic();

        // Create request message
        TextMessage requestMsg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        requestMsg.setText(request);
        requestMsg.setReplyTo(replyTopic);
        requestMsg.setCorrelationId(UUID.randomUUID().toString());

        // Setup reply consumer
        CompletableFuture<String> replyFuture = new CompletableFuture<>();

        XMLMessageConsumer consumer = session.getMessageConsumer(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    if (message instanceof TextMessage) {
                        TextMessage textMsg = (TextMessage) message;
                        replyFuture.complete(textMsg.getText());
                    }
                }

                @Override
                public void onException(JCSMPException e) {
                    replyFuture.completeExceptionally(e);
                }
            }
        );

        session.addSubscription(replyTopic);
        consumer.start();

        // Send request
        Topic requestTopic = JCSMPFactory.onlyInstance().createTopic("requests/process");
        XMLMessageProducer producer = session.getMessageProducer(null);
        producer.send(requestMsg, requestTopic);

        // Wait for reply with timeout
        String reply = replyFuture.get(5, TimeUnit.SECONDS);

        consumer.close();
        return reply;
    }

    // Responder
    public void startResponder(JCSMPSession session) throws JCSMPException {
        XMLMessageConsumer consumer = session.getMessageConsumer(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    try {
                        // Process request
                        String request = ((TextMessage) message).getText();
                        String response = processRequest(request);

                        // Send reply
                        Destination replyTo = message.getReplyTo();
                        String correlationId = message.getCorrelationId();

                        if (replyTo != null) {
                            TextMessage replyMsg = JCSMPFactory.onlyInstance()
                                .createMessage(TextMessage.class);
                            replyMsg.setText(response);
                            replyMsg.setCorrelationId(correlationId);

                            XMLMessageProducer producer = session.getMessageProducer(null);
                            producer.send(replyMsg, replyTo);
                        }
                    } catch (Exception e) {
                        log.error("Error processing request", e);
                    }
                }

                @Override
                public void onException(JCSMPException e) {
                    log.error("Responder error", e);
                }
            }
        );

        session.addSubscription(
            JCSMPFactory.onlyInstance().createTopic("requests/>")
        );

        consumer.start();
    }
}
\`\`\`

**3. Queue Load Balancing:**
\`\`\`java
@Service
public class LoadBalancedConsumer {

    public void startMultipleConsumers(JCSMPSession session, String queueName, int numConsumers)
        throws JCSMPException {

        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);

        for (int i = 0; i < numConsumers; i++) {
            final int consumerId = i;

            ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
            flowProps.setEndpoint(queue);
            flowProps.setAckMode(JCSMPProperties.SUPPORTED_MESSAGE_ACK_CLIENT);

            FlowReceiver flowReceiver = session.createFlow(
                new XMLMessageListener() {
                    @Override
                    public void onReceive(BytesXMLMessage message) {
                        log.info("Consumer {} received message", consumerId);
                        processMessage(message);
                        message.ackMessage();
                    }

                    @Override
                    public void onException(JCSMPException e) {
                        log.error("Consumer {} error", consumerId, e);
                    }
                },
                flowProps,
                null
            );

            flowReceiver.start();
            log.info("Started consumer {} for queue {}", consumerId, queueName);
        }
    }
}
\`\`\`

**4. Last Value Queue:**
\`\`\`java
@Service
public class LastValueQueueService {

    public void provisionLVQ(JCSMPSession session, String queueName) throws JCSMPException {
        EndpointProperties props = new EndpointProperties();
        props.setAccessType(EndpointProperties.ACCESSTYPE_EXCLUSIVE);

        // Enable Last Value Queue
        props.setLastValueQueueEnabled(true);

        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);
        session.provision(queue, props, JCSMPSession.FLAG_IGNORE_ALREADY_EXISTS);
    }

    public void publishToLVQ(String queueName, Stock stock) throws JCSMPException {
        TextMessage message = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
        message.setText(toJson(stock));
        message.setDeliveryMode(DeliveryMode.PERSISTENT);

        // Set LVQ key (only latest message per key retained)
        SDTMap props = JCSMPFactory.onlyInstance().createMap();
        props.putString("JMS_Solace_DeliverToOne", "true");
        props.putString("JMS_Solace_DeadMsgQueue", "DMQ");

        // Use stock symbol as LVQ key
        message.setApplicationMessageId(stock.getSymbol());
        message.setProperties(props);

        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);
        XMLMessageProducer producer = session.getMessageProducer(null);
        producer.send(message, queue);
    }
}
\`\`\`

**Best Practices:**

**1. Connection Management:**
\`\`\`java
@Configuration
public class SolaceConnectionConfig {

    @Bean
    public JCSMPSession createSession() throws JCSMPException {
        JCSMPProperties properties = new JCSMPProperties();
        properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
        properties.setProperty(JCSMPProperties.VPN_NAME, "default");
        properties.setProperty(JCSMPProperties.USERNAME, "admin");
        properties.setProperty(JCSMPProperties.PASSWORD, "admin");

        // Connection settings
        properties.setProperty(JCSMPProperties.REAPPLY_SUBSCRIPTIONS, true);
        properties.setProperty(JCSMPProperties.GENERATE_SEQUENCE_NUMBERS, true);
        properties.setProperty(JCSMPProperties.CONNECT_RETRIES, 3);
        properties.setProperty(JCSMPProperties.RECONNECT_RETRIES, -1);  // Infinite
        properties.setProperty(JCSMPProperties.CONNECT_TIMEOUT_MS, 10000);

        // Performance tuning
        properties.setProperty(JCSMPProperties.PUB_ACK_WINDOW_SIZE, 50);
        properties.setProperty(JCSMPProperties.SUB_ACK_WINDOW_SIZE, 255);

        JCSMPSession session = JCSMPFactory.onlyInstance().createSession(properties);
        session.connect();

        return session;
    }

    @PreDestroy
    public void cleanup(JCSMPSession session) {
        if (session != null && !session.isClosed()) {
            session.closeSession();
        }
    }
}
\`\`\`

**2. Error Handling:**
\`\`\`java
@Service
public class RobustConsumer {

    public void setupConsumerWithRetry(JCSMPSession session, String queueName)
        throws JCSMPException {

        Queue queue = JCSMPFactory.onlyInstance().createQueue(queueName);

        ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
        flowProps.setEndpoint(queue);
        flowProps.setAckMode(JCSMPProperties.SUPPORTED_MESSAGE_ACK_CLIENT);

        FlowReceiver flowReceiver = session.createFlow(
            new XMLMessageListener() {
                @Override
                public void onReceive(BytesXMLMessage message) {
                    int retries = 0;
                    int maxRetries = 3;

                    while (retries < maxRetries) {
                        try {
                            processMessage(message);
                            message.ackMessage();
                            return;
                        } catch (Exception e) {
                            retries++;
                            log.warn("Processing failed, retry {}/{}", retries, maxRetries, e);

                            if (retries < maxRetries) {
                                try {
                                    Thread.sleep(1000 * retries);  // Exponential backoff
                                } catch (InterruptedException ie) {
                                    Thread.currentThread().interrupt();
                                }
                            }
                        }
                    }

                    // Failed after retries - reject to DMQ
                    log.error("Message processing failed after {} retries", maxRetries);
                    // Don't acknowledge - message goes to DMQ
                }

                @Override
                public void onException(JCSMPException e) {
                    log.error("Flow receiver exception", e);
                }
            },
            flowProps,
            null
        );

        flowReceiver.start();
    }
}
\`\`\`

**3. Performance Optimization:**
\`\`\`java
@Service
public class HighPerformancePublisher {

    public void optimizedPublish(JCSMPSession session) throws JCSMPException {
        // Create producer with publisher flow control
        JCSMPStreamingPublishCorrelatingEventHandler handler =
            new JCSMPStreamingPublishCorrelatingEventHandler() {
                @Override
                public void responseReceivedEx(Object key) {
                    // Track successful publishes
                }

                @Override
                public void handleErrorEx(Object key, JCSMPException cause, long timestamp) {
                    // Handle failures
                }
            };

        XMLMessageProducer producer = session.getMessageProducer(handler);

        // Use message pooling
        BytesMessage message = JCSMPFactory.onlyInstance().createMessage(BytesMessage.class);

        // Batch publishing
        for (int i = 0; i < 1000; i++) {
            message.reset();
            message.writeBytes(generatePayload(i));
            message.setDeliveryMode(DeliveryMode.PERSISTENT);

            Topic topic = JCSMPFactory.onlyInstance().createTopic("high-volume/data");
            producer.send(message, topic);
        }
    }
}
\`\`\`

**4. Monitoring:**
\`\`\`java
@Component
public class SolaceHealthIndicator implements HealthIndicator {

    private final JCSMPSession session;

    @Override
    public Health health() {
        try {
            if (session == null || session.isClosed()) {
                return Health.down().withDetail("reason", "Session closed").build();
            }

            JCSMPSessionStats stats = session.getSessionStats();

            return Health.up()
                .withDetail("connected", !session.isClosed())
                .withDetail("totalMsgsReceived", stats.getTotalMsgsReceived())
                .withDetail("totalMsgsSent", stats.getTotalMsgsSent())
                .build();

        } catch (Exception e) {
            return Health.down().withException(e).build();
        }
    }
}
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Topic Hierarchies': '#3b82f6',
      'Guaranteed Messaging': '#7c3aed',
      'Patterns': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
          textAlign: 'left',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Solace Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Solace questions covering PubSub+, topics, queues, message VPNs, and Spring integration.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`SolaceQuestions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',

                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem', textAlign: 'left' }}>
          Solace Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Design topic hierarchies with clear structure and naming conventions</li>
          <li>Use wildcards appropriately for flexible subscriptions</li>
          <li>Implement guaranteed messaging for critical messages</li>
          <li>Configure appropriate queue sizes and TTLs</li>
          <li>Use message VPNs for isolation and multi-tenancy</li>
          <li>Enable message replay for recovery scenarios</li>
          <li>Monitor queue depths and consumer performance</li>
          <li>Implement proper error handling and dead message queues</li>
        </ul>
      </div>
    </div>
  )
}

export default SolaceQuestions

import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function RabbitMQQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      return <div key={lineIndex}>{line}</div>
    })
  }

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'Explain RabbitMQ fundamentals, AMQP protocol, and core concepts',
      answer: `**RabbitMQ:**
Open-source message broker that implements Advanced Message Queuing Protocol (AMQP), enabling applications to communicate through message passing

**Key Features:**
- Multiple messaging protocols (AMQP 0-9-1, MQTT, STOMP)
- Flexible routing with exchanges
- Message acknowledgment and persistence
- Publisher confirms and consumer acknowledgments
- High availability through clustering
- Federation and shovel for multi-datacenter
- Management UI and monitoring
- Plugin architecture

**AMQP Protocol:**

**Core Concepts:**
\`\`\`
Producer → Exchange → Queue → Consumer

Publisher: Sends messages to exchange
Exchange: Routes messages to queues based on rules
Queue: Buffer that stores messages
Consumer: Receives messages from queue
Binding: Link between exchange and queue with routing key
\`\`\`

**Message Flow:**
\`\`\`java
// 1. Producer publishes message to exchange
channel.basicPublish(
    "orders-exchange",     // Exchange name
    "order.created",       // Routing key
    MessageProperties.PERSISTENT_TEXT_PLAIN,
    message.getBytes()
);

// 2. Exchange routes to queue based on binding
// 3. Queue stores message
// 4. Consumer receives message

channel.basicConsume(
    "orders-queue",
    false,  // Auto-ack disabled
    deliverCallback,
    cancelCallback
);
\`\`\`

**Message Properties:**
\`\`\`java
AMQP.BasicProperties properties = new AMQP.BasicProperties.Builder()
    .contentType("application/json")
    .deliveryMode(2)  // Persistent
    .priority(5)
    .messageId(UUID.randomUUID().toString())
    .timestamp(new Date())
    .expiration("60000")  // TTL in ms
    .userId("user")
    .appId("order-service")
    .headers(Map.of("trace-id", "xyz123"))
    .build();

channel.basicPublish("exchange", "routing.key", properties, body);
\`\`\`

**Virtual Hosts:**
\`\`\`
Logical grouping of exchanges, queues, bindings
- Separate environments (dev, staging, prod)
- Multi-tenancy
- Independent access control
- Isolated message flows

connectionFactory.setVirtualHost("/production");
\`\`\`

**Connections and Channels:**
\`\`\`java
// Connection: TCP connection to RabbitMQ
ConnectionFactory factory = new ConnectionFactory();
factory.setHost("localhost");
factory.setPort(5672);
factory.setUsername("guest");
factory.setPassword("guest");
factory.setVirtualHost("/");

Connection connection = factory.newConnection();

// Channel: Virtual connection inside connection
// Lightweight, multiplexed over single connection
Channel channel = connection.createChannel();

// Best practice: One channel per thread
// Reuse connections, create multiple channels
\`\`\`

**Queue Declaration:**
\`\`\`java
channel.queueDeclare(
    "orders-queue",     // Queue name
    true,               // Durable (survives broker restart)
    false,              // Exclusive (only this connection)
    false,              // Auto-delete (delete when unused)
    Map.of(
        "x-message-ttl", 60000,           // Message TTL
        "x-max-length", 10000,            // Queue max length
        "x-max-priority", 10,             // Priority support
        "x-dead-letter-exchange", "dlx",  // Dead letter exchange
        "x-queue-type", "quorum"          // Quorum queue
    )
);
\`\`\`

**Exchange Types:**

**1. Direct Exchange:**
\`\`\`
Routes messages with exact routing key match

Producer                Exchange              Queue
  |                         |                    |
  |---routing.key=order--->|                    |
  |                         |---order---------->|
  |---routing.key=payment->|                    |
  |                         |---payment-------->| payment-queue
\`\`\`

**2. Fanout Exchange:**
\`\`\`
Routes messages to all bound queues (broadcast)

Producer                Exchange              Queues
  |                         |                    |
  |----------------------->|---copy----------->| queue-1
  |                         |---copy----------->| queue-2
  |                         |---copy----------->| queue-3
\`\`\`

**3. Topic Exchange:**
\`\`\`
Routes using pattern matching on routing key

Routing patterns:
* (star) - exactly one word
# (hash) - zero or more words

order.created.usa  →  order.#         ✓
order.created.usa  →  order.*.usa     ✓
order.created.usa  →  order.created.* ✓
order.updated.usa  →  order.created.* ✗
\`\`\`

**4. Headers Exchange:**
\`\`\`
Routes based on message headers instead of routing key

Match conditions:
- x-match: all (all headers must match)
- x-match: any (any header matches)
\`\`\`

**Message Acknowledgment:**
\`\`\`java
// Manual acknowledgment (recommended)
channel.basicConsume("queue", false, (consumerTag, delivery) -> {
    try {
        processMessage(delivery.getBody());
        // Positive acknowledgment
        channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
    } catch (Exception e) {
        // Negative acknowledgment - requeue
        channel.basicNack(delivery.getEnvelope().getDeliveryTag(), false, true);
    }
}, consumerTag -> {});

// Auto acknowledgment (less safe)
channel.basicConsume("queue", true, deliverCallback, cancelCallback);
\`\`\`

**Publisher Confirms:**
\`\`\`java
// Enable publisher confirms
channel.confirmSelect();

// Synchronous confirm (slow)
channel.basicPublish("exchange", "key", null, message);
channel.waitForConfirmsOrDie(5000);

// Asynchronous confirm (faster)
channel.addConfirmListener(
    (sequenceNumber, multiple) -> {
        // Message confirmed
        log.info("Message {} confirmed", sequenceNumber);
    },
    (sequenceNumber, multiple) -> {
        // Message nacked
        log.error("Message {} not confirmed", sequenceNumber);
    }
);
\`\`\`

**Durability and Persistence:**
\`\`\`java
// Durable exchange (survives restart)
channel.exchangeDeclare("orders-exchange", "topic", true);

// Durable queue (survives restart)
channel.queueDeclare("orders-queue", true, false, false, null);

// Persistent message (written to disk)
AMQP.BasicProperties props = MessageProperties.PERSISTENT_TEXT_PLAIN;
channel.basicPublish("exchange", "key", props, message);

// Note: All three needed for full persistence:
// 1. Durable exchange
// 2. Durable queue
// 3. Persistent messages
\`\`\``
    },
    {
      id: 2,
      category: 'Exchange Types',
      difficulty: 'Hard',
      question: 'Explain RabbitMQ exchange types with practical examples',
      answer: `**RabbitMQ Exchange Types:**

**1. Direct Exchange:**

**Configuration:**
\`\`\`java
// Declare direct exchange
channel.exchangeDeclare("direct-exchange", "direct", true);

// Create queues
channel.queueDeclare("orders-queue", true, false, false, null);
channel.queueDeclare("payments-queue", true, false, false, null);

// Bind with routing keys
channel.queueBind("orders-queue", "direct-exchange", "order");
channel.queueBind("payments-queue", "direct-exchange", "payment");

// Publish messages
channel.basicPublish("direct-exchange", "order", null, orderMessage);
channel.basicPublish("direct-exchange", "payment", null, paymentMessage);
\`\`\`

**Use Case - Order Processing:**
\`\`\`java
@Service
public class OrderService {
    private final RabbitTemplate rabbitTemplate;

    public void createOrder(Order order) {
        // Route to specific queue based on order type
        String routingKey = order.getType(); // "retail" or "wholesale"
        rabbitTemplate.convertAndSend(
            "order-exchange",
            routingKey,
            order
        );
    }
}

@RabbitListener(queues = "retail-orders")
public void handleRetailOrder(Order order) {
    log.info("Processing retail order: {}", order);
}

@RabbitListener(queues = "wholesale-orders")
public void handleWholesaleOrder(Order order) {
    log.info("Processing wholesale order: {}", order);
}
\`\`\`

**2. Fanout Exchange:**

**Configuration:**
\`\`\`java
// Declare fanout exchange
channel.exchangeDeclare("notifications", "fanout", true);

// Create multiple queues
channel.queueDeclare("email-queue", true, false, false, null);
channel.queueDeclare("sms-queue", true, false, false, null);
channel.queueDeclare("push-queue", true, false, false, null);

// Bind queues (routing key ignored for fanout)
channel.queueBind("email-queue", "notifications", "");
channel.queueBind("sms-queue", "notifications", "");
channel.queueBind("push-queue", "notifications", "");

// Publish once, delivered to all queues
channel.basicPublish("notifications", "", null, message);
\`\`\`

**Use Case - Multi-Channel Notifications:**
\`\`\`java
@Service
public class NotificationService {
    private final RabbitTemplate rabbitTemplate;

    public void sendNotification(Notification notification) {
        // Broadcast to all channels
        rabbitTemplate.convertAndSend(
            "notification-fanout",
            "",  // Routing key ignored
            notification
        );
    }
}

@RabbitListener(queues = "email-notifications")
public void sendEmail(Notification notification) {
    emailService.send(notification);
}

@RabbitListener(queues = "sms-notifications")
public void sendSMS(Notification notification) {
    smsService.send(notification);
}

@RabbitListener(queues = "push-notifications")
public void sendPush(Notification notification) {
    pushService.send(notification);
}
\`\`\`

**3. Topic Exchange:**

**Configuration:**
\`\`\`java
// Declare topic exchange
channel.exchangeDeclare("logs", "topic", true);

// Create queues with different patterns
channel.queueDeclare("critical-logs", true, false, false, null);
channel.queueDeclare("app-logs", true, false, false, null);
channel.queueDeclare("all-error-logs", true, false, false, null);

// Bind with patterns
channel.queueBind("critical-logs", "logs", "*.critical");
channel.queueBind("app-logs", "logs", "app.*");
channel.queueBind("all-error-logs", "logs", "*.error.#");

// Publish with routing keys
channel.basicPublish("logs", "app.critical", null, message1);  // → critical-logs, app-logs
channel.basicPublish("logs", "db.error.connection", null, message2);  // → all-error-logs
channel.basicPublish("logs", "app.info", null, message3);  // → app-logs
\`\`\`

**Use Case - Event Routing:**
\`\`\`java
@Configuration
public class RabbitConfig {
    @Bean
    public TopicExchange eventExchange() {
        return new TopicExchange("events");
    }

    @Bean
    public Queue orderQueue() {
        return new Queue("order-events");
    }

    @Bean
    public Queue paymentQueue() {
        return new Queue("payment-events");
    }

    @Bean
    public Queue auditQueue() {
        return new Queue("audit-events");
    }

    @Bean
    public Binding orderBinding() {
        return BindingBuilder
            .bind(orderQueue())
            .to(eventExchange())
            .with("order.#");  // All order events
    }

    @Bean
    public Binding paymentBinding() {
        return BindingBuilder
            .bind(paymentQueue())
            .to(eventExchange())
            .with("payment.*");  // Direct payment events
    }

    @Bean
    public Binding auditBinding() {
        return BindingBuilder
            .bind(auditQueue())
            .to(eventExchange())
            .with("*.created");  // All creation events
    }
}

@Service
public class EventPublisher {
    private final RabbitTemplate rabbitTemplate;

    public void publishEvent(String eventType, Object event) {
        String routingKey = eventType;  // e.g., "order.created", "payment.processed"
        rabbitTemplate.convertAndSend("events", routingKey, event);
    }
}

@RabbitListener(queues = "order-events")
public void handleOrderEvent(OrderEvent event) {
    // Receives: order.created, order.updated, order.cancelled
    log.info("Order event: {}", event);
}

@RabbitListener(queues = "payment-events")
public void handlePaymentEvent(PaymentEvent event) {
    // Receives: payment.created, payment.processed, payment.failed
    log.info("Payment event: {}", event);
}

@RabbitListener(queues = "audit-events")
public void auditEvent(Object event) {
    // Receives: order.created, payment.created, user.created, etc.
    auditService.log(event);
}
\`\`\`

**4. Headers Exchange:**

**Configuration:**
\`\`\`java
// Declare headers exchange
channel.exchangeDeclare("tasks", "headers", true);

// Create queues
channel.queueDeclare("image-processing", true, false, false, null);
channel.queueDeclare("video-processing", true, false, false, null);

// Bind with header conditions
Map<String, Object> imageHeaders = Map.of(
    "x-match", "all",
    "format", "image",
    "priority", "high"
);
channel.queueBind("image-processing", "tasks", "", imageHeaders);

Map<String, Object> videoHeaders = Map.of(
    "x-match", "any",
    "format", "video",
    "size", "large"
);
channel.queueBind("video-processing", "tasks", "", videoHeaders);

// Publish with headers
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .headers(Map.of(
        "format", "image",
        "priority", "high",
        "size", "medium"
    ))
    .build();

channel.basicPublish("tasks", "", props, message);
\`\`\`

**Use Case - Content Processing:**
\`\`\`java
@Configuration
public class HeadersExchangeConfig {
    @Bean
    public HeadersExchange contentExchange() {
        return new HeadersExchange("content-processing");
    }

    @Bean
    public Binding imageBinding() {
        return BindingBuilder
            .bind(new Queue("image-queue"))
            .to(contentExchange())
            .whereAll(Map.of("type", "image"))
            .match();
    }

    @Bean
    public Binding videoBinding() {
        return BindingBuilder
            .bind(new Queue("video-queue"))
            .to(contentExchange())
            .whereAny(Map.of("type", "video", "size", "large"))
            .match();
    }
}

@Service
public class ContentService {
    private final RabbitTemplate rabbitTemplate;

    public void processContent(Content content) {
        rabbitTemplate.convertAndSend(
            "content-processing",
            "",  // Routing key not used
            content,
            message -> {
                message.getMessageProperties().getHeaders().put("type", content.getType());
                message.getMessageProperties().getHeaders().put("size", content.getSize());
                message.getMessageProperties().getHeaders().put("priority", content.getPriority());
                return message;
            }
        );
    }
}
\`\`\`

**5. Default Exchange:**
\`\`\`java
// Default exchange (nameless exchange)
// Automatically created by RabbitMQ
// Routes to queue with same name as routing key

channel.queueDeclare("my-queue", true, false, false, null);

// Publish to default exchange
channel.basicPublish("", "my-queue", null, message);
// Equivalent to direct routing with queue name
\`\`\`

**6. Exchange to Exchange Binding:**
\`\`\`java
// Bind exchanges together for complex routing
channel.exchangeDeclare("source-exchange", "topic", true);
channel.exchangeDeclare("target-exchange", "fanout", true);

// Bind exchanges
channel.exchangeBind("target-exchange", "source-exchange", "important.*");

// Messages flow through both exchanges
channel.basicPublish("source-exchange", "important.alert", null, message);
// → target-exchange → all bound queues
\`\`\``
    },
    {
      id: 3,
      category: 'Spring Integration',
      difficulty: 'Medium',
      question: 'How do you integrate RabbitMQ with Spring Boot applications?',
      answer: `**Spring Boot RabbitMQ Integration:**

**1. Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
\`\`\`

**2. Configuration:**
\`\`\`yaml
# application.yml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    connection-timeout: 10000
    listener:
      simple:
        acknowledge-mode: manual
        prefetch: 10
        concurrency: 3
        max-concurrency: 10
        retry:
          enabled: true
          initial-interval: 1000
          max-attempts: 3
          multiplier: 2
    template:
      mandatory: true
      retry:
        enabled: true
        initial-interval: 1000
        max-attempts: 3
    publisher-confirm-type: correlated
    publisher-returns: true
\`\`\`

**3. Configuration Class:**
\`\`\`java
@Configuration
public class RabbitMQConfig {

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        template.setMandatory(true);

        // Publisher confirms
        template.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                log.info("Message delivered: {}", correlationData);
            } else {
                log.error("Message not delivered: {}", cause);
            }
        });

        // Return callback for unroutable messages
        template.setReturnsCallback(returned -> {
            log.error("Message returned: {}", returned.getMessage());
        });

        return template;
    }

    // Queue declarations
    @Bean
    public Queue ordersQueue() {
        return QueueBuilder
            .durable("orders-queue")
            .withArgument("x-message-ttl", 60000)
            .withArgument("x-max-length", 10000)
            .withArgument("x-dead-letter-exchange", "dlx")
            .withArgument("x-dead-letter-routing-key", "orders-dlq")
            .build();
    }

    @Bean
    public Queue deadLetterQueue() {
        return QueueBuilder
            .durable("orders-dlq")
            .build();
    }

    // Exchange declarations
    @Bean
    public TopicExchange ordersExchange() {
        return new TopicExchange("orders-exchange", true, false);
    }

    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange("dlx", true, false);
    }

    // Bindings
    @Bean
    public Binding ordersBinding() {
        return BindingBuilder
            .bind(ordersQueue())
            .to(ordersExchange())
            .with("order.#");
    }

    @Bean
    public Binding deadLetterBinding() {
        return BindingBuilder
            .bind(deadLetterQueue())
            .to(deadLetterExchange())
            .with("orders-dlq");
    }
}
\`\`\`

**4. Producer:**
\`\`\`java
@Service
@Slf4j
public class OrderProducer {

    private final RabbitTemplate rabbitTemplate;

    public OrderProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendOrder(Order order) {
        try {
            log.info("Sending order: {}", order);

            // Simple send
            rabbitTemplate.convertAndSend(
                "orders-exchange",
                "order.created",
                order
            );

        } catch (Exception e) {
            log.error("Failed to send order", e);
            throw new MessagingException("Failed to send order", e);
        }
    }

    public void sendOrderWithProperties(Order order) {
        rabbitTemplate.convertAndSend(
            "orders-exchange",
            "order.created",
            order,
            message -> {
                MessageProperties props = message.getMessageProperties();
                props.setContentType("application/json");
                props.setDeliveryMode(MessageDeliveryMode.PERSISTENT);
                props.setPriority(order.getPriority());
                props.setExpiration("60000");
                props.setHeader("order-type", order.getType());
                props.setHeader("trace-id", UUID.randomUUID().toString());
                return message;
            }
        );
    }

    public void sendOrderWithConfirmation(Order order) {
        CorrelationData correlationData = new CorrelationData(
            UUID.randomUUID().toString()
        );

        rabbitTemplate.convertAndSend(
            "orders-exchange",
            "order.created",
            order,
            correlationData
        );

        // Wait for confirmation
        CorrelationData.Confirm confirm = correlationData.getFuture()
            .get(5, TimeUnit.SECONDS);

        if (!confirm.isAck()) {
            log.error("Message not confirmed: {}", confirm.getReason());
        }
    }
}
\`\`\`

**5. Consumer:**
\`\`\`java
@Service
@Slf4j
public class OrderConsumer {

    @RabbitListener(queues = "orders-queue")
    public void handleOrder(Order order) {
        log.info("Received order: {}", order);
        processOrder(order);
    }

    // Manual acknowledgment
    @RabbitListener(queues = "orders-queue", ackMode = "MANUAL")
    public void handleOrderManual(Order order, Channel channel, Message message) {
        try {
            log.info("Processing order: {}", order);
            processOrder(order);

            // Acknowledge message
            channel.basicAck(
                message.getMessageProperties().getDeliveryTag(),
                false
            );

        } catch (Exception e) {
            log.error("Failed to process order", e);
            try {
                // Reject and requeue
                channel.basicNack(
                    message.getMessageProperties().getDeliveryTag(),
                    false,
                    true
                );
            } catch (IOException ex) {
                log.error("Failed to nack message", ex);
            }
        }
    }

    // With message properties
    @RabbitListener(queues = "orders-queue")
    public void handleOrderWithHeaders(
        Order order,
        @Header("order-type") String orderType,
        @Header("trace-id") String traceId
    ) {
        log.info("Order type: {}, Trace ID: {}", orderType, traceId);
        processOrder(order);
    }

    private void processOrder(Order order) {
        // Process order logic
        log.info("Order {} processed successfully", order.getId());
    }
}
\`\`\`

**6. Error Handling:**
\`\`\`java
@Configuration
public class RabbitErrorHandlingConfig {

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
        ConnectionFactory connectionFactory,
        Jackson2JsonMessageConverter messageConverter
    ) {
        SimpleRabbitListenerContainerFactory factory =
            new SimpleRabbitListenerContainerFactory();

        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter);
        factory.setAcknowledgeMode(AcknowledgeMode.MANUAL);
        factory.setPrefetchCount(10);
        factory.setConcurrentConsumers(3);
        factory.setMaxConcurrentConsumers(10);

        // Retry interceptor
        factory.setAdviceChain(
            RetryInterceptorBuilder
                .stateless()
                .maxAttempts(3)
                .backOffOptions(1000, 2.0, 10000)
                .recoverer(new RejectAndDontRequeueRecoverer())
                .build()
        );

        // Error handler
        factory.setErrorHandler(new ConditionalRejectingErrorHandler(
            new CustomFatalExceptionStrategy()
        ));

        return factory;
    }

    private static class CustomFatalExceptionStrategy
        extends ConditionalRejectingErrorHandler.DefaultExceptionStrategy {

        @Override
        public boolean isFatal(Throwable t) {
            // Don't requeue for these exceptions
            return t instanceof IllegalArgumentException
                || t instanceof JsonProcessingException
                || super.isFatal(t);
        }
    }
}

@Service
@Slf4j
public class OrderErrorHandler {

    @RabbitListener(queues = "orders-dlq")
    public void handleFailedOrder(Order order, Message message) {
        log.error("Failed order in DLQ: {}", order);

        // Get failure reason
        Map<String, Object> headers = message.getMessageProperties().getHeaders();
        String reason = (String) headers.get("x-exception-message");
        Integer count = (Integer) headers.get("x-death-count");

        log.error("Failure reason: {}, Death count: {}", reason, count);

        // Handle permanently failed message
        persistFailedOrder(order, reason);
        notifySupport(order);
    }
}
\`\`\`

**7. Async Processing:**
\`\`\`java
@Service
public class AsyncOrderService {

    private final RabbitTemplate rabbitTemplate;

    @Async
    public CompletableFuture<Void> sendOrderAsync(Order order) {
        rabbitTemplate.convertAndSend("orders-exchange", "order.created", order);
        return CompletableFuture.completedFuture(null);
    }

    @RabbitListener(queues = "orders-queue", containerFactory = "asyncContainerFactory")
    public void handleOrderAsync(Order order) {
        CompletableFuture.runAsync(() -> processOrder(order));
    }
}
\`\`\`

**8. Dynamic Queue Management:**
\`\`\`java
@Service
public class DynamicQueueService {

    private final RabbitAdmin rabbitAdmin;

    public void createQueue(String queueName) {
        Queue queue = QueueBuilder.durable(queueName).build();
        rabbitAdmin.declareQueue(queue);
    }

    public void createBinding(String queueName, String exchange, String routingKey) {
        Binding binding = BindingBuilder
            .bind(new Queue(queueName))
            .to(new TopicExchange(exchange))
            .with(routingKey);
        rabbitAdmin.declareBinding(binding);
    }

    public void deleteQueue(String queueName) {
        rabbitAdmin.deleteQueue(queueName);
    }
}
\`\`\``
    },
    {
      id: 4,
      category: 'Patterns',
      difficulty: 'Hard',
      question: 'Explain RabbitMQ messaging patterns and best practices',
      answer: `**RabbitMQ Messaging Patterns:**

**1. Work Queue Pattern:**
\`\`\`java
// Multiple workers consuming from same queue
// Messages distributed round-robin

@Configuration
public class WorkQueueConfig {
    @Bean
    public Queue taskQueue() {
        return QueueBuilder
            .durable("tasks")
            .withArgument("x-max-priority", 10)
            .build();
    }
}

// Producer
@Service
public class TaskProducer {
    public void addTask(Task task) {
        rabbitTemplate.convertAndSend(
            "",
            "tasks",
            task,
            message -> {
                message.getMessageProperties().setPriority(task.getPriority());
                return message;
            }
        );
    }
}

// Multiple workers
@Service
public class TaskWorker {
    @RabbitListener(queues = "tasks", concurrency = "3-10")
    public void processTask(Task task) {
        log.info("Worker {} processing task {}", Thread.currentThread().getName(), task);
        // Process task
    }
}
\`\`\`

**2. Publish/Subscribe Pattern:**
\`\`\`java
// Broadcast messages to multiple consumers

@Configuration
public class PubSubConfig {
    @Bean
    public FanoutExchange notificationsExchange() {
        return new FanoutExchange("notifications");
    }

    @Bean
    public Queue emailQueue() {
        return new AnonymousQueue();  // Auto-delete when consumer disconnects
    }

    @Bean
    public Queue smsQueue() {
        return new AnonymousQueue();
    }

    @Bean
    public Binding emailBinding() {
        return BindingBuilder
            .bind(emailQueue())
            .to(notificationsExchange());
    }

    @Bean
    public Binding smsBinding() {
        return BindingBuilder
            .bind(smsQueue())
            .to(notificationsExchange());
    }
}

// Publisher
@Service
public class NotificationPublisher {
    public void broadcast(Notification notification) {
        rabbitTemplate.convertAndSend("notifications", "", notification);
    }
}

// Subscribers
@RabbitListener(queues = "#{emailQueue.name}")
public void sendEmail(Notification notification) {
    emailService.send(notification);
}

@RabbitListener(queues = "#{smsQueue.name}")
public void sendSMS(Notification notification) {
    smsService.send(notification);
}
\`\`\`

**3. Request/Reply Pattern:**
\`\`\`java
// Synchronous RPC-style communication

@Configuration
public class RpcConfig {
    @Bean
    public DirectExchange rpcExchange() {
        return new DirectExchange("rpc");
    }

    @Bean
    public Queue requestQueue() {
        return new Queue("rpc-requests");
    }
}

// Client (Requester)
@Service
public class RpcClient {
    private final RabbitTemplate rabbitTemplate;

    public String call(String request) {
        log.info("Sending RPC request: {}", request);

        // Send and receive with timeout
        String response = (String) rabbitTemplate.convertSendAndReceive(
            "rpc",
            "rpc-requests",
            request,
            message -> {
                message.getMessageProperties().setReplyTo("amq.rabbitmq.reply-to");
                message.getMessageProperties().setCorrelationId(UUID.randomUUID().toString());
                return message;
            }
        );

        log.info("Received RPC response: {}", response);
        return response;
    }
}

// Server (Responder)
@RabbitListener(queues = "rpc-requests")
public String handleRequest(String request) {
    log.info("Processing RPC request: {}", request);
    return processRequest(request);
}
\`\`\`

**4. Dead Letter Queue Pattern:**
\`\`\`java
@Configuration
public class DlqConfig {
    @Bean
    public Queue mainQueue() {
        return QueueBuilder
            .durable("orders")
            .withArgument("x-dead-letter-exchange", "dlx")
            .withArgument("x-dead-letter-routing-key", "orders.dlq")
            .withArgument("x-message-ttl", 60000)
            .build();
    }

    @Bean
    public DirectExchange dlx() {
        return new DirectExchange("dlx");
    }

    @Bean
    public Queue dlq() {
        return new Queue("orders.dlq");
    }

    @Bean
    public Binding dlqBinding() {
        return BindingBuilder
            .bind(dlq())
            .to(dlx())
            .with("orders.dlq");
    }
}

@RabbitListener(queues = "orders.dlq")
public void handleDeadLetter(Order order, Message message) {
    Map<String, Object> headers = message.getMessageProperties().getHeaders();

    // Analyze failure
    Long deathCount = (Long) ((List<?>) headers.get("x-death")).size();
    String reason = (String) headers.get("x-first-death-reason");

    log.error("Order {} failed {} times. Reason: {}", order.getId(), deathCount, reason);

    // Handle permanently failed message
    if (deathCount >= 3) {
        persistToDatabase(order);
        notifySupport(order);
    }
}
\`\`\`

**5. Priority Queue Pattern:**
\`\`\`java
@Bean
public Queue priorityQueue() {
    return QueueBuilder
        .durable("priority-tasks")
        .withArgument("x-max-priority", 10)
        .build();
}

@Service
public class PriorityTaskProducer {
    public void sendTask(Task task, int priority) {
        rabbitTemplate.convertAndSend(
            "",
            "priority-tasks",
            task,
            message -> {
                message.getMessageProperties().setPriority(priority);
                return message;
            }
        );
    }
}

@RabbitListener(queues = "priority-tasks")
public void processTask(Task task) {
    // High priority tasks processed first
    log.info("Processing priority task: {}", task);
}
\`\`\`

**6. Delayed Message Pattern:**
\`\`\`java
// Using RabbitMQ Delayed Message Plugin
@Bean
public CustomExchange delayedExchange() {
    Map<String, Object> args = new HashMap<>();
    args.put("x-delayed-type", "direct");
    return new CustomExchange("delayed-exchange", "x-delayed-message", true, false, args);
}

@Service
public class DelayedMessageService {
    public void scheduleTask(Task task, long delayMs) {
        rabbitTemplate.convertAndSend(
            "delayed-exchange",
            "delayed-tasks",
            task,
            message -> {
                message.getMessageProperties()
                    .setHeader("x-delay", delayMs);
                return message;
            }
        );
    }
}
\`\`\`

**Best Practices:**

**1. Connection Management:**
\`\`\`java
@Bean
public CachingConnectionFactory connectionFactory() {
    CachingConnectionFactory factory = new CachingConnectionFactory("localhost");
    factory.setUsername("guest");
    factory.setPassword("guest");

    // Connection caching
    factory.setChannelCacheSize(25);
    factory.setCacheMode(CachingConnectionFactory.CacheMode.CHANNEL);

    // Connection recovery
    factory.setRequestedHeartBeat(30);
    factory.setConnectionTimeout(10000);

    return factory;
}
\`\`\`

**2. Idempotent Consumers:**
\`\`\`java
@Service
public class IdempotentOrderConsumer {
    private final Set<String> processedOrders = ConcurrentHashMap.newKeySet();

    @RabbitListener(queues = "orders")
    public void handleOrder(Order order) {
        String orderId = order.getId();

        if (processedOrders.contains(orderId)) {
            log.warn("Duplicate order detected: {}", orderId);
            return;
        }

        try {
            processOrder(order);
            processedOrders.add(orderId);
        } catch (Exception e) {
            log.error("Failed to process order", e);
            throw e;
        }
    }
}
\`\`\`

**3. Batch Processing:**
\`\`\`java
@Configuration
public class BatchConfig {
    @Bean
    public SimpleRabbitListenerContainerFactory batchContainerFactory(
        ConnectionFactory connectionFactory
    ) {
        SimpleRabbitListenerContainerFactory factory =
            new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setBatchListener(true);
        factory.setBatchSize(100);
        factory.setConsumerBatchEnabled(true);
        return factory;
    }
}

@RabbitListener(
    queues = "orders",
    containerFactory = "batchContainerFactory"
)
public void processBatch(List<Order> orders) {
    log.info("Processing batch of {} orders", orders.size());
    orders.forEach(this::processOrder);
}
\`\`\`

**4. Monitoring and Health:**
\`\`\`java
@Component
public class RabbitHealthIndicator implements HealthIndicator {
    private final RabbitTemplate rabbitTemplate;

    @Override
    public Health health() {
        try {
            rabbitTemplate.execute(channel -> {
                channel.queueDeclarePassive("orders");
                return null;
            });
            return Health.up()
                .withDetail("connection", "active")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Exchange Types': '#3b82f6',
      'Spring Integration': '#7c3aed',
      'Patterns': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fce7f3', minHeight: '100vh' }}>
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
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          RabbitMQ Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive RabbitMQ questions covering AMQP protocol, exchanges, queues, bindings, and Spring AMQP integration.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#e5e7eb'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'white',
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
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'white'
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
                  color: '#1f2937',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#fafafa',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#374151',
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
        backgroundColor: '#fef3c7',
        borderRadius: '12px',
        border: '2px solid #f59e0b'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#92400e', marginBottom: '0.5rem', textAlign: 'left' }}>
          💡 RabbitMQ Best Practices
        </h3>
        <ul style={{ color: '#78350f', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use manual acknowledgments for critical messages</li>
          <li>Implement idempotent consumers to handle duplicates</li>
          <li>Set up dead letter queues for failed messages</li>
          <li>Use publisher confirms for guaranteed delivery</li>
          <li>Configure appropriate prefetch count for consumers</li>
          <li>Make queues and exchanges durable for persistence</li>
          <li>Monitor queue depths and consumer lag</li>
          <li>Use appropriate exchange types for routing needs</li>
        </ul>
      </div>
    </div>
  )
}

export default RabbitMQQuestions

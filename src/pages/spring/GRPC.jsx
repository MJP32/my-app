import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// gRPC Architecture Diagram
const GRPCFundamentalsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">gRPC Architecture - Protocol Buffers + HTTP/2</text>
    <rect x="50" y="50" width="140" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Client Stub</text>
    <text x="120" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Generated code</text>
    <text x="120" y="106" textAnchor="middle" fill="#93c5fd" fontSize="8">Type-safe calls</text>
    <rect x="220" y="40" width="260" height="90" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="60" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">HTTP/2 Transport</text>
    <rect x="240" y="70" width="100" height="45" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="290" y="90" textAnchor="middle" fill="#a78bfa" fontSize="8">Protobuf</text>
    <text x="290" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="7">Binary encode</text>
    <rect x="360" y="70" width="100" height="45" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="410" y="90" textAnchor="middle" fill="#4ade80" fontSize="8">Multiplexing</text>
    <text x="410" y="105" textAnchor="middle" fill="#86efac" fontSize="7">Stream frames</text>
    <rect x="510" y="50" width="140" height="70" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="580" y="75" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Server Impl</text>
    <text x="580" y="92" textAnchor="middle" fill="#f9a8d4" fontSize="8">Business logic</text>
    <text x="580" y="106" textAnchor="middle" fill="#f9a8d4" fontSize="8">StreamObserver</text>
    <line x1="190" y1="85" x2="215" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="480" y1="85" x2="505" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">10x smaller than JSON • Header compression • Single connection • Bidirectional streaming</text>
  </svg>
)

// gRPC Server Diagram
const GRPCServerDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">gRPC Server Lifecycle</text>
    <rect x="50" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Server</text>
    <text x="100" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="8">Builder</text>
    <rect x="170" y="50" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="220" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">addService</text>
    <text x="220" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="8">(impl)</text>
    <rect x="290" y="50" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="340" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">build()</text>
    <text x="340" y="88" textAnchor="middle" fill="#fef3c7" fontSize="8">Server</text>
    <rect x="410" y="50" width="100" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">start()</text>
    <text x="460" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="8">Listen</text>
    <rect x="530" y="50" width="120" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="590" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">awaitTermination</text>
    <text x="590" y="88" textAnchor="middle" fill="#fecaca" fontSize="8">Block</text>
    <line x1="150" y1="75" x2="165" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="270" y1="75" x2="285" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="390" y1="75" x2="405" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="510" y1="75" x2="525" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Port binding → Service registration → Request handling → Graceful shutdown</text>
  </svg>
)

// gRPC Client Diagram
const GRPCClientDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">gRPC Client Stub Types</text>
    <rect x="50" y="50" width="120" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ManagedChannel</text>
    <text x="110" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="8">Connection pool</text>
    <rect x="200" y="45" width="150" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="275" y="68" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Blocking Stub</text>
    <rect x="200" y="85" width="150" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="275" y="108" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Async Stub</text>
    <rect x="380" y="45" width="130" height="35" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="445" y="68" textAnchor="middle" fill="#fcd34d" fontSize="8">Sync • Waits</text>
    <rect x="380" y="85" width="130" height="35" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="445" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="8">Callbacks • Non-blocking</text>
    <rect x="540" y="50" width="120" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Server</text>
    <text x="600" y="92" textAnchor="middle" fill="#86efac" fontSize="8">RPC Handler</text>
    <line x1="170" y1="62" x2="195" y2="62" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="170" y1="102" x2="195" y2="102" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="510" y1="80" x2="535" y2="80" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Choose stub type based on use case • Reuse channel • Configure deadlines</text>
  </svg>
)

// gRPC Streaming Diagram
const GRPCStreamingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">gRPC Streaming Types</text>
    <rect x="50" y="45" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Unary</text>
    <text x="120" y="82" textAnchor="middle" fill="#93c5fd" fontSize="7">Req → Resp</text>
    <rect x="210" y="45" width="140" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="280" y="65" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Server Stream</text>
    <text x="280" y="82" textAnchor="middle" fill="#86efac" fontSize="7">Req → Resp*</text>
    <rect x="370" y="45" width="140" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="65" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Client Stream</text>
    <text x="440" y="82" textAnchor="middle" fill="#fcd34d" fontSize="7">Req* → Resp</text>
    <rect x="530" y="45" width="140" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="65" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Bidirectional</text>
    <text x="600" y="82" textAnchor="middle" fill="#c4b5fd" fontSize="7">Req* ↔ Resp*</text>
    <rect x="50" y="105" width="140" height="30" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="120" y="125" textAnchor="middle" fill="#93c5fd" fontSize="7">Simple query</text>
    <rect x="210" y="105" width="140" height="30" rx="4" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1"/>
    <text x="280" y="125" textAnchor="middle" fill="#86efac" fontSize="7">Large dataset fetch</text>
    <rect x="370" y="105" width="140" height="30" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="440" y="125" textAnchor="middle" fill="#fcd34d" fontSize="7">File upload</text>
    <rect x="530" y="105" width="140" height="30" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="600" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="7">Chat / Real-time</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">* = stream of messages • StreamObserver for async handling</text>
  </svg>
)

const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|var)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Set|HashSet|Map|HashMap|Optional|Stream|Exception|Override|Integer|Long|ManagedChannel|ManagedChannelBuilder|Server|ServerBuilder|StreamObserver|StatusRuntimeException|Status|Metadata|Channel|CallOptions|MethodDescriptor|ServiceDescriptor|ServerInterceptor|ClientInterceptor|Deadline|Context|ByteString)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function GRPC({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'grpc-fundamentals',
      name: 'gRPC Fundamentals',
      icon: '⚡',
      color: '#3b82f6',
      description: 'High-performance RPC framework basics with Protocol Buffers',
      diagram: GRPCFundamentalsDiagram,
      details: [
        {
          name: 'Overview',
          explanation: 'gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework developed by Google. It uses Protocol Buffers (protobuf) for serialization and HTTP/2 for transport. gRPC enables efficient communication between microservices with features like bidirectional streaming, flow control, and pluggable authentication.',
          codeExample: `// build.gradle - gRPC dependencies
plugins {
    id 'com.google.protobuf' version '0.9.4'
}

dependencies {
    implementation 'io.grpc:grpc-netty-shaded:1.59.0'
    implementation 'io.grpc:grpc-protobuf:1.59.0'
    implementation 'io.grpc:grpc-stub:1.59.0'
    compileOnly 'org.apache.tomcat:annotations-api:6.0.53'
}

protobuf {
    protoc {
        artifact = 'com.google.protobuf:protoc:3.25.1'
    }
    plugins {
        grpc {
            artifact = 'io.grpc:protoc-gen-grpc-java:1.59.0'
        }
    }
    generateProtoTasks {
        all()*.plugins { grpc {} }
    }
}`
        },
        {
          name: 'Protocol Buffers',
          explanation: 'Protocol Buffers (protobuf) is a binary serialization format that is smaller and faster than JSON. Messages are defined in .proto files with strongly typed fields. Each field has a unique number for efficient encoding. Supports scalar types (int32, string, bool), complex types (messages, enums), and collections (repeated fields).',
          codeExample: `// user.proto - Protocol Buffer definition
syntax = "proto3";

package com.example.user;

option java_multiple_files = true;
option java_package = "com.example.user";

// Enum for user roles
enum Role {
    UNKNOWN = 0;
    USER = 1;
    ADMIN = 2;
    MODERATOR = 3;
}

// Nested message for address
message Address {
    string street = 1;
    string city = 2;
    string state = 3;
    string zip_code = 4;
}

// Main user message
message User {
    int32 id = 1;
    string username = 2;
    string email = 3;
    Role role = 4;
    Address address = 5;
    repeated string tags = 6;  // list of strings
    map<string, string> metadata = 7;  // key-value pairs
}`
        },
        {
          name: 'HTTP/2 Transport',
          explanation: 'gRPC uses HTTP/2 which provides multiplexing (multiple requests over single connection), server push, header compression, and binary framing. This enables efficient streaming and reduces latency compared to HTTP/1.1. Connections are persistent and support flow control.',
          codeExample: `// Configuring HTTP/2 transport settings
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import io.grpc.netty.shaded.io.grpc.netty.NettyServerBuilder;

// Server with HTTP/2 tuning
Server server = NettyServerBuilder.forPort(9090)
    .maxConcurrentCallsPerConnection(100)
    .maxInboundMessageSize(16 * 1024 * 1024)  // 16 MB
    .maxInboundMetadataSize(8192)
    .flowControlWindow(1048576)  // 1 MB flow control
    .keepAliveTime(30, TimeUnit.SECONDS)
    .keepAliveTimeout(10, TimeUnit.SECONDS)
    .permitKeepAliveWithoutCalls(true)
    .addService(new UserServiceImpl())
    .build()
    .start();

// Client with HTTP/2 settings
ManagedChannel channel = NettyChannelBuilder
    .forAddress("localhost", 9090)
    .usePlaintext()
    .keepAliveTime(30, TimeUnit.SECONDS)
    .keepAliveTimeout(10, TimeUnit.SECONDS)
    .maxInboundMessageSize(16 * 1024 * 1024)
    .enableRetry()         // enable automatic retries
    .maxRetryAttempts(3)
    .build();`
        },
        {
          name: 'RPC Types',
          explanation: 'gRPC supports 4 types of RPCs: Unary (single request/response), Server streaming (one request, stream of responses), Client streaming (stream of requests, single response), and Bidirectional streaming (both sides stream). Each type suits different use cases from simple queries to real-time chat.',
          codeExample: `// Defining all 4 RPC types in a .proto service
syntax = "proto3";

service UserService {
    // Unary: single request, single response
    rpc GetUser(GetUserRequest) returns (User);

    // Server streaming: single request, stream of responses
    rpc ListUsers(ListUsersRequest) returns (stream User);

    // Client streaming: stream of requests, single response
    rpc UploadUsers(stream User) returns (UploadSummary);

    // Bidirectional streaming: both sides stream
    rpc SyncUsers(stream UserUpdate) returns (stream UserStatus);
}

message GetUserRequest { int32 id = 1; }
message ListUsersRequest { int32 page_size = 1; }
message UploadSummary { int32 count = 1; }
message UserUpdate {
    string action = 1;
    User user = 2;
}
message UserStatus {
    int32 id = 1;
    string status = 2;
}`
        },
        {
          name: 'Code Generation',
          explanation: 'The protoc compiler generates client and server code from .proto files. Supports multiple languages: Java, Go, Python, C++, Node.js, etc. Generated code includes message classes, service interfaces, and stub implementations. Type-safe contracts ensure compatibility between services.',
          codeExample: `// Generated code usage - what protoc creates for you

// 1. Message builders (generated from proto messages)
User user = User.newBuilder()
    .setId(1)
    .setUsername("john_doe")
    .setEmail("john@example.com")
    .setRole(Role.ADMIN)
    .addTags("java")
    .addTags("grpc")
    .build();

// 2. Serialization / Deserialization
byte[] bytes = user.toByteArray();       // serialize
User parsed = User.parseFrom(bytes);     // deserialize

// 3. Generated service base class (server side)
// Extend this to implement your business logic
public class UserServiceImpl
    extends UserServiceGrpc.UserServiceImplBase {
    @Override
    public void getUser(GetUserRequest request,
                        StreamObserver<User> responseObserver) {
        // your implementation here
    }
}

// 4. Generated stubs (client side)
UserServiceGrpc.UserServiceBlockingStub blockingStub =
    UserServiceGrpc.newBlockingStub(channel);
UserServiceGrpc.UserServiceStub asyncStub =
    UserServiceGrpc.newStub(channel);`
        },
        {
          name: 'Proto File Example',
          explanation: 'syntax = "proto3"; package com.example.user; message User { int32 id = 1; string username = 2; string email = 3; } message GetUserRequest { int32 id = 1; } service UserService { rpc GetUser(GetUserRequest) returns (User); rpc ListUsers(Empty) returns (stream User); }',
          codeExample: `// Complete .proto file for an Order service
syntax = "proto3";

package com.example.order;

option java_multiple_files = true;
option java_package = "com.example.order";

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";

enum OrderStatus {
    PENDING = 0;
    CONFIRMED = 1;
    SHIPPED = 2;
    DELIVERED = 3;
    CANCELLED = 4;
}

message OrderItem {
    string product_id = 1;
    string name = 2;
    int32 quantity = 3;
    double price = 4;
}

message Order {
    string order_id = 1;
    string customer_id = 2;
    repeated OrderItem items = 3;
    OrderStatus status = 4;
    double total = 5;
    google.protobuf.Timestamp created_at = 6;
}

message CreateOrderRequest {
    string customer_id = 1;
    repeated OrderItem items = 2;
}

service OrderService {
    rpc CreateOrder(CreateOrderRequest) returns (Order);
    rpc GetOrder(GetOrderRequest) returns (Order);
    rpc WatchOrder(GetOrderRequest) returns (stream Order);
    rpc BatchCreate(stream CreateOrderRequest)
        returns (BatchCreateResponse);
}`
        }
      ]
    },
    {
      id: 'grpc-server',
      name: 'gRPC Server Implementation',
      icon: '🖥️',
      color: '#10b981',
      description: 'Creating and configuring gRPC servers',
      diagram: GRPCServerDiagram,
      details: [
        {
          name: 'Server Basics',
          explanation: 'A gRPC server implements service methods defined in .proto files. The server listens on a port, handles incoming RPC calls, and sends responses. gRPC provides automatic request/response handling, threading, and lifecycle management. Servers can implement interceptors for cross-cutting concerns like logging and authentication.',
          codeExample: `// Basic gRPC server setup
import io.grpc.Server;
import io.grpc.ServerBuilder;

public class GrpcServer {
    private Server server;
    private final int port = 9090;

    public void start() throws Exception {
        server = ServerBuilder.forPort(port)
            .addService(new UserServiceImpl())
            .addService(new OrderServiceImpl())
            .build()
            .start();

        System.out.println("Server started on port " + port);

        // Add shutdown hook for graceful termination
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down gRPC server...");
            server.shutdown();
            System.out.println("Server shut down.");
        }));
    }

    public void blockUntilShutdown() throws Exception {
        if (server != null) {
            server.awaitTermination();
        }
    }

    public static void main(String[] args) throws Exception {
        GrpcServer grpcServer = new GrpcServer();
        grpcServer.start();
        grpcServer.blockUntilShutdown();
    }
}`
        },
        {
          name: 'Service Implementation',
          explanation: 'Extend the generated base class (e.g., UserServiceGrpc.UserServiceImplBase) and override service methods. Use StreamObserver<T> for sending responses asynchronously. Call onNext() to send data, onError() for failures, and onCompleted() to finish. Each method receives a request object and response observer.',
          codeExample: `// Implementing a gRPC service
public class UserServiceImpl
    extends UserServiceGrpc.UserServiceImplBase {

    private final Map<Integer, User> userStore = new HashMap<>();

    @Override
    public void getUser(GetUserRequest request,
                        StreamObserver<User> responseObserver) {
        int userId = request.getId();
        User user = userStore.get(userId);

        if (user == null) {
            responseObserver.onError(
                Status.NOT_FOUND
                    .withDescription("User not found: " + userId)
                    .asRuntimeException()
            );
            return;
        }

        // Send the response
        responseObserver.onNext(user);
        responseObserver.onCompleted();
    }

    @Override
    public void createUser(CreateUserRequest request,
                           StreamObserver<User> responseObserver) {
        User user = User.newBuilder()
            .setId(generateId())
            .setUsername(request.getUsername())
            .setEmail(request.getEmail())
            .setRole(Role.USER)
            .build();

        userStore.put(user.getId(), user);
        responseObserver.onNext(user);
        responseObserver.onCompleted();
    }
}`
        },
        {
          name: 'Server Lifecycle',
          explanation: 'Server lifecycle methods: ServerBuilder.forPort(port) creates builder, addService() registers implementations, build() creates server, start() begins listening. Use shutdown() for graceful shutdown and awaitTermination() to block until complete. Handle shutdown hooks for clean termination.',
          codeExample: `// Complete server lifecycle management
public class ManagedGrpcServer {
    private Server server;

    public void start(int port) throws Exception {
        // Step 1: Build the server
        server = ServerBuilder.forPort(port)
            .addService(new UserServiceImpl())
            .addService(new OrderServiceImpl())
            .build();

        // Step 2: Start listening
        server.start();
        System.out.println("Server listening on port " + port);

        // Step 3: Register shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                gracefulShutdown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }));

        // Step 4: Block main thread
        server.awaitTermination();
    }

    private void gracefulShutdown() throws InterruptedException {
        if (server != null) {
            // Initiate graceful shutdown
            server.shutdown();

            // Wait up to 30 seconds for in-flight requests
            if (!server.awaitTermination(30, TimeUnit.SECONDS)) {
                // Force shutdown if graceful didn't complete
                server.shutdownNow();
                server.awaitTermination(5, TimeUnit.SECONDS);
            }
            System.out.println("Server terminated.");
        }
    }
}`
        },
        {
          name: 'Thread Pool Config',
          explanation: 'Configure thread pools for concurrent request handling. Default uses a cached thread pool. For production, use fixed-size pools: ServerBuilder.executor(Executors.newFixedThreadPool(n)). Consider CPU cores, I/O wait times, and expected concurrency when sizing pools.',
          codeExample: `// Thread pool configuration for gRPC server
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.LinkedBlockingQueue;

// Option 1: Fixed thread pool for CPU-bound work
ExecutorService fixedPool = Executors.newFixedThreadPool(
    Runtime.getRuntime().availableProcessors() * 2
);

// Option 2: Custom thread pool with bounded queue
ExecutorService customPool = new ThreadPoolExecutor(
    10,                          // core pool size
    50,                          // max pool size
    60, TimeUnit.SECONDS,        // keep alive
    new LinkedBlockingQueue<>(100) // work queue
);

// Apply to server
Server server = ServerBuilder.forPort(9090)
    .executor(customPool)
    .addService(new UserServiceImpl())
    .build()
    .start();

// For I/O-heavy services, increase pool size
// Rule of thumb: cores * (1 + wait_time / service_time)
// Example: 8 cores, 50ms wait, 5ms compute = 8 * 11 = 88

// Clean up on shutdown
server.shutdown();
customPool.shutdown();
customPool.awaitTermination(30, TimeUnit.SECONDS);`
        },
        {
          name: 'Server Interceptors',
          explanation: 'Interceptors provide middleware functionality for logging, authentication, metrics, and tracing. Implement ServerInterceptor interface with interceptCall() method. Chain multiple interceptors with intercept(). Access headers via Metadata parameter. Common uses: JWT validation, request logging, rate limiting.',
          codeExample: `// Server interceptor for authentication
public class AuthInterceptor implements ServerInterceptor {

    private static final Metadata.Key<String> AUTH_KEY =
        Metadata.Key.of("authorization",
            Metadata.ASCII_STRING_MARSHALLER);

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> call,
            Metadata headers,
            ServerCallHandler<ReqT, RespT> next) {

        String token = headers.get(AUTH_KEY);

        if (token == null || !token.startsWith("Bearer ")) {
            call.close(Status.UNAUTHENTICATED
                .withDescription("Missing auth token"), headers);
            return new ServerCall.Listener<>() {};
        }

        // Validate token and proceed
        String jwt = token.substring(7);
        if (!validateJwt(jwt)) {
            call.close(Status.PERMISSION_DENIED
                .withDescription("Invalid token"), headers);
            return new ServerCall.Listener<>() {};
        }

        // Continue to the actual service method
        return next.startCall(call, headers);
    }
}

// Register interceptor with server
Server server = ServerBuilder.forPort(9090)
    .addService(ServerInterceptors.intercept(
        new UserServiceImpl(),
        new AuthInterceptor(),
        new LoggingInterceptor()))
    .build();`
        },
        {
          name: 'Server Code Example',
          explanation: 'public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase { @Override public void getUser(GetUserRequest req, StreamObserver<User> observer) { User user = User.newBuilder().setId(req.getId()).setUsername("john").build(); observer.onNext(user); observer.onCompleted(); } } // Start: Server server = ServerBuilder.forPort(9090).addService(new UserServiceImpl()).build().start();',
          codeExample: `// Full server implementation with multiple RPC types
public class UserServiceImpl
    extends UserServiceGrpc.UserServiceImplBase {

    private final Map<Integer, User> db = new ConcurrentHashMap<>();

    // Unary RPC
    @Override
    public void getUser(GetUserRequest req,
                        StreamObserver<User> observer) {
        User user = db.get(req.getId());
        if (user != null) {
            observer.onNext(user);
            observer.onCompleted();
        } else {
            observer.onError(Status.NOT_FOUND
                .withDescription("User " + req.getId()
                    + " not found")
                .asRuntimeException());
        }
    }

    // Server streaming RPC
    @Override
    public void listUsers(ListUsersRequest req,
                          StreamObserver<User> observer) {
        db.values().stream()
            .limit(req.getPageSize())
            .forEach(observer::onNext);
        observer.onCompleted();
    }

    // Client streaming RPC
    @Override
    public StreamObserver<User> uploadUsers(
            StreamObserver<UploadSummary> responseObserver) {
        return new StreamObserver<User>() {
            int count = 0;
            public void onNext(User user) {
                db.put(user.getId(), user);
                count++;
            }
            public void onError(Throwable t) {
                t.printStackTrace();
            }
            public void onCompleted() {
                responseObserver.onNext(UploadSummary
                    .newBuilder().setCount(count).build());
                responseObserver.onCompleted();
            }
        };
    }
}`
        }
      ]
    },
    {
      id: 'grpc-client',
      name: 'gRPC Client Implementation',
      icon: '📱',
      color: '#8b5cf6',
      description: 'Creating gRPC clients and making RPC calls',
      diagram: GRPCClientDiagram,
      details: [
        {
          name: 'Client Basics',
          explanation: 'gRPC clients make RPC calls to servers using generated stub classes. Clients can be blocking (synchronous) or non-blocking (asynchronous). The framework handles connection management, serialization, and error handling. Clients support deadlines, metadata, and streaming for all four RPC types.',
          codeExample: `// Basic gRPC client setup
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

public class UserClient {
    private final ManagedChannel channel;
    private final UserServiceGrpc.UserServiceBlockingStub
        blockingStub;
    private final UserServiceGrpc.UserServiceStub asyncStub;

    public UserClient(String host, int port) {
        // Create a channel to the server
        channel = ManagedChannelBuilder
            .forAddress(host, port)
            .usePlaintext()  // no TLS for dev
            .build();

        // Create stubs from the channel
        blockingStub = UserServiceGrpc
            .newBlockingStub(channel);
        asyncStub = UserServiceGrpc
            .newStub(channel);
    }

    // Simple unary call
    public User getUser(int id) {
        GetUserRequest request = GetUserRequest.newBuilder()
            .setId(id)
            .build();
        return blockingStub.getUser(request);
    }

    // Clean shutdown
    public void shutdown() throws InterruptedException {
        channel.shutdown()
            .awaitTermination(5, TimeUnit.SECONDS);
    }

    public static void main(String[] args) throws Exception {
        UserClient client = new UserClient("localhost", 9090);
        User user = client.getUser(1);
        System.out.println("Got user: " + user.getUsername());
        client.shutdown();
    }
}`
        },
        {
          name: 'ManagedChannel',
          explanation: 'ManagedChannel manages the connection to the gRPC server. Create with ManagedChannelBuilder.forAddress(host, port). Use usePlaintext() for development (no TLS). In production, configure SSL/TLS credentials. Channels are thread-safe and should be reused. Call shutdown() and awaitTermination() when done.',
          codeExample: `// ManagedChannel configuration patterns

// Development channel - no encryption
ManagedChannel devChannel = ManagedChannelBuilder
    .forAddress("localhost", 9090)
    .usePlaintext()
    .build();

// Production channel with TLS
ManagedChannel prodChannel = ManagedChannelBuilder
    .forAddress("api.example.com", 443)
    .useTransportSecurity()  // enable TLS
    .build();

// Channel with custom TLS certificates
SslContext sslContext = GrpcSslContexts.forClient()
    .trustManager(new File("ca-cert.pem"))
    .keyManager(
        new File("client-cert.pem"),
        new File("client-key.pem"))
    .build();

ManagedChannel tlsChannel = NettyChannelBuilder
    .forAddress("api.example.com", 443)
    .sslContext(sslContext)
    .build();

// Channel with load balancing
ManagedChannel lbChannel = ManagedChannelBuilder
    .forTarget("dns:///my-service:9090")
    .defaultLoadBalancingPolicy("round_robin")
    .build();

// IMPORTANT: Reuse channels, don't create per-request
// Channels are thread-safe and multiplex over HTTP/2`
        },
        {
          name: 'Blocking Stub',
          explanation: 'Blocking stubs provide synchronous calls that wait for responses. Create with ServiceGrpc.newBlockingStub(channel). Simple to use for unary and server streaming RPCs. Returns response directly or Iterator for streams. Throws StatusRuntimeException on errors. Good for simple use cases but blocks the calling thread.',
          codeExample: `// Blocking stub usage examples
UserServiceGrpc.UserServiceBlockingStub stub =
    UserServiceGrpc.newBlockingStub(channel);

// Unary call - returns response directly
try {
    User user = stub.getUser(
        GetUserRequest.newBuilder()
            .setId(42)
            .build()
    );
    System.out.println("User: " + user.getUsername());
} catch (StatusRuntimeException e) {
    System.err.println("RPC failed: "
        + e.getStatus().getCode()
        + " - " + e.getMessage());
}

// Server streaming - returns Iterator
Iterator<User> users = stub.listUsers(
    ListUsersRequest.newBuilder()
        .setPageSize(100)
        .build()
);

while (users.hasNext()) {
    User user = users.next();
    System.out.println("Found: " + user.getUsername());
}

// With deadline to prevent hanging
User user = stub
    .withDeadlineAfter(3, TimeUnit.SECONDS)
    .getUser(request);

// NOTE: Blocking stubs cannot be used for
// client streaming or bidirectional streaming.
// Use async stubs for those RPC types.`
        },
        {
          name: 'Async Stub',
          explanation: 'Async stubs provide non-blocking calls with callbacks. Create with ServiceGrpc.newStub(channel). Pass StreamObserver<Response> to receive results. Callbacks: onNext() for each response, onError() for failures, onCompleted() when done. Required for client streaming and bidirectional streaming RPCs.',
          codeExample: `// Async stub usage examples
UserServiceGrpc.UserServiceStub asyncStub =
    UserServiceGrpc.newStub(channel);

// Unary call with callback
asyncStub.getUser(request, new StreamObserver<User>() {
    @Override
    public void onNext(User user) {
        System.out.println("Got: " + user.getUsername());
    }
    @Override
    public void onError(Throwable t) {
        Status status = Status.fromThrowable(t);
        System.err.println("Error: " + status.getCode());
    }
    @Override
    public void onCompleted() {
        System.out.println("Call finished");
    }
});

// Client streaming - send multiple messages
StreamObserver<User> requestObserver =
    asyncStub.uploadUsers(
        new StreamObserver<UploadSummary>() {
            @Override
            public void onNext(UploadSummary summary) {
                System.out.println("Uploaded: "
                    + summary.getCount() + " users");
            }
            @Override
            public void onError(Throwable t) {}
            @Override
            public void onCompleted() {}
        });

// Send stream of users
for (User user : userList) {
    requestObserver.onNext(user);
}
requestObserver.onCompleted();  // signal done`
        },
        {
          name: 'Deadlines & Metadata',
          explanation: 'Deadlines set maximum wait time: stub.withDeadlineAfter(5, TimeUnit.SECONDS). Prevents hanging requests and propagates through call chain. Metadata passes custom headers: Metadata.Key for key definition, attach to calls for auth tokens, tracing IDs, or custom context. Essential for production reliability.',
          codeExample: `// Deadlines - prevent hanging requests
try {
    User user = blockingStub
        .withDeadlineAfter(5, TimeUnit.SECONDS)
        .getUser(request);
} catch (StatusRuntimeException e) {
    if (e.getStatus().getCode()
            == Status.Code.DEADLINE_EXCEEDED) {
        System.err.println("Request timed out!");
    }
}

// Metadata - pass custom headers
Metadata metadata = new Metadata();

// Define metadata keys
Metadata.Key<String> AUTH_KEY = Metadata.Key.of(
    "authorization", Metadata.ASCII_STRING_MARSHALLER);
Metadata.Key<String> TRACE_KEY = Metadata.Key.of(
    "x-trace-id", Metadata.ASCII_STRING_MARSHALLER);

// Set values
metadata.put(AUTH_KEY, "Bearer eyJhbGciOi...");
metadata.put(TRACE_KEY, "abc-123-def-456");

// Attach metadata using ClientInterceptor
ClientInterceptor authInterceptor =
    new ClientInterceptor() {
        @Override
        public <ReqT, RespT> ClientCall<ReqT, RespT>
                interceptCall(MethodDescriptor<ReqT, RespT> method,
                    CallOptions options, Channel next) {
            return new ForwardingClientCall
                .SimpleForwardingClientCall<>(
                    next.newCall(method, options)) {
                @Override
                public void start(Listener<RespT> listener,
                                  Metadata headers) {
                    headers.merge(metadata);
                    super.start(listener, headers);
                }
            };
        }
    };

// Apply interceptor to stub
UserServiceGrpc.UserServiceBlockingStub secureStub =
    blockingStub.withInterceptors(authInterceptor);`
        },
        {
          name: 'Client Code Example',
          explanation: 'ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 9090).usePlaintext().build(); UserServiceGrpc.UserServiceBlockingStub stub = UserServiceGrpc.newBlockingStub(channel); User user = stub.withDeadlineAfter(5, TimeUnit.SECONDS).getUser(GetUserRequest.newBuilder().setId(1).build()); // Async: asyncStub.getUser(request, new StreamObserver<User>() { ... });',
          codeExample: `// Complete client with error handling and retries
public class RobustUserClient {
    private final ManagedChannel channel;
    private final UserServiceGrpc.UserServiceBlockingStub stub;

    public RobustUserClient(String host, int port) {
        channel = ManagedChannelBuilder
            .forAddress(host, port)
            .usePlaintext()
            .build();
        stub = UserServiceGrpc.newBlockingStub(channel);
    }

    public User getUser(int id) {
        GetUserRequest request = GetUserRequest.newBuilder()
            .setId(id).build();

        // Retry logic with exponential backoff
        int maxRetries = 3;
        for (int attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return stub
                    .withDeadlineAfter(5, TimeUnit.SECONDS)
                    .getUser(request);
            } catch (StatusRuntimeException e) {
                Status.Code code = e.getStatus().getCode();

                // Don't retry non-transient errors
                if (code == Status.Code.NOT_FOUND ||
                    code == Status.Code.INVALID_ARGUMENT) {
                    throw e;
                }

                // Retry transient errors
                if (attempt < maxRetries - 1) {
                    try {
                        long delay = (long) Math.pow(2, attempt)
                            * 1000;
                        Thread.sleep(delay);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw e;
                    }
                } else {
                    throw e;  // exhausted retries
                }
            }
        }
        throw new RuntimeException("Unreachable");
    }

    public void shutdown() throws InterruptedException {
        channel.shutdown()
            .awaitTermination(5, TimeUnit.SECONDS);
    }
}`
        }
      ]
    },
    {
      id: 'streaming',
      name: 'Streaming & Advanced Features',
      icon: '🌊',
      color: '#ef4444',
      description: 'Streaming RPCs, interceptors, and error handling',
      diagram: GRPCStreamingDiagram,
      details: [
        {
          name: 'Server Streaming',
          explanation: 'Server streaming: one request, multiple responses. Use case: fetching large datasets, real-time updates, log streaming. Server calls responseObserver.onNext() multiple times before onCompleted(). Client receives Iterator (blocking) or StreamObserver callbacks (async). Good for pagination alternatives and live data feeds.',
          codeExample: `// Server streaming - server sends multiple responses

// Server implementation
@Override
public void listUsers(ListUsersRequest request,
                      StreamObserver<User> responseObserver) {
    List<User> allUsers = userRepository.findAll();

    for (User user : allUsers) {
        // Send each user as a separate message
        responseObserver.onNext(user);

        // Optional: simulate delay for real-time feed
        // Thread.sleep(100);
    }

    // Signal stream complete
    responseObserver.onCompleted();
}

// Client - blocking stub returns Iterator
Iterator<User> userIterator = blockingStub.listUsers(
    ListUsersRequest.newBuilder()
        .setPageSize(50)
        .build()
);
while (userIterator.hasNext()) {
    User user = userIterator.next();
    System.out.println(user.getUsername());
}

// Client - async stub with StreamObserver
asyncStub.listUsers(request, new StreamObserver<User>() {
    @Override
    public void onNext(User user) {
        System.out.println("Received: " + user.getUsername());
    }
    @Override
    public void onError(Throwable t) {
        System.err.println("Stream error: " + t.getMessage());
    }
    @Override
    public void onCompleted() {
        System.out.println("All users received");
    }
});`
        },
        {
          name: 'Client Streaming',
          explanation: 'Client streaming: multiple requests, one response. Use case: file uploads, batch operations, aggregations. Method returns StreamObserver for client to send messages. Server receives onNext() for each message, processes in onCompleted(). Response sent via the passed responseObserver.',
          codeExample: `// Client streaming - client sends multiple messages

// Server implementation
@Override
public StreamObserver<User> uploadUsers(
        StreamObserver<UploadSummary> responseObserver) {

    return new StreamObserver<User>() {
        private int count = 0;
        private List<String> errors = new ArrayList<>();

        @Override
        public void onNext(User user) {
            try {
                userRepository.save(user);
                count++;
            } catch (Exception e) {
                errors.add("Failed user " + user.getId()
                    + ": " + e.getMessage());
            }
        }

        @Override
        public void onError(Throwable t) {
            System.err.println("Client error: "
                + t.getMessage());
        }

        @Override
        public void onCompleted() {
            // Send single summary response
            UploadSummary summary = UploadSummary.newBuilder()
                .setCount(count)
                .build();
            responseObserver.onNext(summary);
            responseObserver.onCompleted();
        }
    };
}

// Client - sends stream of users
StreamObserver<User> requestObserver =
    asyncStub.uploadUsers(responseObserver);

for (int i = 0; i < 1000; i++) {
    User user = User.newBuilder()
        .setId(i)
        .setUsername("user_" + i)
        .build();
    requestObserver.onNext(user);
}
requestObserver.onCompleted();  // done sending`
        },
        {
          name: 'Bidirectional Streaming',
          explanation: 'Bidirectional streaming: both sides send streams independently. Use case: chat applications, real-time collaboration, gaming. Both client and server have StreamObservers. Messages can interleave in any order. Most flexible but most complex to implement. Requires careful flow control.',
          codeExample: `// Bidirectional streaming - chat example

// Server implementation
@Override
public StreamObserver<ChatMessage> chat(
        StreamObserver<ChatMessage> responseObserver) {

    return new StreamObserver<ChatMessage>() {
        @Override
        public void onNext(ChatMessage message) {
            // Echo back with server timestamp
            ChatMessage reply = ChatMessage.newBuilder()
                .setSender("server")
                .setContent("Echo: " + message.getContent())
                .setTimestamp(System.currentTimeMillis())
                .build();
            responseObserver.onNext(reply);

            // Broadcast to other connected clients
            broadcastToOthers(message, responseObserver);
        }

        @Override
        public void onError(Throwable t) {
            System.err.println("Client disconnected: "
                + t.getMessage());
        }

        @Override
        public void onCompleted() {
            responseObserver.onCompleted();
        }
    };
}

// Client implementation
StreamObserver<ChatMessage> requestObserver =
    asyncStub.chat(new StreamObserver<ChatMessage>() {
        @Override
        public void onNext(ChatMessage msg) {
            System.out.println(msg.getSender()
                + ": " + msg.getContent());
        }
        @Override
        public void onError(Throwable t) {}
        @Override
        public void onCompleted() {
            System.out.println("Chat ended");
        }
    });

// Send messages independently
requestObserver.onNext(ChatMessage.newBuilder()
    .setSender("alice")
    .setContent("Hello!")
    .build());
requestObserver.onNext(ChatMessage.newBuilder()
    .setSender("alice")
    .setContent("How are you?")
    .build());`
        },
        {
          name: 'Error Handling',
          explanation: 'gRPC uses Status codes: OK, CANCELLED, INVALID_ARGUMENT, DEADLINE_EXCEEDED, NOT_FOUND, PERMISSION_DENIED, UNAUTHENTICATED, etc. Throw StatusRuntimeException with Status.CODE.withDescription(). Catch StatusRuntimeException on client. Access code with e.getStatus().getCode(). Include details with Status.withCause().',
          codeExample: `// Error handling in gRPC

// Server - throwing errors with status codes
@Override
public void getUser(GetUserRequest request,
                    StreamObserver<User> responseObserver) {
    int id = request.getId();

    // Validation error
    if (id <= 0) {
        responseObserver.onError(
            Status.INVALID_ARGUMENT
                .withDescription("ID must be positive")
                .asRuntimeException());
        return;
    }

    User user = db.get(id);

    // Not found error
    if (user == null) {
        responseObserver.onError(
            Status.NOT_FOUND
                .withDescription("User " + id + " not found")
                .asRuntimeException());
        return;
    }

    // Internal error with cause
    try {
        validate(user);
        responseObserver.onNext(user);
        responseObserver.onCompleted();
    } catch (Exception e) {
        responseObserver.onError(
            Status.INTERNAL
                .withDescription("Validation failed")
                .withCause(e)
                .asRuntimeException());
    }
}

// Client - catching and handling errors
try {
    User user = blockingStub.getUser(request);
} catch (StatusRuntimeException e) {
    switch (e.getStatus().getCode()) {
        case NOT_FOUND:
            System.out.println("User does not exist");
            break;
        case DEADLINE_EXCEEDED:
            System.out.println("Request timed out");
            break;
        case UNAUTHENTICATED:
            System.out.println("Not authenticated");
            break;
        case PERMISSION_DENIED:
            System.out.println("Access denied");
            break;
        default:
            System.out.println("Error: "
                + e.getStatus().getDescription());
    }
}`
        },
        {
          name: 'Interceptors',
          explanation: 'Interceptors provide middleware for cross-cutting concerns. ServerInterceptor: intercept requests before reaching service. ClientInterceptor: modify outgoing requests. Use cases: authentication, logging, metrics, tracing, rate limiting. Chain multiple interceptors in order. Access/modify Metadata headers.',
          codeExample: `// Logging interceptor - server side
public class LoggingInterceptor implements ServerInterceptor {
    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> call,
            Metadata headers,
            ServerCallHandler<ReqT, RespT> next) {

        String method = call.getMethodDescriptor().getFullMethodName();
        long startTime = System.currentTimeMillis();
        System.out.println(">> gRPC call: " + method);

        // Wrap the call to log completion
        ServerCall<ReqT, RespT> wrappedCall =
            new ForwardingServerCall
                .SimpleForwardingServerCall<>(call) {
            @Override
            public void close(Status status, Metadata trailers) {
                long duration = System.currentTimeMillis()
                    - startTime;
                System.out.println("<< " + method
                    + " [" + status.getCode()
                    + "] " + duration + "ms");
                super.close(status, trailers);
            }
        };

        return next.startCall(wrappedCall, headers);
    }
}

// Client interceptor - attach metadata
public class TokenInterceptor implements ClientInterceptor {
    private final String token;

    public TokenInterceptor(String token) {
        this.token = token;
    }

    @Override
    public <ReqT, RespT> ClientCall<ReqT, RespT> interceptCall(
            MethodDescriptor<ReqT, RespT> method,
            CallOptions options, Channel next) {
        return new ForwardingClientCall
            .SimpleForwardingClientCall<>(
                next.newCall(method, options)) {
            @Override
            public void start(Listener<RespT> listener,
                              Metadata headers) {
                headers.put(Metadata.Key.of("authorization",
                    Metadata.ASCII_STRING_MARSHALLER),
                    "Bearer " + token);
                super.start(listener, headers);
            }
        };
    }
}`
        },
        {
          name: 'Streaming Code Example',
          explanation: '// Bidirectional: @Override public StreamObserver<ChatMessage> chat(StreamObserver<ChatMessage> responseObserver) { return new StreamObserver<ChatMessage>() { public void onNext(ChatMessage msg) { responseObserver.onNext(msg); } public void onError(Throwable t) { } public void onCompleted() { responseObserver.onCompleted(); } }; }',
          codeExample: `// Real-time stock price streaming service

// Proto definition
// service StockService {
//   rpc WatchStocks(stream StockRequest)
//       returns (stream StockPrice);
// }

// Server - bidirectional stock price stream
@Override
public StreamObserver<StockRequest> watchStocks(
        StreamObserver<StockPrice> responseObserver) {

    Set<String> watchedSymbols = new ConcurrentHashSet<>();

    // Background thread to push price updates
    ScheduledExecutorService scheduler =
        Executors.newScheduledThreadPool(1);
    scheduler.scheduleAtFixedRate(() -> {
        for (String symbol : watchedSymbols) {
            StockPrice price = StockPrice.newBuilder()
                .setSymbol(symbol)
                .setPrice(getLatestPrice(symbol))
                .setTimestamp(System.currentTimeMillis())
                .build();
            responseObserver.onNext(price);
        }
    }, 0, 1, TimeUnit.SECONDS);

    return new StreamObserver<StockRequest>() {
        @Override
        public void onNext(StockRequest req) {
            if (req.getAction().equals("SUBSCRIBE")) {
                watchedSymbols.add(req.getSymbol());
            } else {
                watchedSymbols.remove(req.getSymbol());
            }
        }
        @Override
        public void onError(Throwable t) {
            scheduler.shutdown();
        }
        @Override
        public void onCompleted() {
            scheduler.shutdown();
            responseObserver.onCompleted();
        }
    };
}`
        }
      ]
    }
  ]

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

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

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Frameworks', icon: '🧩', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'gRPC', icon: '⚡', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'gRPC', icon: '⚡' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
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
    background: 'linear-gradient(135deg, #86efac, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Frameworks
          </button>
          <h1 style={titleStyle}>gRPC</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FRAMEWORK_COLORS}
        />
      </div>

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
        primaryColor={FRAMEWORK_COLORS.primary}
      />


      {/* Concept Detail Modal */}
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
              colors={FRAMEWORK_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${selectedConcept.color}`,
                      overflow: 'auto',
                      marginTop: '1rem'
                    }}>
                      <SyntaxHighlighter code={detail.codeExample} />
                    </div>
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

export default GRPC

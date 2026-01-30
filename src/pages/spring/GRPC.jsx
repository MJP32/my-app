import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
          explanation: 'gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework developed by Google. It uses Protocol Buffers (protobuf) for serialization and HTTP/2 for transport. gRPC enables efficient communication between microservices with features like bidirectional streaming, flow control, and pluggable authentication.'
        },
        {
          name: 'Protocol Buffers',
          explanation: 'Protocol Buffers (protobuf) is a binary serialization format that is smaller and faster than JSON. Messages are defined in .proto files with strongly typed fields. Each field has a unique number for efficient encoding. Supports scalar types (int32, string, bool), complex types (messages, enums), and collections (repeated fields).'
        },
        {
          name: 'HTTP/2 Transport',
          explanation: 'gRPC uses HTTP/2 which provides multiplexing (multiple requests over single connection), server push, header compression, and binary framing. This enables efficient streaming and reduces latency compared to HTTP/1.1. Connections are persistent and support flow control.'
        },
        {
          name: 'RPC Types',
          explanation: 'gRPC supports 4 types of RPCs: Unary (single request/response), Server streaming (one request, stream of responses), Client streaming (stream of requests, single response), and Bidirectional streaming (both sides stream). Each type suits different use cases from simple queries to real-time chat.'
        },
        {
          name: 'Code Generation',
          explanation: 'The protoc compiler generates client and server code from .proto files. Supports multiple languages: Java, Go, Python, C++, Node.js, etc. Generated code includes message classes, service interfaces, and stub implementations. Type-safe contracts ensure compatibility between services.'
        },
        {
          name: 'Proto File Example',
          explanation: 'syntax = "proto3"; package com.example.user; message User { int32 id = 1; string username = 2; string email = 3; } message GetUserRequest { int32 id = 1; } service UserService { rpc GetUser(GetUserRequest) returns (User); rpc ListUsers(Empty) returns (stream User); }'
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
          explanation: 'A gRPC server implements service methods defined in .proto files. The server listens on a port, handles incoming RPC calls, and sends responses. gRPC provides automatic request/response handling, threading, and lifecycle management. Servers can implement interceptors for cross-cutting concerns like logging and authentication.'
        },
        {
          name: 'Service Implementation',
          explanation: 'Extend the generated base class (e.g., UserServiceGrpc.UserServiceImplBase) and override service methods. Use StreamObserver<T> for sending responses asynchronously. Call onNext() to send data, onError() for failures, and onCompleted() to finish. Each method receives a request object and response observer.'
        },
        {
          name: 'Server Lifecycle',
          explanation: 'Server lifecycle methods: ServerBuilder.forPort(port) creates builder, addService() registers implementations, build() creates server, start() begins listening. Use shutdown() for graceful shutdown and awaitTermination() to block until complete. Handle shutdown hooks for clean termination.'
        },
        {
          name: 'Thread Pool Config',
          explanation: 'Configure thread pools for concurrent request handling. Default uses a cached thread pool. For production, use fixed-size pools: ServerBuilder.executor(Executors.newFixedThreadPool(n)). Consider CPU cores, I/O wait times, and expected concurrency when sizing pools.'
        },
        {
          name: 'Server Interceptors',
          explanation: 'Interceptors provide middleware functionality for logging, authentication, metrics, and tracing. Implement ServerInterceptor interface with interceptCall() method. Chain multiple interceptors with intercept(). Access headers via Metadata parameter. Common uses: JWT validation, request logging, rate limiting.'
        },
        {
          name: 'Server Code Example',
          explanation: 'public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase { @Override public void getUser(GetUserRequest req, StreamObserver<User> observer) { User user = User.newBuilder().setId(req.getId()).setUsername("john").build(); observer.onNext(user); observer.onCompleted(); } } // Start: Server server = ServerBuilder.forPort(9090).addService(new UserServiceImpl()).build().start();'
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
          explanation: 'gRPC clients make RPC calls to servers using generated stub classes. Clients can be blocking (synchronous) or non-blocking (asynchronous). The framework handles connection management, serialization, and error handling. Clients support deadlines, metadata, and streaming for all four RPC types.'
        },
        {
          name: 'ManagedChannel',
          explanation: 'ManagedChannel manages the connection to the gRPC server. Create with ManagedChannelBuilder.forAddress(host, port). Use usePlaintext() for development (no TLS). In production, configure SSL/TLS credentials. Channels are thread-safe and should be reused. Call shutdown() and awaitTermination() when done.'
        },
        {
          name: 'Blocking Stub',
          explanation: 'Blocking stubs provide synchronous calls that wait for responses. Create with ServiceGrpc.newBlockingStub(channel). Simple to use for unary and server streaming RPCs. Returns response directly or Iterator for streams. Throws StatusRuntimeException on errors. Good for simple use cases but blocks the calling thread.'
        },
        {
          name: 'Async Stub',
          explanation: 'Async stubs provide non-blocking calls with callbacks. Create with ServiceGrpc.newStub(channel). Pass StreamObserver<Response> to receive results. Callbacks: onNext() for each response, onError() for failures, onCompleted() when done. Required for client streaming and bidirectional streaming RPCs.'
        },
        {
          name: 'Deadlines & Metadata',
          explanation: 'Deadlines set maximum wait time: stub.withDeadlineAfter(5, TimeUnit.SECONDS). Prevents hanging requests and propagates through call chain. Metadata passes custom headers: Metadata.Key for key definition, attach to calls for auth tokens, tracing IDs, or custom context. Essential for production reliability.'
        },
        {
          name: 'Client Code Example',
          explanation: 'ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 9090).usePlaintext().build(); UserServiceGrpc.UserServiceBlockingStub stub = UserServiceGrpc.newBlockingStub(channel); User user = stub.withDeadlineAfter(5, TimeUnit.SECONDS).getUser(GetUserRequest.newBuilder().setId(1).build()); // Async: asyncStub.getUser(request, new StreamObserver<User>() { ... });'
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
          explanation: 'Server streaming: one request, multiple responses. Use case: fetching large datasets, real-time updates, log streaming. Server calls responseObserver.onNext() multiple times before onCompleted(). Client receives Iterator (blocking) or StreamObserver callbacks (async). Good for pagination alternatives and live data feeds.'
        },
        {
          name: 'Client Streaming',
          explanation: 'Client streaming: multiple requests, one response. Use case: file uploads, batch operations, aggregations. Method returns StreamObserver for client to send messages. Server receives onNext() for each message, processes in onCompleted(). Response sent via the passed responseObserver.'
        },
        {
          name: 'Bidirectional Streaming',
          explanation: 'Bidirectional streaming: both sides send streams independently. Use case: chat applications, real-time collaboration, gaming. Both client and server have StreamObservers. Messages can interleave in any order. Most flexible but most complex to implement. Requires careful flow control.'
        },
        {
          name: 'Error Handling',
          explanation: 'gRPC uses Status codes: OK, CANCELLED, INVALID_ARGUMENT, DEADLINE_EXCEEDED, NOT_FOUND, PERMISSION_DENIED, UNAUTHENTICATED, etc. Throw StatusRuntimeException with Status.CODE.withDescription(). Catch StatusRuntimeException on client. Access code with e.getStatus().getCode(). Include details with Status.withCause().'
        },
        {
          name: 'Interceptors',
          explanation: 'Interceptors provide middleware for cross-cutting concerns. ServerInterceptor: intercept requests before reaching service. ClientInterceptor: modify outgoing requests. Use cases: authentication, logging, metrics, tracing, rate limiting. Chain multiple interceptors in order. Access/modify Metadata headers.'
        },
        {
          name: 'Streaming Code Example',
          explanation: '// Bidirectional: @Override public StreamObserver<ChatMessage> chat(StreamObserver<ChatMessage> responseObserver) { return new StreamObserver<ChatMessage>() { public void onNext(ChatMessage msg) { responseObserver.onNext(msg); } public void onError(Throwable t) { } public void onCompleted() { responseObserver.onCompleted(); } }; }'
        }
      ]
    }
  ]

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
          onMainMenu={breadcrumb?.onMainMenu}
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
              onMainMenu={breadcrumb?.onMainMenu}
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

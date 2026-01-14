import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for Java/Proto code
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
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
      .replace(/\b(syntax|package|message|service|rpc|returns|option|import|public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|package|void|abstract|synchronized)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|double|float|bool|string|bytes|repeated|optional|required)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ManagedChannel|StreamObserver|Status|Metadata|Server|Channel|Stub)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

function GRPC({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'gRPC Fundamentals',
      icon: '⚡',
      color: '#3b82f6',
      description: 'High-performance RPC framework basics',
      content: {
        explanation: 'gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework developed by Google. It uses Protocol Buffers (protobuf) for serialization and HTTP/2 for transport. gRPC enables efficient communication between microservices with features like bidirectional streaming, flow control, and pluggable authentication.',
        keyPoints: [
          'Protocol Buffers: Binary serialization format, smaller and faster than JSON',
          'HTTP/2: Multiplexing, server push, header compression',
          'Multiple languages: Java, Go, Python, C++, Node.js, etc.',
          '4 types of RPCs: Unary, Server streaming, Client streaming, Bidirectional streaming',
          'Built-in features: Authentication, load balancing, retries, timeouts',
          'Type-safe contracts with .proto files',
          'Automatic code generation from proto files',
          'Better performance than REST for service-to-service communication'
        ],
        codeExample: `// user.proto - Protocol Buffer definition
syntax = "proto3";

package com.example.user;

option java_package = "com.example.grpc";
option java_outer_classname = "UserServiceProto";

// User message
message User {
    int32 id = 1;
    string username = 2;
    string email = 3;
}

// Request/Response messages
message GetUserRequest {
    int32 id = 1;
}

message GetUserResponse {
    User user = 1;
}

// Service definition
service UserService {
    // Unary RPC
    rpc GetUser(GetUserRequest) returns (GetUserResponse);

    // Server streaming RPC
    rpc ListUsers(Empty) returns (stream User);

    // Client streaming RPC
    rpc CreateUsers(stream User) returns (CreateUsersResponse);

    // Bidirectional streaming RPC
    rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}

// Generate code: protoc --java_out=. user.proto`
      }
    },
    {
      id: 2,
      name: 'gRPC Server Implementation',
      icon: '🖥️',
      color: '#10b981',
      description: 'Creating and configuring gRPC servers',
      content: {
        explanation: 'A gRPC server implements service methods defined in .proto files. The server listens on a port, handles incoming RPC calls, and sends responses. gRPC provides automatic request/response handling, threading, and lifecycle management. Servers can implement interceptors for cross-cutting concerns like logging and authentication.',
        keyPoints: [
          'Extend generated base class (UserServiceGrpc.UserServiceImplBase)',
          'Implement service methods defined in proto file',
          'Use StreamObserver for async responses',
          'Server lifecycle: start(), shutdown(), awaitTermination()',
          'Interceptors for logging, authentication, metrics',
          'Thread pool configuration for concurrent requests',
          'Error handling with Status codes',
          'Metadata for passing headers and context'
        ],
        codeExample: `// UserServiceImpl.java - Server implementation
import io.grpc.*;
import io.grpc.stub.StreamObserver;

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    // Unary RPC implementation
    @Override
    public void getUser(GetUserRequest request,
                       StreamObserver<GetUserResponse> responseObserver) {
        int userId = request.getId();

        // Business logic
        User user = User.newBuilder()
            .setId(userId)
            .setUsername("john_doe")
            .setEmail("john@example.com")
            .build();

        GetUserResponse response = GetUserResponse.newBuilder()
            .setUser(user)
            .build();

        // Send response
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    // Server streaming RPC
    @Override
    public void listUsers(Empty request,
                         StreamObserver<User> responseObserver) {
        // Stream multiple users
        for (int i = 1; i <= 10; i++) {
            User user = User.newBuilder()
                .setId(i)
                .setUsername("user_" + i)
                .build();
            responseObserver.onNext(user);
        }
        responseObserver.onCompleted();
    }
}

// Server startup
public class GrpcServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder
            .forPort(9090)
            .addService(new UserServiceImpl())
            .build()
            .start();

        System.out.println("Server started on port 9090");
        server.awaitTermination();
    }
}`
      }
    },
    {
      id: 3,
      name: 'gRPC Client Implementation',
      icon: '📱',
      color: '#8b5cf6',
      description: 'Creating gRPC clients and making RPC calls',
      content: {
        explanation: 'gRPC clients make RPC calls to servers using generated stub classes. Clients can be blocking (synchronous) or non-blocking (asynchronous). The framework handles connection management, serialization, and error handling. Clients support deadlines, metadata, and streaming for all four RPC types.',
        keyPoints: [
          'ManagedChannel: Manages connection to server',
          'Blocking stub: Synchronous calls, waits for response',
          'Async stub: Non-blocking calls with callbacks',
          'Streaming stubs for client/server/bidirectional streaming',
          'Deadlines: Maximum time to wait for response',
          'Metadata: Custom headers for authentication, tracing',
          'Channel lifecycle: shutdown(), awaitTermination()',
          'Connection pooling and load balancing'
        ],
        codeExample: `// UserServiceClient.java - Client implementation
import io.grpc.*;

public class UserServiceClient {
    private final UserServiceGrpc.UserServiceBlockingStub blockingStub;
    private final UserServiceGrpc.UserServiceStub asyncStub;
    private final ManagedChannel channel;

    public UserServiceClient(String host, int port) {
        // Create channel
        channel = ManagedChannelBuilder
            .forAddress(host, port)
            .usePlaintext()  // For development only
            .build();

        // Create stubs
        blockingStub = UserServiceGrpc.newBlockingStub(channel);
        asyncStub = UserServiceGrpc.newStub(channel);
    }

    // Blocking (synchronous) call
    public User getUserBlocking(int userId) {
        GetUserRequest request = GetUserRequest.newBuilder()
            .setId(userId)
            .build();

        GetUserResponse response = blockingStub.getUser(request);
        return response.getUser();
    }

    // Async (non-blocking) call
    public void getUserAsync(int userId) {
        GetUserRequest request = GetUserRequest.newBuilder()
            .setId(userId)
            .build();

        asyncStub.getUser(request, new StreamObserver<GetUserResponse>() {
            @Override
            public void onNext(GetUserResponse response) {
                System.out.println("Received: " + response.getUser());
            }

            @Override
            public void onError(Throwable t) {
                System.err.println("Error: " + t.getMessage());
            }

            @Override
            public void onCompleted() {
                System.out.println("Request completed");
            }
        });
    }

    // Server streaming
    public void listUsers() {
        Iterator<User> users = blockingStub.listUsers(Empty.newBuilder().build());
        while (users.hasNext()) {
            User user = users.next();
            System.out.println("User: " + user.getUsername());
        }
    }

    public void shutdown() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }
}`
      }
    },
    {
      id: 4,
      name: 'Streaming & Advanced Features',
      icon: '🌊',
      color: '#ef4444',
      description: 'Streaming RPCs, interceptors, and error handling',
      content: {
        explanation: 'gRPC supports four types of streaming: unary (single request/response), server streaming (single request, stream of responses), client streaming (stream of requests, single response), and bidirectional streaming (both sides stream). Interceptors provide middleware functionality for logging, auth, and metrics. Proper error handling uses Status codes.',
        keyPoints: [
          'Server streaming: One request → multiple responses (e.g., large datasets)',
          'Client streaming: Multiple requests → one response (e.g., file upload)',
          'Bidirectional streaming: Both send streams (e.g., chat)',
          'Interceptors: Chain of handlers for requests/responses',
          'Status codes: OK, CANCELLED, INVALID_ARGUMENT, DEADLINE_EXCEEDED, etc.',
          'Metadata: Key-value pairs for auth tokens, tracing IDs',
          'Deadlines and timeouts: Prevent hanging requests',
          'Context propagation: Pass data through call chain'
        ],
        codeExample: `// Bidirectional streaming - Chat service
@Override
public StreamObserver<ChatMessage> chat(
        StreamObserver<ChatMessage> responseObserver) {

    return new StreamObserver<ChatMessage>() {
        @Override
        public void onNext(ChatMessage message) {
            // Broadcast to all clients
            ChatMessage response = ChatMessage.newBuilder()
                .setUsername(message.getUsername())
                .setMessage(message.getMessage())
                .setTimestamp(System.currentTimeMillis())
                .build();

            responseObserver.onNext(response);
        }

        @Override
        public void onError(Throwable t) {
            System.err.println("Error: " + t.getMessage());
        }

        @Override
        public void onCompleted() {
            responseObserver.onCompleted();
        }
    };
}

// Interceptor for authentication
public class AuthInterceptor implements ServerInterceptor {
    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> call,
            Metadata headers,
            ServerCallHandler<ReqT, RespT> next) {

        String token = headers.get(Metadata.Key.of("authorization",
            Metadata.ASCII_STRING_MARSHALLER));

        if (!isValidToken(token)) {
            call.close(Status.UNAUTHENTICATED
                .withDescription("Invalid token"), new Metadata());
            return new ServerCall.Listener<ReqT>() {};
        }

        return next.startCall(call, headers);
    }
}

// Error handling
try {
    User user = blockingStub
        .withDeadlineAfter(5, TimeUnit.SECONDS)
        .getUser(request);
} catch (StatusRuntimeException e) {
    if (e.getStatus().getCode() == Status.Code.DEADLINE_EXCEEDED) {
        System.err.println("Request timeout");
    } else if (e.getStatus().getCode() == Status.Code.NOT_FOUND) {
        System.err.println("User not found");
    }
}`
      }
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            ← Back to Frameworks
          </button>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #6ee7b7, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '1rem 0 0.5rem 0'
          }}>
            gRPC
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db', margin: 0 }}>
            High-performance RPC framework with Protocol Buffers
          </p>
        </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {!selectedTopic ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.4), 0 12px 24px rgba(0,0,0,0.4)'
                e.currentTarget.style.borderColor = '#10b981'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
                e.currentTarget.style.borderColor = '#374151'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#6ee7b7', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>
                {topic.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            ← Back to Categories
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#6ee7b7', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#d1d5db', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Code Example:
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={selectedTopic.content.codeExample} />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default GRPC

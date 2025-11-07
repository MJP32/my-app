import { useState } from 'react'

// Simple syntax highlighter for Java/XML code
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)/gm, (match) => {
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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|String)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(List|ArrayList|HashMap|Exception|WebService|WebMethod|WebParam|SOAPBinding|BindingType)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+|&lt;\/?\w+|\/&gt;)/g, '<span style="color: #dcdcaa;">$1</span>')
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

function SOAP({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'SOAP Fundamentals',
      icon: '📡',
      color: '#f59e0b',
      description: 'SOAP protocol and web services basics',
      content: {
        explanation: 'SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information in web services using XML. SOAP messages are platform and language independent, making them ideal for enterprise integration. The protocol supports complex operations, transaction management, and security through WS-* standards.',
        keyPoints: [
          'XML-based messaging protocol for web services',
          'Platform and language independent',
          'WSDL (Web Services Description Language) describes service contract',
          'SOAP envelope structure: Header + Body',
          'Transport protocol: Usually HTTP/HTTPS, but can use SMTP, JMS',
          'Built-in error handling with SOAP faults',
          'WS-Security for authentication and encryption',
          'Stateful operations with session management'
        ],
        codeExample: `// SOAP Message Structure
&lt;?xml version="1.0"?&gt;
&lt;soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"&gt;
    &lt;soap:Header&gt;
        &lt;!-- Authentication, transaction info, etc. --&gt;
        &lt;AuthToken&gt;abc123xyz&lt;/AuthToken&gt;
    &lt;/soap:Header&gt;
    &lt;soap:Body&gt;
        &lt;!-- Actual request/response data --&gt;
        &lt;GetUserRequest xmlns="http://example.com/users"&gt;
            &lt;userId&gt;12345&lt;/userId&gt;
        &lt;/GetUserRequest&gt;
    &lt;/soap:Body&gt;
&lt;/soap:Envelope&gt;

// SOAP Fault (Error) Structure
&lt;soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"&gt;
    &lt;soap:Body&gt;
        &lt;soap:Fault&gt;
            &lt;faultcode&gt;soap:Client&lt;/faultcode&gt;
            &lt;faultstring&gt;User not found&lt;/faultstring&gt;
            &lt;detail&gt;
                &lt;errorCode&gt;404&lt;/errorCode&gt;
            &lt;/detail&gt;
        &lt;/soap:Fault&gt;
    &lt;/soap:Body&gt;
&lt;/soap:Envelope&gt;`
      }
    },
    {
      id: 2,
      name: 'JAX-WS Implementation',
      icon: '☕',
      color: '#3b82f6',
      description: 'Java API for XML Web Services',
      content: {
        explanation: 'JAX-WS (Java API for XML Web Services) is the standard Java API for creating SOAP-based web services. It uses annotations to simplify development, automatically generates WSDL, and handles marshalling/unmarshalling of Java objects to/from XML. JAX-WS supports both contract-first (WSDL-first) and code-first approaches.',
        keyPoints: [
          '@WebService: Marks class as web service endpoint',
          '@WebMethod: Exposes method as web service operation',
          '@WebParam: Names and configures method parameters',
          'WSDL automatically generated from annotated classes',
          'Contract-first: Generate Java from WSDL (wsimport)',
          'Code-first: Generate WSDL from Java annotations',
          'SOAPBinding: Configure SOAP 1.1 vs 1.2, RPC vs Document style',
          'Handlers for intercepting SOAP messages'
        ],
        codeExample: `// Web Service Implementation (SEI - Service Endpoint Interface)
import javax.jws.*;
import javax.jws.soap.SOAPBinding;

@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT)
public class UserService {

    @WebMethod
    public User getUser(
        @WebParam(name = "userId") int userId) {

        // Business logic
        User user = new User();
        user.setId(userId);
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        return user;
    }

    @WebMethod
    public String createUser(
        @WebParam(name = "user") User user) {

        // Save user to database
        return "User created with ID: " + user.getId();
    }

    @WebMethod(exclude = true)  // Exclude from WSDL
    private void internalMethod() {
        // Private helper method
    }
}

// User POJO (automatically serialized to XML)
public class User {
    private int id;
    private String username;
    private String email;

    // Getters and setters
}

// Publishing the Web Service
import javax.xml.ws.Endpoint;

public class ServicePublisher {
    public static void main(String[] args) {
        String url = "http://localhost:8080/userservice";
        Endpoint.publish(url, new UserService());
        System.out.println("Service published at: " + url);
    }
}`
      }
    },
    {
      id: 3,
      name: 'WSDL & Client Generation',
      icon: '📄',
      color: '#10b981',
      description: 'Service contracts and client creation',
      content: {
        explanation: 'WSDL (Web Services Description Language) is an XML document that describes the web service interface, operations, message formats, and endpoints. It serves as a contract between service provider and consumer. Tools like wsimport generate Java client code from WSDL, enabling type-safe service invocation.',
        keyPoints: [
          'WSDL Structure: Types, Messages, PortType, Binding, Service',
          'Types: Define data structures using XML Schema',
          'Messages: Define request/response message formats',
          'PortType: Define operations (methods) available',
          'Binding: Specify protocol (SOAP) and encoding',
          'Service: Specify endpoint URLs',
          'wsimport: Generate Java from WSDL',
          'wsdl2java: Apache CXF tool for code generation'
        ],
        codeExample: `// Sample WSDL Structure
&lt;definitions name="UserService"
    targetNamespace="http://example.com/userservice"
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"&gt;

    &lt;!-- Type definitions --&gt;
    &lt;types&gt;
        &lt;xsd:schema&gt;
            &lt;xsd:complexType name="User"&gt;
                &lt;xsd:sequence&gt;
                    &lt;xsd:element name="id" type="xsd:int"/&gt;
                    &lt;xsd:element name="username" type="xsd:string"/&gt;
                    &lt;xsd:element name="email" type="xsd:string"/&gt;
                &lt;/xsd:sequence&gt;
            &lt;/xsd:complexType&gt;
        &lt;/xsd:schema&gt;
    &lt;/types&gt;

    &lt;!-- Messages --&gt;
    &lt;message name="GetUserRequest"&gt;
        &lt;part name="userId" type="xsd:int"/&gt;
    &lt;/message&gt;
    &lt;message name="GetUserResponse"&gt;
        &lt;part name="user" type="tns:User"/&gt;
    &lt;/message&gt;

    &lt;!-- Port Type (Operations) --&gt;
    &lt;portType name="UserServicePortType"&gt;
        &lt;operation name="getUser"&gt;
            &lt;input message="tns:GetUserRequest"/&gt;
            &lt;output message="tns:GetUserResponse"/&gt;
        &lt;/operation&gt;
    &lt;/portType&gt;

    &lt;!-- SOAP Binding --&gt;
    &lt;binding name="UserServiceBinding" type="tns:UserServicePortType"&gt;
        &lt;soap:binding transport="http://schemas.xmlsoap.org/soap/http"/&gt;
        &lt;operation name="getUser"&gt;
            &lt;soap:operation soapAction="getUser"/&gt;
            &lt;input&gt;&lt;soap:body use="literal"/&gt;&lt;/input&gt;
            &lt;output&gt;&lt;soap:body use="literal"/&gt;&lt;/output&gt;
        &lt;/operation&gt;
    &lt;/binding&gt;

    &lt;!-- Service Endpoint --&gt;
    &lt;service name="UserService"&gt;
        &lt;port name="UserServicePort" binding="tns:UserServiceBinding"&gt;
            &lt;soap:address location="http://localhost:8080/userservice"/&gt;
        &lt;/port&gt;
    &lt;/service&gt;
&lt;/definitions&gt;

// Generate client code from WSDL:
// wsimport -keep -s src http://localhost:8080/userservice?wsdl`
      }
    },
    {
      id: 4,
      name: 'SOAP Client & Error Handling',
      icon: '🔌',
      color: '#ef4444',
      description: 'Consuming SOAP services and handling faults',
      content: {
        explanation: 'SOAP clients invoke web service operations by sending XML messages. JAX-WS clients can be generated from WSDL or created programmatically. Error handling in SOAP uses fault elements with structured error information. Clients must handle SOAPFaultException and network errors appropriately.',
        keyPoints: [
          'Generated client stubs provide type-safe service access',
          'Service class instantiation from WSDL',
          'Port retrieval for making service calls',
          'SOAPFaultException for service errors',
          'WebServiceException for client-side errors',
          'Request/Response interceptors with handlers',
          'Timeout configuration for slow services',
          'Authentication via WS-Security or HTTP headers'
        ],
        codeExample: `// SOAP Client Implementation
import javax.xml.ws.Service;
import javax.xml.namespace.QName;
import java.net.URL;

public class UserServiceClient {
    public static void main(String[] args) {
        try {
            // Service endpoint URL
            URL wsdlURL = new URL("http://localhost:8080/userservice?wsdl");

            // Create service
            QName serviceName = new QName(
                "http://example.com/userservice",
                "UserService"
            );
            Service service = Service.create(wsdlURL, serviceName);

            // Get port (proxy)
            UserService port = service.getPort(UserService.class);

            // Invoke service operations
            User user = port.getUser(12345);
            System.out.println("User: " + user.getUsername());

            // Create new user
            User newUser = new User();
            newUser.setId(999);
            newUser.setUsername("jane_doe");
            newUser.setEmail("jane@example.com");

            String result = port.createUser(newUser);
            System.out.println(result);

        } catch (SOAPFaultException e) {
            // Handle SOAP faults (service errors)
            System.err.println("SOAP Fault: " + e.getFault().getFaultString());
            System.err.println("Fault Code: " + e.getFault().getFaultCode());

        } catch (WebServiceException e) {
            // Handle client-side errors (network, timeout, etc.)
            System.err.println("Web Service Error: " + e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// Handler for intercepting requests/responses
import javax.xml.ws.handler.soap.*;
import javax.xml.soap.SOAPMessage;

public class LoggingHandler implements SOAPHandler<SOAPMessageContext> {
    @Override
    public boolean handleMessage(SOAPMessageContext context) {
        Boolean isRequest = (Boolean) context.get(
            MessageContext.MESSAGE_OUTBOUND_PROPERTY
        );

        SOAPMessage message = context.getMessage();
        if (isRequest) {
            System.out.println("Outbound SOAP Request:");
        } else {
            System.out.println("Inbound SOAP Response:");
        }

        // Log the SOAP message
        try {
            message.writeTo(System.out);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return true;  // Continue processing
    }

    @Override
    public boolean handleFault(SOAPMessageContext context) {
        System.err.println("SOAP Fault received");
        return true;
    }

    @Override
    public void close(MessageContext context) {}

    @Override
    public Set<QName> getHeaders() {
        return null;
    }
}`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#fef3c7', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
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
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Frameworks
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: '1rem 0 0.5rem 0'
        }}>
          📡 SOAP Web Services
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          XML-based protocol for enterprise web services
        </p>
      </div>

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
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
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
              backgroundColor: selectedTopic.color,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            ← Back to Topics
          </button>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Code Example:
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto'
            }}>
              <SyntaxHighlighter code={selectedTopic.content.codeExample} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SOAP

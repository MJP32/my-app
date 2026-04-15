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
  { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
  { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.3)' },
]

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
      .replace(/\b(String|List|ArrayList|Set|HashSet|Map|HashMap|Optional|Stream|Exception|Override|Integer|Long|WebService|WebMethod|WebParam|WebResult|SOAPBinding|SOAPMessage|SOAPBody|SOAPHeader|SOAPFault|SOAPFactory|MessageFactory|Endpoint|Service|QName|URL|JAXBContext|Marshaller|Unmarshaller|XmlRootElement|XmlElement|XmlType|XmlAccessorType|XmlAttribute|HandlerChain|SOAPHandler|LogicalHandler|MessageContext)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function SOAP({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'soap-fundamentals',
      name: 'SOAP Fundamentals',
      icon: '📡',
      color: '#f59e0b',
      description: 'SOAP protocol and web services basics',
      details: [
        {
          name: 'Protocol Overview',
          explanation: 'SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information in web services using XML. SOAP messages are platform and language independent, making them ideal for enterprise integration. The protocol supports complex operations, transaction management, and security through WS-* standards.',
          codeExample: `// A basic SOAP request/response exchange
// SOAP Request XML
// <?xml version="1.0" encoding="UTF-8"?>
// <soap:Envelope
//     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
//     xmlns:ws="http://example.com/webservice">
//   <soap:Header>
//     <ws:AuthToken>abc123</ws:AuthToken>
//   </soap:Header>
//   <soap:Body>
//     <ws:GetUserRequest>
//       <ws:UserId>42</ws:UserId>
//     </ws:GetUserRequest>
//   </soap:Body>
// </soap:Envelope>

// Publishing a JAX-WS endpoint in Java
import javax.xml.ws.Endpoint;

public class SOAPServer {
    public static void main(String[] args) {
        // Create and publish the endpoint
        String url = "http://localhost:8080/ws/user";
        Endpoint endpoint = Endpoint.publish(url, new UserServiceImpl());
        System.out.println("SOAP Service running at: " + url + "?wsdl");
    }
}`
        },
        {
          name: 'XML-Based Messaging',
          explanation: 'XML-based messaging protocol for web services. Platform and language independent. WSDL (Web Services Description Language) describes service contract. Transport protocol: Usually HTTP/HTTPS, but can use SMTP, JMS.',
          codeExample: `// Creating a SOAP message programmatically
import javax.xml.soap.*;

public class SOAPMessageExample {
    public static SOAPMessage createRequest() throws Exception {
        // Create SOAP message factory
        MessageFactory factory = MessageFactory.newInstance();
        SOAPMessage message = factory.createMessage();

        // Get the SOAP body
        SOAPBody body = message.getSOAPBody();

        // Add namespace and elements
        QName serviceName = new QName("http://example.com/ws", "GetUser", "ws");
        SOAPBodyElement request = body.addBodyElement(serviceName);
        request.addChildElement("userId").addTextNode("42");

        // Save changes and return
        message.saveChanges();
        return message;
    }
}`
        },
        {
          name: 'SOAP Envelope',
          explanation: 'SOAP envelope structure consists of Header + Body. The Header contains authentication, transaction info, and metadata. The Body contains the actual request/response data. This structure enables standardized message processing.',
          codeExample: `// Building a complete SOAP envelope with header and body
import javax.xml.soap.*;

public class SOAPEnvelopeBuilder {
    public static SOAPMessage buildEnvelope() throws Exception {
        MessageFactory factory = MessageFactory.newInstance();
        SOAPMessage message = factory.createMessage();

        // Access envelope parts
        SOAPPart soapPart = message.getSOAPPart();
        SOAPEnvelope envelope = soapPart.getEnvelope();

        // Add custom namespace
        envelope.addNamespaceDeclaration("ws", "http://example.com/ws");

        // Build SOAP Header with auth token
        SOAPHeader header = envelope.getHeader();
        QName authQName = new QName("http://example.com/ws", "AuthHeader");
        SOAPHeaderElement authHeader = header.addHeaderElement(authQName);
        authHeader.addChildElement("Token").addTextNode("Bearer xyz789");
        authHeader.setMustUnderstand(true);

        // Build SOAP Body with request payload
        SOAPBody body = envelope.getBody();
        SOAPBodyElement operation = body.addBodyElement(
            new QName("http://example.com/ws", "TransferFunds"));
        operation.addChildElement("fromAccount").addTextNode("ACC-001");
        operation.addChildElement("toAccount").addTextNode("ACC-002");
        operation.addChildElement("amount").addTextNode("500.00");

        message.saveChanges();
        return message;
    }
}`
        },
        {
          name: 'Error Handling',
          explanation: 'Built-in error handling with SOAP faults. Fault elements contain faultcode, faultstring, and detail. Standard fault codes: Client, Server, VersionMismatch, MustUnderstand. Structured error information enables proper error recovery.',
          codeExample: `// Creating and throwing SOAP faults
import javax.xml.soap.*;
import javax.xml.ws.soap.SOAPFaultException;

public class SOAPFaultExample {

    // Throwing a SOAP fault from a web service
    public String processOrder(String orderId) {
        if (orderId == null || orderId.isEmpty()) {
            // Create a SOAP fault for invalid input
            try {
                SOAPFactory factory = SOAPFactory.newInstance();
                SOAPFault fault = factory.createFault(
                    "Order ID is required",        // faultstring
                    new QName("http://schemas.xmlsoap.org/soap/envelope/",
                              "Client")            // faultcode
                );
                fault.setFaultActor("http://example.com/orderService");
                fault.addDetail()
                     .addDetailEntry(new QName("", "ValidationError"))
                     .addTextNode("orderId field cannot be null or empty");

                throw new SOAPFaultException(fault);
            } catch (SOAPException e) {
                throw new RuntimeException("Error creating fault", e);
            }
        }
        return "Order " + orderId + " processed";
    }

    // SOAP Fault XML structure:
    // <soap:Fault>
    //   <faultcode>soap:Client</faultcode>
    //   <faultstring>Order ID is required</faultstring>
    //   <faultactor>http://example.com/orderService</faultactor>
    //   <detail>
    //     <ValidationError>orderId field cannot be null</ValidationError>
    //   </detail>
    // </soap:Fault>
}`
        },
        {
          name: 'WS-Security',
          explanation: 'WS-Security for authentication and encryption. Supports username tokens, X.509 certificates, and SAML assertions. Message-level security independent of transport. Enables secure communication in enterprise environments.',
          codeExample: `// WS-Security UsernameToken in SOAP Header
// XML representation of a WS-Security header:
// <soap:Header>
//   <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/...">
//     <wsse:UsernameToken>
//       <wsse:Username>admin</wsse:Username>
//       <wsse:Password Type="...#PasswordDigest">hashedPwd</wsse:Password>
//       <wsse:Nonce>uniqueNonce123</wsse:Nonce>
//       <wsu:Created>2025-01-15T10:00:00Z</wsu:Created>
//     </wsse:UsernameToken>
//   </wsse:Security>
// </soap:Header>

// Adding WS-Security headers programmatically
import javax.xml.soap.*;

public class WSSecurity {
    public static void addSecurityHeader(SOAPMessage message,
            String username, String password) throws SOAPException {

        SOAPHeader header = message.getSOAPHeader();
        String wsseNS = "http://docs.oasis-open.org/wss/2004/01/"
            + "oasis-200401-wss-wssecurity-secext-1.0.xsd";

        // Create Security element
        SOAPHeaderElement security = header.addHeaderElement(
            new QName(wsseNS, "Security", "wsse"));
        security.setMustUnderstand(true);

        // Add UsernameToken
        SOAPElement usernameToken = security.addChildElement(
            "UsernameToken", "wsse");
        usernameToken.addChildElement("Username", "wsse")
                     .addTextNode(username);
        usernameToken.addChildElement("Password", "wsse")
                     .addTextNode(password);

        message.saveChanges();
    }
}`
        },
        {
          name: 'Session Management',
          explanation: 'Stateful operations with session management. WS-Addressing for message routing and correlation. WS-ReliableMessaging for guaranteed delivery. Enables complex multi-step business transactions.',
          codeExample: `// Enabling session management in JAX-WS
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.xml.ws.WebServiceContext;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.xml.ws.handler.MessageContext;
import java.util.Map;
import java.util.HashMap;

@WebService
public class ShoppingCartService {

    @Resource
    private WebServiceContext wsContext;

    // Store per-session cart data
    private static Map<String, List<String>> carts = new HashMap<>();

    @WebMethod
    public void addItem(String item) {
        String sessionId = getSessionId();
        carts.computeIfAbsent(sessionId, k -> new ArrayList<>()).add(item);
    }

    @WebMethod
    public List<String> getCart() {
        String sessionId = getSessionId();
        return carts.getOrDefault(sessionId, new ArrayList<>());
    }

    private String getSessionId() {
        MessageContext mc = wsContext.getMessageContext();
        HttpSession session = ((javax.servlet.http.HttpServletRequest)
            mc.get(MessageContext.SERVLET_REQUEST)).getSession(true);
        return session.getId();
    }
}

// Client-side: Enable session maintenance
// Service service = Service.create(wsdlURL, serviceName);
// CartPort port = service.getPort(CartPort.class);
// ((BindingProvider) port).getRequestContext()
//     .put(BindingProvider.SESSION_MAINTAIN_PROPERTY, true);`
        }
      ]
    },
    {
      id: 'jax-ws-implementation',
      name: 'JAX-WS Implementation',
      icon: '☕',
      color: '#3b82f6',
      description: 'Java API for XML Web Services',
      details: [
        {
          name: 'Overview',
          explanation: 'JAX-WS (Java API for XML Web Services) is the standard Java API for creating SOAP-based web services. It uses annotations to simplify development, automatically generates WSDL, and handles marshalling/unmarshalling of Java objects to/from XML. JAX-WS supports both contract-first (WSDL-first) and code-first approaches.',
          codeExample: `// Complete JAX-WS web service example
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.xml.ws.Endpoint;

// Service Endpoint Interface (SEI)
@WebService
public interface UserService {
    @WebMethod
    User getUser(@WebParam(name = "userId") int userId);

    @WebMethod
    List<User> getAllUsers();
}

// Service Implementation Bean (SIB)
@WebService(endpointInterface = "com.example.UserService",
            serviceName = "UserService",
            portName = "UserPort",
            targetNamespace = "http://example.com/users")
public class UserServiceImpl implements UserService {

    @Override
    public User getUser(int userId) {
        // Look up user from database
        return new User(userId, "John Doe", "john@example.com");
    }

    @Override
    public List<User> getAllUsers() {
        return List.of(
            new User(1, "John Doe", "john@example.com"),
            new User(2, "Jane Smith", "jane@example.com")
        );
    }

    // Publish the service
    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8080/ws/users",
                         new UserServiceImpl());
    }
}`
        },
        {
          name: '@WebService Annotation',
          explanation: '@WebService marks a class as a web service endpoint. This annotation tells the JAX-WS runtime to expose the class as a SOAP service. It can specify serviceName, portName, targetNamespace, and endpointInterface for SEI pattern.',
          codeExample: `// @WebService with all common attributes
import javax.jws.WebService;

// Interface (SEI - Service Endpoint Interface)
@WebService(
    name = "CalculatorPortType",           // wsdl:portType name
    targetNamespace = "http://example.com/calc"
)
public interface CalculatorService {
    double add(double a, double b);
    double subtract(double a, double b);
    double multiply(double a, double b);
    double divide(double a, double b);
}

// Implementation (SIB - Service Implementation Bean)
@WebService(
    serviceName = "CalculatorService",     // wsdl:service name
    portName = "CalculatorPort",           // wsdl:port name
    targetNamespace = "http://example.com/calc",
    endpointInterface = "com.example.CalculatorService",
    wsdlLocation = "WEB-INF/wsdl/calculator.wsdl"
)
public class CalculatorServiceImpl implements CalculatorService {

    @Override
    public double add(double a, double b) {
        return a + b;
    }

    @Override
    public double subtract(double a, double b) {
        return a - b;
    }

    @Override
    public double multiply(double a, double b) {
        return a * b;
    }

    @Override
    public double divide(double a, double b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }
}`
        },
        {
          name: '@WebMethod Annotation',
          explanation: '@WebMethod exposes a method as a web service operation. By default, all public methods are exposed. Use exclude=true to hide methods from WSDL. operationName customizes the WSDL operation name.',
          codeExample: `// @WebMethod usage examples
import javax.jws.WebService;
import javax.jws.WebMethod;

@WebService(serviceName = "OrderService")
public class OrderServiceImpl {

    // Exposed as "placeOrder" operation in WSDL
    @WebMethod(operationName = "placeOrder")
    public String createOrder(String productId, int quantity) {
        // Process the order
        String orderId = "ORD-" + System.currentTimeMillis();
        return orderId;
    }

    // Exposed with custom SOAP action
    @WebMethod(
        operationName = "cancelOrder",
        action = "http://example.com/orders/cancel"
    )
    public boolean cancelOrder(String orderId) {
        // Cancel logic
        return true;
    }

    // Excluded from WSDL - internal helper method
    @WebMethod(exclude = true)
    public void internalCleanup() {
        // This method will NOT appear in the WSDL
        // Not accessible via SOAP
    }

    // Public method without @WebMethod is still
    // exposed by default (implicit convention)
    public String getOrderStatus(String orderId) {
        return "SHIPPED";
    }
}`
        },
        {
          name: '@WebParam Annotation',
          explanation: '@WebParam names and configures method parameters. Specifies parameter name in WSDL and SOAP messages. mode attribute controls IN, OUT, or INOUT parameters. header attribute moves parameters to SOAP header.',
          codeExample: `// @WebParam usage with various modes
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.xml.ws.Holder;

@WebService
public class PaymentService {

    // Named parameters in SOAP message
    @WebMethod
    @WebResult(name = "transactionId")
    public String processPayment(
        @WebParam(name = "accountNumber") String account,
        @WebParam(name = "amount") double amount,
        @WebParam(name = "currency",
                  targetNamespace = "http://example.com/payment")
        String currency
    ) {
        return "TXN-" + System.currentTimeMillis();
    }

    // Parameter in SOAP header (e.g., auth token)
    @WebMethod
    public String secureOperation(
        @WebParam(name = "authToken",
                  header = true,
                  mode = WebParam.Mode.IN)
        String token,
        @WebParam(name = "data") String data
    ) {
        // Token comes from SOAP header, data from body
        return "Processed: " + data;
    }

    // OUT parameter using Holder pattern
    @WebMethod
    public void validateCard(
        @WebParam(name = "cardNumber", mode = WebParam.Mode.IN)
        String cardNumber,
        @WebParam(name = "isValid", mode = WebParam.Mode.OUT)
        Holder<Boolean> isValid,
        @WebParam(name = "message", mode = WebParam.Mode.OUT)
        Holder<String> message
    ) {
        isValid.value = cardNumber.length() == 16;
        message.value = isValid.value ? "Valid" : "Invalid card";
    }
}`
        },
        {
          name: 'Code-First Approach',
          explanation: 'WSDL automatically generated from annotated classes. Start with Java code, let JAX-WS generate WSDL. Faster development for new services. May require customization for complex schemas.',
          codeExample: `// Code-First: Write Java, WSDL is auto-generated
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.ws.Endpoint;

// JAXB-annotated DTO - maps to XML schema type
@XmlRootElement(name = "Employee")
@XmlType(propOrder = {"id", "name", "department", "salary"})
public class Employee {
    private int id;
    private String name;
    private String department;
    private double salary;

    @XmlElement(required = true)
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    @XmlElement(required = true)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String dept) { this.department = dept; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }
}

// Service - WSDL generated from these annotations
@WebService(serviceName = "EmployeeService",
            targetNamespace = "http://example.com/hr")
public class EmployeeServiceImpl {

    @WebMethod
    public Employee findEmployee(int employeeId) {
        Employee emp = new Employee();
        emp.setId(employeeId);
        emp.setName("Alice Johnson");
        emp.setDepartment("Engineering");
        emp.setSalary(95000.0);
        return emp;
    }

    public static void main(String[] args) {
        // WSDL auto-generated at URL + "?wsdl"
        Endpoint.publish("http://localhost:8080/ws/hr",
                         new EmployeeServiceImpl());
    }
}`
        },
        {
          name: 'Contract-First Approach',
          explanation: 'Generate Java from WSDL using wsimport tool. Start with WSDL contract, generate Java stubs. Better for interoperability and schema control. Preferred for enterprise integration scenarios.',
          codeExample: `// Contract-First: Start with WSDL, generate Java
// Step 1: Define WSDL contract (inventory.wsdl)
// <?xml version="1.0" encoding="UTF-8"?>
// <definitions name="InventoryService"
//   targetNamespace="http://example.com/inventory"
//   xmlns="http://schemas.xmlsoap.org/wsdl/"
//   xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
//   xmlns:tns="http://example.com/inventory"
//   xmlns:xsd="http://www.w3.org/2001/XMLSchema">
//
//   <types>
//     <xsd:schema targetNamespace="http://example.com/inventory">
//       <xsd:element name="checkStock">
//         <xsd:complexType>
//           <xsd:sequence>
//             <xsd:element name="productId" type="xsd:string"/>
//           </xsd:sequence>
//         </xsd:complexType>
//       </xsd:element>
//       <xsd:element name="checkStockResponse">
//         <xsd:complexType>
//           <xsd:sequence>
//             <xsd:element name="quantity" type="xsd:int"/>
//           </xsd:sequence>
//         </xsd:complexType>
//       </xsd:element>
//     </xsd:schema>
//   </types>
// </definitions>

// Step 2: Generate Java with wsimport
// wsimport -keep -s src -p com.example.inventory
//          http://localhost:8080/ws/inventory?wsdl

// Step 3: Implement the generated interface
@WebService(
    endpointInterface = "com.example.inventory.InventoryPortType",
    wsdlLocation = "WEB-INF/wsdl/inventory.wsdl"
)
public class InventoryServiceImpl implements InventoryPortType {

    @Override
    public int checkStock(String productId) {
        // Implementation matches the WSDL contract
        Map<String, Integer> stock = Map.of(
            "PROD-001", 150,
            "PROD-002", 0,
            "PROD-003", 42
        );
        return stock.getOrDefault(productId, -1);
    }
}`
        },
        {
          name: 'SOAPBinding Configuration',
          explanation: 'Configure SOAP 1.1 vs 1.2, RPC vs Document style. Document/Literal is the most interoperable style. RPC/Encoded is legacy and less interoperable. Style affects message structure and WS-I compliance.',
          codeExample: `// SOAPBinding style and use configurations
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import javax.jws.soap.SOAPBinding.Use;
import javax.jws.soap.SOAPBinding.ParameterStyle;

// Document/Literal Wrapped (recommended, WS-I compliant)
@WebService
@SOAPBinding(
    style = Style.DOCUMENT,
    use = Use.LITERAL,
    parameterStyle = ParameterStyle.WRAPPED
)
public class ModernService {
    @WebMethod
    public String processRequest(String input) {
        return "Result: " + input;
    }
}
// Produces clean XML:
// <soap:Body>
//   <processRequest>
//     <arg0>test</arg0>
//   </processRequest>
// </soap:Body>

// Document/Literal Bare
@WebService
@SOAPBinding(
    style = Style.DOCUMENT,
    use = Use.LITERAL,
    parameterStyle = ParameterStyle.BARE
)
public class BareService {
    // With BARE, each method can have only ONE parameter
    @WebMethod
    public OrderResponse submitOrder(OrderRequest request) {
        return new OrderResponse("OK");
    }
}
// Produces:
// <soap:Body>
//   <OrderRequest>...</OrderRequest>
// </soap:Body>

// RPC/Literal (legacy but sometimes needed)
@WebService
@SOAPBinding(style = Style.RPC, use = Use.LITERAL)
public class LegacyRpcService {
    @WebMethod
    public String lookup(String key) {
        return "value-for-" + key;
    }
}
// Produces:
// <soap:Body>
//   <lookup>
//     <key>myKey</key>
//   </lookup>
// </soap:Body>`
        },
        {
          name: 'Message Handlers',
          explanation: 'Handlers intercept SOAP messages for cross-cutting concerns. SOAPHandler for message-level processing. LogicalHandler for payload-level processing. Use for logging, security, transformation.',
          codeExample: `// SOAP Message Handler for logging
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;
import javax.xml.ws.handler.MessageContext;
import javax.xml.soap.SOAPMessage;
import java.util.Set;

public class LoggingHandler implements SOAPHandler<SOAPMessageContext> {

    @Override
    public boolean handleMessage(SOAPMessageContext context) {
        Boolean outbound = (Boolean) context.get(
            MessageContext.MESSAGE_OUTBOUND_PROPERTY);

        SOAPMessage message = context.getMessage();
        try {
            if (outbound) {
                System.out.println("=== Outbound SOAP Message ===");
            } else {
                System.out.println("=== Inbound SOAP Message ===");
            }
            message.writeTo(System.out);
            System.out.println();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true; // continue handler chain
    }

    @Override
    public boolean handleFault(SOAPMessageContext context) {
        System.out.println("=== SOAP Fault Detected ===");
        return true;
    }

    @Override
    public void close(MessageContext context) {
        // Cleanup resources
    }

    @Override
    public Set<QName> getHeaders() {
        return null; // Process all headers
    }
}

// Register handler via @HandlerChain annotation
@WebService
@HandlerChain(file = "handler-chain.xml")
public class MyService {
    @WebMethod
    public String hello(String name) {
        return "Hello, " + name;
    }
}

// handler-chain.xml:
// <handler-chains>
//   <handler-chain>
//     <handler>
//       <handler-class>com.example.LoggingHandler</handler-class>
//     </handler>
//   </handler-chain>
// </handler-chains>`
        }
      ]
    },
    {
      id: 'wsdl-client-generation',
      name: 'WSDL & Client Generation',
      icon: '📄',
      color: '#10b981',
      description: 'Service contracts and client creation',
      details: [
        {
          name: 'WSDL Overview',
          explanation: 'WSDL (Web Services Description Language) is an XML document that describes the web service interface, operations, message formats, and endpoints. It serves as a contract between service provider and consumer. Tools like wsimport generate Java client code from WSDL, enabling type-safe service invocation.',
          codeExample: `// Complete WSDL document structure
// <?xml version="1.0" encoding="UTF-8"?>
// <definitions name="BookService"
//   targetNamespace="http://example.com/books"
//   xmlns="http://schemas.xmlsoap.org/wsdl/"
//   xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
//   xmlns:tns="http://example.com/books"
//   xmlns:xsd="http://www.w3.org/2001/XMLSchema">
//
//   <!-- Types: XML Schema for data structures -->
//   <types>
//     <xsd:schema targetNamespace="http://example.com/books">
//       <xsd:element name="findBook" type="tns:FindBookRequest"/>
//       <xsd:element name="findBookResponse" type="tns:FindBookResponse"/>
//       <xsd:complexType name="FindBookRequest">
//         <xsd:sequence>
//           <xsd:element name="isbn" type="xsd:string"/>
//         </xsd:sequence>
//       </xsd:complexType>
//       <xsd:complexType name="FindBookResponse">
//         <xsd:sequence>
//           <xsd:element name="title" type="xsd:string"/>
//           <xsd:element name="author" type="xsd:string"/>
//           <xsd:element name="price" type="xsd:double"/>
//         </xsd:sequence>
//       </xsd:complexType>
//     </xsd:schema>
//   </types>
//
//   <!-- Messages, PortType, Binding, Service sections follow -->
// </definitions>`
        },
        {
          name: 'Types Section',
          explanation: 'Types define data structures using XML Schema (XSD). Complex types describe request/response objects. Simple types for primitives with restrictions. Imported schemas for shared definitions across services.',
          codeExample: `// WSDL Types section with XSD schema definitions
// <types>
//   <xsd:schema targetNamespace="http://example.com/orders">
//
//     <!-- Simple type with restriction -->
//     <xsd:simpleType name="OrderStatus">
//       <xsd:restriction base="xsd:string">
//         <xsd:enumeration value="PENDING"/>
//         <xsd:enumeration value="CONFIRMED"/>
//         <xsd:enumeration value="SHIPPED"/>
//         <xsd:enumeration value="DELIVERED"/>
//       </xsd:restriction>
//     </xsd:simpleType>
//
//     <!-- Complex type for Order -->
//     <xsd:complexType name="Order">
//       <xsd:sequence>
//         <xsd:element name="orderId" type="xsd:string"/>
//         <xsd:element name="customerId" type="xsd:int"/>
//         <xsd:element name="status" type="tns:OrderStatus"/>
//         <xsd:element name="items" type="tns:OrderItem"
//                      maxOccurs="unbounded"/>
//         <xsd:element name="totalAmount" type="xsd:decimal"/>
//       </xsd:sequence>
//       <xsd:attribute name="priority" type="xsd:boolean"
//                      default="false"/>
//     </xsd:complexType>
//
//     <!-- Complex type for OrderItem -->
//     <xsd:complexType name="OrderItem">
//       <xsd:sequence>
//         <xsd:element name="productId" type="xsd:string"/>
//         <xsd:element name="quantity" type="xsd:int"/>
//         <xsd:element name="unitPrice" type="xsd:decimal"/>
//       </xsd:sequence>
//     </xsd:complexType>
//
//     <!-- Import shared schema -->
//     <xsd:import namespace="http://example.com/common"
//                 schemaLocation="common.xsd"/>
//   </xsd:schema>
// </types>

// Corresponding Java JAXB class
@XmlRootElement
@XmlType(name = "Order", propOrder = {
    "orderId", "customerId", "status", "items", "totalAmount"
})
public class Order {
    private String orderId;
    private int customerId;
    private String status;
    private List<OrderItem> items;
    private double totalAmount;
    // getters and setters...
}`
        },
        {
          name: 'Messages Section',
          explanation: 'Messages define request/response message formats. Each message has parts referencing types. Input message for request, output message for response. Fault messages for error conditions.',
          codeExample: `// WSDL Messages section
// <message name="GetOrderRequest">
//   <part name="parameters" element="tns:getOrder"/>
// </message>
//
// <message name="GetOrderResponse">
//   <part name="parameters" element="tns:getOrderResponse"/>
// </message>
//
// <!-- Fault message for error handling -->
// <message name="OrderNotFoundFault">
//   <part name="fault" element="tns:OrderNotFoundException"/>
// </message>
//
// <!-- Multiple parts for RPC-style messages -->
// <message name="CreateOrderRequest">
//   <part name="customerId" type="xsd:int"/>
//   <part name="productId" type="xsd:string"/>
//   <part name="quantity" type="xsd:int"/>
// </message>
//
// <message name="CreateOrderResponse">
//   <part name="orderId" type="xsd:string"/>
//   <part name="status" type="tns:OrderStatus"/>
// </message>

// In Java, messages map to method signatures:
@WebService
public interface OrderService {

    // GetOrderRequest -> method params
    // GetOrderResponse -> return type
    // OrderNotFoundFault -> throws declaration
    @WebMethod
    Order getOrder(
        @WebParam(name = "orderId") String orderId
    ) throws OrderNotFoundException;

    @WebMethod
    String createOrder(
        @WebParam(name = "customerId") int customerId,
        @WebParam(name = "productId") String productId,
        @WebParam(name = "quantity") int quantity
    );
}`
        },
        {
          name: 'PortType Section',
          explanation: 'PortType defines operations (methods) available. Each operation has input, output, and fault messages. Abstract interface independent of protocol. Named set of operations the service provides.',
          codeExample: `// WSDL PortType section - defines abstract operations
// <portType name="OrderServicePortType">
//
//   <!-- Request-Response operation -->
//   <operation name="getOrder">
//     <input message="tns:GetOrderRequest"/>
//     <output message="tns:GetOrderResponse"/>
//     <fault name="notFound"
//            message="tns:OrderNotFoundFault"/>
//   </operation>
//
//   <!-- One-way operation (no response) -->
//   <operation name="notifyShipment">
//     <input message="tns:ShipmentNotification"/>
//   </operation>
//
//   <!-- Request-Response with multiple faults -->
//   <operation name="createOrder">
//     <input message="tns:CreateOrderRequest"/>
//     <output message="tns:CreateOrderResponse"/>
//     <fault name="validationError"
//            message="tns:ValidationFault"/>
//     <fault name="inventoryError"
//            message="tns:InsufficientStockFault"/>
//   </operation>
//
// </portType>

// Java equivalent of the portType:
@WebService(name = "OrderServicePortType")
public interface OrderServicePortType {

    // Request-Response
    Order getOrder(String orderId) throws OrderNotFoundException;

    // One-Way (void return, @Oneway annotation)
    @javax.jws.Oneway
    void notifyShipment(ShipmentNotification notification);

    // Multiple fault types
    String createOrder(OrderRequest request)
        throws ValidationException, InsufficientStockException;
}`
        },
        {
          name: 'Binding Section',
          explanation: 'Binding specifies protocol (SOAP) and encoding. Links abstract portType to concrete protocol. Defines SOAP action, style, and encoding. transport attribute specifies HTTP, SMTP, etc.',
          codeExample: `// WSDL Binding section - protocol specifics
// <binding name="OrderServiceSoapBinding"
//          type="tns:OrderServicePortType">
//
//   <!-- SOAP binding: document/literal over HTTP -->
//   <soap:binding
//     style="document"
//     transport="http://schemas.xmlsoap.org/soap/http"/>
//
//   <operation name="getOrder">
//     <soap:operation
//       soapAction="http://example.com/orders/getOrder"/>
//     <input>
//       <soap:body use="literal"/>
//     </input>
//     <output>
//       <soap:body use="literal"/>
//     </output>
//     <fault name="notFound">
//       <soap:fault name="notFound" use="literal"/>
//     </fault>
//   </operation>
//
//   <operation name="createOrder">
//     <soap:operation
//       soapAction="http://example.com/orders/createOrder"/>
//     <input>
//       <soap:body use="literal"/>
//       <!-- Header binding for auth -->
//       <soap:header message="tns:AuthHeader"
//                    part="credentials" use="literal"/>
//     </input>
//     <output>
//       <soap:body use="literal"/>
//     </output>
//   </operation>
//
// </binding>

// Java equivalent with SOAPBinding annotation:
@WebService
@SOAPBinding(
    style = SOAPBinding.Style.DOCUMENT,
    use = SOAPBinding.Use.LITERAL,
    parameterStyle = SOAPBinding.ParameterStyle.WRAPPED
)
public class OrderServiceImpl {
    // Methods map to operations in the binding
    @WebMethod(action = "http://example.com/orders/getOrder")
    public Order getOrder(String orderId) {
        return new Order(orderId);
    }
}`
        },
        {
          name: 'Service Section',
          explanation: 'Service specifies endpoint URLs. Contains one or more port elements. Each port references a binding and address. Multiple ports for different protocols or locations.',
          codeExample: `// WSDL Service section - endpoint configuration
// <service name="OrderService">
//
//   <!-- Primary SOAP endpoint -->
//   <port name="OrderServicePort"
//         binding="tns:OrderServiceSoapBinding">
//     <soap:address
//       location="http://api.example.com/ws/orders"/>
//   </port>
//
//   <!-- Secondary endpoint (e.g., internal network) -->
//   <port name="OrderServiceInternalPort"
//         binding="tns:OrderServiceSoapBinding">
//     <soap:address
//       location="http://internal.example.com:8080/ws/orders"/>
//   </port>
//
//   <!-- SOAP 1.2 endpoint -->
//   <port name="OrderServiceSoap12Port"
//         binding="tns:OrderServiceSoap12Binding">
//     <soap12:address
//       location="http://api.example.com/ws/orders/v12"/>
//   </port>
//
// </service>

// Accessing the service from Java client:
import javax.xml.ws.Service;
import javax.xml.namespace.QName;
import java.net.URL;

public class OrderClient {
    public static void main(String[] args) throws Exception {
        URL wsdlUrl = new URL(
            "http://api.example.com/ws/orders?wsdl");
        QName serviceName = new QName(
            "http://example.com/orders", "OrderService");

        Service service = Service.create(wsdlUrl, serviceName);

        // Get specific port by name
        QName portName = new QName(
            "http://example.com/orders", "OrderServicePort");
        OrderServicePortType port = service.getPort(
            portName, OrderServicePortType.class);

        Order order = port.getOrder("ORD-001");
    }
}`
        },
        {
          name: 'wsimport Tool',
          explanation: 'wsimport generates Java from WSDL. Creates service class, port interface, and DTOs. Options: -keep (keep sources), -s (source dir), -p (package). Part of JDK for JAX-WS development.',
          codeExample: `// wsimport command-line usage examples

// Basic usage - generate from remote WSDL
// wsimport http://localhost:8080/ws/orders?wsdl

// Generate with package name and keep source files
// wsimport -keep -s src/main/java
//          -p com.example.client.orders
//          http://localhost:8080/ws/orders?wsdl

// Generate from local WSDL file with verbose output
// wsimport -keep -s src/main/java
//          -d target/classes
//          -p com.example.generated
//          -verbose
//          src/main/resources/wsdl/orders.wsdl

// Maven plugin configuration for automated generation
// <plugin>
//   <groupId>com.sun.xml.ws</groupId>
//   <artifactId>jaxws-maven-plugin</artifactId>
//   <version>2.3.5</version>
//   <executions>
//     <execution>
//       <goals><goal>wsimport</goal></goals>
//       <configuration>
//         <wsdlDirectory>src/main/resources/wsdl</wsdlDirectory>
//         <wsdlFiles><wsdlFile>orders.wsdl</wsdlFile></wsdlFiles>
//         <packageName>com.example.generated</packageName>
//         <sourceDestDir>target/generated-sources</sourceDestDir>
//       </configuration>
//     </execution>
//   </executions>
// </plugin>

// Generated files structure:
// com.example.generated/
//   OrderService.java          (Service class)
//   OrderServicePortType.java  (Port interface)
//   Order.java                 (DTO)
//   GetOrderRequest.java       (Request wrapper)
//   GetOrderResponse.java      (Response wrapper)
//   ObjectFactory.java         (JAXB factory)
//   package-info.java          (Namespace info)`
        },
        {
          name: 'Apache CXF wsdl2java',
          explanation: 'wsdl2java is Apache CXF tool for code generation. More options than wsimport. Supports JAX-WS and JAX-RS. Better handling of complex schemas and custom bindings.',
          codeExample: `// Apache CXF wsdl2java command-line usage

// Basic generation from WSDL
// wsdl2java -d src/main/java
//           -p com.example.cxf.client
//           http://localhost:8080/ws/orders?wsdl

// Advanced options
// wsdl2java -d src/main/java
//           -p com.example.cxf.client
//           -client                    // Generate client code
//           -server                    // Generate server code
//           -impl                      // Generate impl skeleton
//           -frontend jaxws            // Use JAX-WS frontend
//           -databinding jaxb          // Use JAXB binding
//           -autoNameResolution        // Resolve name conflicts
//           orders.wsdl

// Maven plugin for Apache CXF code generation
// <plugin>
//   <groupId>org.apache.cxf</groupId>
//   <artifactId>cxf-codegen-plugin</artifactId>
//   <version>3.5.5</version>
//   <executions>
//     <execution>
//       <id>generate-sources</id>
//       <phase>generate-sources</phase>
//       <goals><goal>wsdl2java</goal></goals>
//       <configuration>
//         <wsdlOptions>
//           <wsdlOption>
//             <wsdl>src/main/resources/wsdl/orders.wsdl</wsdl>
//             <extraargs>
//               <extraarg>-p</extraarg>
//               <extraarg>com.example.generated</extraarg>
//               <extraarg>-client</extraarg>
//             </extraargs>
//           </wsdlOption>
//         </wsdlOptions>
//       </configuration>
//     </execution>
//   </executions>
// </plugin>

// Using CXF-generated client with Spring
// @Configuration
// public class SoapClientConfig {
//     @Bean
//     public OrderServicePortType orderClient() {
//         JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
//         factory.setServiceClass(OrderServicePortType.class);
//         factory.setAddress("http://api.example.com/ws/orders");
//         return (OrderServicePortType) factory.create();
//     }
// }`
        }
      ]
    },
    {
      id: 'soap-client-error-handling',
      name: 'SOAP Client & Error Handling',
      icon: '🔌',
      color: '#ef4444',
      description: 'Consuming SOAP services and handling faults',
      details: [
        {
          name: 'Client Overview',
          explanation: 'SOAP clients invoke web service operations by sending XML messages. JAX-WS clients can be generated from WSDL or created programmatically. Error handling in SOAP uses fault elements with structured error information. Clients must handle SOAPFaultException and network errors appropriately.',
          codeExample: `// Complete SOAP client example
import javax.xml.ws.Service;
import javax.xml.namespace.QName;
import javax.xml.ws.soap.SOAPFaultException;
import javax.xml.ws.WebServiceException;
import java.net.URL;

public class OrderServiceClient {

    private OrderServicePortType port;

    public OrderServiceClient(String wsdlUrl) throws Exception {
        URL url = new URL(wsdlUrl);
        QName serviceName = new QName(
            "http://example.com/orders", "OrderService");

        Service service = Service.create(url, serviceName);
        this.port = service.getPort(OrderServicePortType.class);
    }

    public Order getOrder(String orderId) {
        try {
            // Type-safe invocation via generated stub
            Order order = port.getOrder(orderId);
            System.out.println("Order: " + order.getOrderId()
                + " Status: " + order.getStatus());
            return order;

        } catch (SOAPFaultException e) {
            // Server returned a SOAP fault
            System.err.println("SOAP Fault: "
                + e.getFault().getFaultString());
            throw e;

        } catch (WebServiceException e) {
            // Network/transport error
            System.err.println("Connection error: "
                + e.getMessage());
            throw e;
        }
    }

    public static void main(String[] args) throws Exception {
        OrderServiceClient client = new OrderServiceClient(
            "http://localhost:8080/ws/orders?wsdl");
        Order order = client.getOrder("ORD-12345");
    }
}`
        },
        {
          name: 'Generated Client Stubs',
          explanation: 'Generated client stubs provide type-safe service access. Service class instantiation from WSDL. Port retrieval for making service calls. No manual XML parsing required.',
          codeExample: `// Using generated client stubs from wsimport
// Generated files after running:
// wsimport -keep -p com.example.client
//          http://localhost:8080/ws/users?wsdl

// Generated Service class (extends javax.xml.ws.Service)
// public class UserService extends Service {
//     public UserService(URL wsdlLocation, QName serviceName) {...}
//     public UserServicePortType getUserServicePort() {...}
// }

// Generated Port Interface
// public interface UserServicePortType {
//     User getUser(int userId);
//     List<User> getAllUsers();
//     String createUser(User user);
// }

// Generated DTO
// @XmlRootElement
// public class User {
//     private int id;
//     private String name;
//     private String email;
//     // getters/setters...
// }

// Using the generated stubs - clean, type-safe API
import com.example.client.UserService;
import com.example.client.UserServicePortType;
import com.example.client.User;

public class UserClient {
    public static void main(String[] args) throws Exception {
        // Instantiate generated service
        UserService service = new UserService();

        // Get the port (proxy)
        UserServicePortType port = service.getUserServicePort();

        // Call operations with type safety
        User user = port.getUser(42);
        System.out.println("Name: " + user.getName());
        System.out.println("Email: " + user.getEmail());

        // Create a new user
        User newUser = new User();
        newUser.setName("Bob Wilson");
        newUser.setEmail("bob@example.com");
        String userId = port.createUser(newUser);
    }
}`
        },
        {
          name: 'Service Instantiation',
          explanation: 'Create Service instance with WSDL URL and QName. Service class generated by wsimport. QName identifies service in namespace. Service manages connection and port creation.',
          codeExample: `// Service instantiation patterns
import javax.xml.ws.Service;
import javax.xml.namespace.QName;
import java.net.URL;

public class ServiceInstantiation {

    // Pattern 1: Create from WSDL URL and QName
    public static Service createFromWsdl() throws Exception {
        URL wsdlUrl = new URL(
            "http://localhost:8080/ws/payment?wsdl");
        QName serviceName = new QName(
            "http://example.com/payment",  // namespace
            "PaymentService"               // local part
        );
        return Service.create(wsdlUrl, serviceName);
    }

    // Pattern 2: Use generated service class directly
    public static PaymentService createGenerated()
            throws Exception {
        URL wsdlUrl = new URL(
            "http://localhost:8080/ws/payment?wsdl");
        // Generated service class handles QName internally
        return new PaymentService(wsdlUrl);
    }

    // Pattern 3: Create without WSDL (dispatch mode)
    public static Service createWithoutWsdl() {
        QName serviceName = new QName(
            "http://example.com/payment",
            "PaymentService"
        );
        // No WSDL - use Dispatch API for raw XML
        return Service.create(serviceName);
    }

    // Pattern 4: With custom WSDL location (file system)
    public static Service createFromLocalWsdl()
            throws Exception {
        URL wsdlUrl = Thread.currentThread()
            .getContextClassLoader()
            .getResource("wsdl/payment.wsdl");
        QName serviceName = new QName(
            "http://example.com/payment",
            "PaymentService"
        );
        return Service.create(wsdlUrl, serviceName);
    }
}`
        },
        {
          name: 'Port Retrieval',
          explanation: 'Get port (proxy) from Service for method calls. Port implements the service interface. Multiple ports for different endpoints. Port handles serialization and network calls.'
        },
        {
          name: 'SOAPFaultException',
          explanation: 'SOAPFaultException for service errors. Contains fault code, string, and detail. Thrown when service returns SOAP fault. Access fault information for error handling and logging.'
        },
        {
          name: 'WebServiceException',
          explanation: 'WebServiceException for client-side errors. Network failures, timeouts, configuration issues. Parent class for JAX-WS runtime exceptions. Catch for connection and transport errors.'
        },
        {
          name: 'Request/Response Handlers',
          explanation: 'Request/Response interceptors with handlers. SOAPHandler for full message access. Add headers, log messages, transform content. Handler chain configured in handler-chain.xml.'
        },
        {
          name: 'Timeout & Authentication',
          explanation: 'Timeout configuration for slow services. Set connect and request timeouts on binding provider. Authentication via WS-Security or HTTP headers. Configure credentials and security tokens.'
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
      stack.push({ name: 'SOAP Web Services', icon: '📡', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'SOAP Web Services', icon: '📡' })
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
          <h1 style={titleStyle}>SOAP Web Services</h1>
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
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
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

export default SOAP

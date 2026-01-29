import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

export default function SpringCoreQuestions({ onBack, breadcrumb }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const categoryColor = '#10b981'

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Dependency Injection and explain different types of DI in Spring',
      answer: `**Dependency Injection:**
A design pattern where objects receive their dependencies from external sources rather than creating them internally. Spring IoC container manages object creation and dependency injection.

**Types of Dependency Injection:**

**1. Constructor Injection:**
\`\`\`java
@Component
public class UserService {
    private final UserRepository userRepository;

    @Autowired  // Optional in Spring 4.3+
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
\`\`\`

**2. Setter Injection:**
\`\`\`java
@Component
public class OrderService {
    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
\`\`\`

**3. Field Injection:**
\`\`\`java
@Component
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
}
\`\`\`

**Best Practices:**
• **Prefer Constructor Injection**: Ensures immutability, makes dependencies explicit, easier to test
• **Use Setter Injection**: For optional dependencies
• **Avoid Field Injection**: Hard to test, hides dependencies, cannot be used outside Spring

**Constructor vs Setter:**
| Constructor | Setter |
|------------|--------|
| Required dependencies | Optional dependencies |
| Immutable objects | Mutable objects |
| Better testability | Circular dependency resolution |
| Fails fast | Partial initialization possible |`
    },
    {
      id: 2,
      category: 'Bean Lifecycle',
      difficulty: 'Hard',
      question: 'Explain Spring Bean lifecycle and callback methods',
      answer: `**Spring Bean Lifecycle:**

**1. Instantiation:**
Spring container instantiates the bean using constructor

**2. Populate Properties:**
Spring injects dependencies via setter methods or fields

**3. BeanNameAware:**
If implements BeanNameAware, Spring calls setBeanName()

**4. BeanFactoryAware:**
If implements BeanFactoryAware, Spring calls setBeanFactory()

**5. ApplicationContextAware:**
If implements ApplicationContextAware, Spring calls setApplicationContext()

**6. Pre-Initialization (BeanPostProcessor):**
postProcessBeforeInitialization() is called

**7. InitializingBean:**
If implements InitializingBean, afterPropertiesSet() is called

**8. Custom Init Method:**
If custom init-method is defined, it's called

**9. Post-Initialization (BeanPostProcessor):**
postProcessAfterInitialization() is called

**10. Bean Ready to Use**

**11. Destruction:**
When container shuts down:
- DisposableBean's destroy() method
- Custom destroy-method

**Implementation Example:**
\`\`\`java
@Component
public class LifecycleBean implements BeanNameAware,
                                       ApplicationContextAware,
                                       InitializingBean,
                                       DisposableBean {

    private String beanName;
    private ApplicationContext context;

    public LifecycleBean() {
        System.out.println("1. Constructor called");
    }

    @Override
    public void setBeanName(String name) {
        this.beanName = name;
        System.out.println("2. setBeanName: " + name);
    }

    @Override
    public void setApplicationContext(ApplicationContext context) {
        this.context = context;
        System.out.println("3. setApplicationContext");
    }

    @PostConstruct
    public void postConstruct() {
        System.out.println("4. @PostConstruct");
    }

    @Override
    public void afterPropertiesSet() {
        System.out.println("5. afterPropertiesSet");
    }

    @Bean(initMethod = "customInit")
    public void customInit() {
        System.out.println("6. customInit");
    }

    @PreDestroy
    public void preDestroy() {
        System.out.println("7. @PreDestroy");
    }

    @Override
    public void destroy() {
        System.out.println("8. destroy");
    }
}
\`\`\`

**BeanPostProcessor Example:**
\`\`\`java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        System.out.println("Before Init: " + beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        System.out.println("After Init: " + beanName);
        return bean;
    }
}
\`\`\``
    },
    {
      id: 3,
      category: 'Bean Scopes',
      difficulty: 'Medium',
      question: 'Explain different Bean scopes in Spring',
      answer: `**Bean Scopes in Spring:**

**1. Singleton (Default):**
One instance per Spring IoC container
\`\`\`java
@Component
@Scope("singleton")  // Default, can be omitted
public class SingletonBean {
    // Shared instance across application
}
\`\`\`

**2. Prototype:**
New instance created every time bean is requested
\`\`\`java
@Component
@Scope("prototype")
public class PrototypeBean {
    // New instance for each injection
}
\`\`\`

**3. Request (Web):**
One instance per HTTP request
\`\`\`java
@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST,
       proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestScopedBean {
    // New instance for each HTTP request
}
\`\`\`

**4. Session (Web):**
One instance per HTTP session
\`\`\`java
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION,
       proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionScopedBean {
    private String userId;
    // Shared within user session
}
\`\`\`

**5. Application (Web):**
One instance per ServletContext (entire web application)
\`\`\`java
@Component
@Scope(value = WebApplicationContext.SCOPE_APPLICATION,
       proxyMode = ScopedProxyMode.TARGET_CLASS)
public class ApplicationScopedBean {
    // Shared across entire web application
}
\`\`\`

**6. WebSocket (Web):**
One instance per WebSocket session
\`\`\`java
@Component
@Scope("websocket")
public class WebSocketScopedBean {
    // Scoped to WebSocket lifecycle
}
\`\`\`

**Singleton vs Prototype Comparison:**
| Singleton | Prototype |
|-----------|-----------|
| One instance per container | New instance per request |
| Thread-safe concerns | No sharing concerns |
| Default scope | Must be explicit |
| Spring manages full lifecycle | Spring doesn't call destroy |

**Scoped Proxy Example:**
Injecting shorter-lived bean into longer-lived bean
\`\`\`java
@Component
public class SingletonService {

    @Autowired
    private RequestScopedBean requestBean;  // Proxy injected

    public void processRequest() {
        // Each request gets different requestBean instance
        requestBean.doSomething();
    }
}
\`\`\`

**Custom Scope:**
\`\`\`java
public class ThreadScope implements Scope {
    private final ThreadLocal<Map<String, Object>> threadScope =
        ThreadLocal.withInitial(HashMap::new);

    @Override
    public Object get(String name, ObjectFactory<?> objectFactory) {
        Map<String, Object> scope = threadScope.get();
        return scope.computeIfAbsent(name,
            k -> objectFactory.getObject());
    }

    @Override
    public Object remove(String name) {
        return threadScope.get().remove(name);
    }

    // Other methods...
}

// Register custom scope
@Configuration
public class CustomScopeConfig {
    @Bean
    public BeanFactoryPostProcessor customScopeRegistrar() {
        return factory -> {
            factory.registerScope("thread", new ThreadScope());
        };
    }
}
\`\`\``
    }
  ]

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

      // Bullet points (lines starting with •)
      const bulletMatch = line.match(/^(\s*)•\s+(.+)$/)
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
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
            backgroundColor: categoryColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = categoryColor}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Spring Core Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid #374151`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestionId === q.id
                ? `0 0 0 4px ${categoryColor}20, 0 8px 16px rgba(0,0,0,0.3)`
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div
              onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: expandedQuestionId === q.id ? `${categoryColor}15` : 'transparent',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${getDifficultyColor(q.difficulty)}20`,
                    color: getDifficultyColor(q.difficulty),
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </span>
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  color: categoryColor,
                  transition: 'transform 0.3s ease',
                  transform: expandedQuestionId === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'inline-block'
                }}>
                  ▼
                </span>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#e2e8f0',
                margin: 0
              }}>
                {q.question}
              </h3>
            </div>

            {expandedQuestionId === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${categoryColor}20`,
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  whiteSpace: 'pre-wrap'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: `3px solid #374151`
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#93c5fd',
          marginBottom: '1rem'
        }}>
          💡 Best Practices
        </h3>
        <ul style={{
          fontSize: '1rem',
          textAlign: 'left',
          lineHeight: '2',
          color: '#d1d5db',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Prefer Constructor Injection</strong> for required dependencies (immutability, testability)</li>
          <li><strong>Use @PostConstruct and @PreDestroy</strong> for lifecycle callbacks instead of InitializingBean/DisposableBean</li>
          <li><strong>Singleton beans should be stateless</strong> or thread-safe</li>
          <li><strong>Use @Lazy</strong> to defer bean initialization until first use</li>
          <li><strong>Avoid circular dependencies</strong> - refactor using events, setter injection, or @Lazy</li>
          <li><strong>Use @Profile</strong> to load beans conditionally based on environment</li>
          <li><strong>Leverage @Conditional annotations</strong> for advanced bean loading control</li>
          <li><strong>Component scanning</strong> should be limited to specific packages for performance</li>
        </ul>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

export default function SpringBootQuestions({ onBack, breadcrumb }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const categoryColor = '#10b981'

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Spring Boot Auto-Configuration and how does it work',
      answer: `**Spring Boot Auto-Configuration:**
Automatically configures Spring application based on dependencies present in the classpath. Eliminates need for extensive XML or Java configuration.

**How It Works:**

**1. @SpringBootApplication:**
\`\`\`java
@SpringBootApplication  // Combines three annotations
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Equivalent to:
@SpringBootConfiguration  // @Configuration
@EnableAutoConfiguration
@ComponentScan
\`\`\`

**2. @EnableAutoConfiguration:**
Tells Spring Boot to automatically configure beans based on classpath
\`\`\`java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
}
\`\`\`

**3. spring.factories:**
Located in META-INF/spring.factories
\`\`\`properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
\`\`\`

**4. Conditional Annotations:**
\`\`\`java
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    @Bean
    @ConditionalOnProperty(name = "spring.datasource.url")
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }
}
\`\`\`

**Common Conditional Annotations:**
| Annotation | Condition |
|------------|-----------|
| @ConditionalOnClass | Class exists in classpath |
| @ConditionalOnMissingClass | Class not in classpath |
| @ConditionalOnBean | Bean exists |
| @ConditionalOnMissingBean | Bean doesn't exist |
| @ConditionalOnProperty | Property has specific value |
| @ConditionalOnResource | Resource exists |
| @ConditionalOnWebApplication | Web application |

**Exclude Auto-Configuration:**
\`\`\`java
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
public class Application {
}
\`\`\`

**Debug Auto-Configuration:**
\`\`\`properties
# application.properties
logging.level.org.springframework.boot.autoconfigure=DEBUG
# Or run with --debug flag
\`\`\`

**Custom Auto-Configuration:**
\`\`\`java
@Configuration
@ConditionalOnClass(MyService.class)
public class MyAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new MyService();
    }
}

// META-INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
com.example.MyAutoConfiguration
\`\`\``
    },
    {
      id: 2,
      category: 'Configuration',
      difficulty: 'Medium',
      question: 'Explain Spring Boot application.properties vs application.yml and property binding',
      answer: `**Configuration Files:**

**1. application.properties:**
\`\`\`properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
\`\`\`

**2. application.yml (Preferred):**
\`\`\`yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
\`\`\`

**Property Binding:**

**1. @Value:**
\`\`\`java
@Component
public class AppConfig {
    @Value("\${server.port}")
    private int port;

    @Value("\${app.name:MyApp}")  // Default value
    private String appName;

    @Value("#{\${app.max.users}}")
    private int maxUsers;
}
\`\`\`

**2. @ConfigurationProperties (Recommended):**
\`\`\`java
@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
    private String name;
    private Security security = new Security();
    private List<String> servers;

    public static class Security {
        private String username;
        private String password;
        private List<String> roles;

        // Getters and Setters
    }

    // Getters and Setters
}
\`\`\`

**YAML:**
\`\`\`yaml
app:
  name: MyApplication
  security:
    username: admin
    password: secret
    roles:
      - ADMIN
      - USER
  servers:
    - server1.example.com
    - server2.example.com
\`\`\`

**3. Using @ConfigurationProperties:**
\`\`\`java
@Service
public class MyService {
    private final AppProperties appProperties;

    public MyService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public void doSomething() {
        System.out.println(appProperties.getName());
        System.out.println(appProperties.getSecurity().getUsername());
    }
}
\`\`\`

**Profile-Specific Configuration:**
\`\`\`yaml
# application.yml (common)
app:
  name: MyApp

---
# application-dev.yml
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:mysql://localhost:3306/devdb

---
# application-prod.yml
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://prod-server:3306/proddb
\`\`\`

**Activate Profile:**
\`\`\`properties
# application.properties
spring.profiles.active=dev

# Or via command line
java -jar app.jar --spring.profiles.active=prod

# Or environment variable
export SPRING_PROFILES_ACTIVE=prod
\`\`\`

**Validation:**
\`\`\`java
@ConfigurationProperties(prefix = "app")
@Validated
@Component
public class AppProperties {

    @NotBlank
    private String name;

    @Min(1024)
    @Max(65535)
    private int port;

    @Email
    private String adminEmail;

    @Pattern(regexp = "^[A-Z]{2}$")
    private String countryCode;

    // Getters and Setters
}
\`\`\`

**External Configuration Priority:**
1. Command line arguments
2. SPRING_APPLICATION_JSON
3. ServletConfig init parameters
4. ServletContext init parameters
5. JNDI attributes
6. System properties
7. OS environment variables
8. Profile-specific properties (application-{profile}.properties)
9. Application properties (application.properties)
10. @PropertySource
11. Default properties`
    },
    {
      id: 3,
      category: 'Starters',
      difficulty: 'Easy',
      question: 'What are Spring Boot Starters and explain commonly used starters',
      answer: `**Spring Boot Starters:**
Dependency descriptors that provide all related dependencies for a specific functionality in one place. Simplify dependency management.

**Commonly Used Starters:**

**1. spring-boot-starter-web:**
For building web applications (REST APIs, MVC)
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`
Includes: Spring MVC, Tomcat (embedded), Jackson, Validation

**2. spring-boot-starter-data-jpa:**
For JPA-based data access
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
\`\`\`
Includes: Hibernate, Spring Data JPA, Spring ORM, Transaction API

**3. spring-boot-starter-security:**
For Spring Security
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
\`\`\`
Includes: Spring Security Core, Config, Web

**4. spring-boot-starter-test:**
For testing (already included in new projects)
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
\`\`\`
Includes: JUnit 5, Mockito, AssertJ, Hamcrest, Spring Test

**5. spring-boot-starter-actuator:**
Production-ready features (monitoring, metrics)
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

**6. spring-boot-starter-cache:**
For caching support
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
\`\`\`

**7. spring-boot-starter-validation:**
For Bean Validation
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`
Includes: Hibernate Validator

**8. spring-boot-starter-amqp:**
For RabbitMQ messaging
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
\`\`\`

**9. spring-boot-starter-mail:**
For email support
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
\`\`\`

**10. spring-boot-starter-redis:**
For Redis data access
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
\`\`\`

**Database Starters:**
\`\`\`xml
<!-- H2 Database -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- MySQL -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- PostgreSQL -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

**Custom Starter:**
\`\`\`xml
<!-- my-custom-spring-boot-starter -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>my-library</artifactId>
    </dependency>
</dependencies>
\`\`\`

**Naming Convention:**
- Official starters: \`spring-boot-starter-*\`
- Third-party: \`thirdparty-spring-boot-starter\`
- Custom: \`myproject-spring-boot-starter\`

**Benefits:**
• One-stop dependency management
• Version compatibility managed by Spring Boot
• Reduces configuration
• Easy to swap implementations (e.g., Tomcat to Jetty)`
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
          Spring Boot Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

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
                ? `0 0 0 4px ${categoryColor}40, 0 8px 16px rgba(0,0,0,0.3)`
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div
              onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: expandedQuestionId === q.id ? `${categoryColor}20` : 'transparent',
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
                borderTop: `2px solid ${categoryColor}40`,
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
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: `3px solid #374151`
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#93c5fd',
          marginBottom: '1rem'
        }}>
          Best Practices
        </h3>
        <ul style={{
          fontSize: '1rem',
          textAlign: 'left',
          lineHeight: '2',
          color: '#d1d5db',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Use @ConfigurationProperties</strong> instead of @Value for type-safe configuration</li>
          <li><strong>Externalize configuration</strong> - never hardcode values, use profiles</li>
          <li><strong>Use appropriate starters</strong> - avoid manual dependency management</li>
          <li><strong>Enable Actuator</strong> in production for monitoring and health checks</li>
          <li><strong>Use @SpringBootTest</strong> for integration tests, @WebMvcTest for controller tests</li>
          <li><strong>Set spring.profiles.active</strong> via environment variables, not in code</li>
          <li><strong>Use @ConditionalOnProperty</strong> to disable auto-configuration when needed</li>
          <li><strong>Package as executable JAR</strong> with embedded server for deployment</li>
          <li><strong>Use DevTools</strong> for development (automatic restart, LiveReload)</li>
          <li><strong>Follow 12-factor app principles</strong> for cloud-native applications</li>
        </ul>
      </div>
    </div>
  )
}

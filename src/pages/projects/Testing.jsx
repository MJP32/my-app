import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function Testing({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Parse code into sections
  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentCode = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      // Check for section headers (lines with ═ and ✦)
      if (line.includes('═══════') && lines[i + 1]?.includes('✦')) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentCode.join('\n')
          })
        }
        // Start new section
        const titleLine = lines[i + 1]
        currentSection = titleLine.replace(/\/\/\s*✦\s*/g, '').trim()
        currentCode = []
        continue
      }

      // Skip separator lines
      if (line.includes('═══════')) {
        continue
      }

      // Add code to current section
      if (currentSection) {
        currentCode.push(line)
      }
    }

    // Add last section
    if (currentSection && currentCode.length > 0) {
      sections.push({
        title: currentSection,
        code: currentCode.join('\n')
      })
    }

    return sections
  }

  const testingTopics = [
    {
      id: 1,
      name: 'Unit Testing (JUnit)',
      icon: '🔬',
      color: '#3b82f6',
      description: 'Fundamental unit testing with JUnit 5',
      content: {
        explanation: 'Unit testing validates individual components in isolation. JUnit 5 is the standard Java testing framework providing annotations, assertions, and lifecycle management. Unit tests should be fast, isolated, repeatable, and independent. Following the AAA pattern (Arrange-Act-Assert) ensures clear and maintainable tests.',
        keyPoints: [
          '@Test annotation marks test methods - methods must be non-static and return void',
          '@BeforeEach/@AfterEach run before/after each test method for setup and cleanup',
          '@BeforeAll/@AfterAll run once before/after all tests - must be static',
          'Assertions validate expected outcomes - assertEquals, assertTrue, assertThrows',
          'Parameterized tests (@ParameterizedTest) reduce code duplication',
          '@DisplayName provides readable test descriptions',
          'Nested tests (@Nested) group related tests logically',
          'Test lifecycle: @BeforeAll → @BeforeEach → @Test → @AfterEach → @AfterAll'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Basic Test Setup and Lifecycle
// ═══════════════════════════════════════════════════════════
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

  private Calculator calculator;

  @BeforeAll
  static void initAll() {
    System.out.println("Running Calculator tests");
  }

  @BeforeEach
  void init() {
    calculator = new Calculator();
  }

  @Test
  @DisplayName("Addition of two positive numbers")
  void testAddition() {
    // Arrange
    int a = 5;
    int b = 3;

    // Act
    int result = calculator.add(a, b);

    // Assert
    assertEquals(8, result, "5 + 3 should equal 8");
  }

  @Test
  void testDivision() {
    assertEquals(2, calculator.divide(10, 5));
    assertEquals(0, calculator.divide(0, 5));
  }

  // ═══════════════════════════════════════════════════════════
// ✦ Exception Testing
// ═══════════════════════════════════════════════════════════
  @Test
  void testDivisionByZero() {
    Exception exception = assertThrows(
      ArithmeticException.class,
      () -> calculator.divide(10, 0)
    );
    assertEquals("Division by zero", exception.getMessage());
  }

  // ═══════════════════════════════════════════════════════════
// ✦ Parameterized Tests
// ═══════════════════════════════════════════════════════════
  // Parameterized test
  @ParameterizedTest
  @ValueSource(ints = {1, 2, 3, 5, 8, 13})
  void testPositiveNumbers(int number) {
    assertTrue(number > 0);
  }

  @ParameterizedTest
  @CsvSource({
    "1, 1, 2",
    "2, 3, 5",
    "5, 5, 10"
  })
  void testAdditionWithCsv(int a, int b, int expected) {
    assertEquals(expected, calculator.add(a, b));
  }

  // ═══════════════════════════════════════════════════════════
// ✦ Nested Tests and Multiple Assertions
// ═══════════════════════════════════════════════════════════
  // Nested tests
  @Nested
  @DisplayName("Tests for multiplication")
  class MultiplicationTests {
    @Test
    void multiplyPositiveNumbers() {
      assertEquals(15, calculator.multiply(3, 5));
    }

    @Test
    void multiplyByZero() {
      assertEquals(0, calculator.multiply(5, 0));
    }
  }

  // Multiple assertions
  @Test
  void testAllOperations() {
    assertAll("calculator",
      () -> assertEquals(8, calculator.add(5, 3)),
      () -> assertEquals(2, calculator.subtract(5, 3)),
      () -> assertEquals(15, calculator.multiply(5, 3)),
      () -> assertEquals(1, calculator.divide(5, 3))
    );
  }

  @AfterEach
  void tearDown() {
    calculator = null;
  }

  @AfterAll
  static void tearDownAll() {
    System.out.println("All tests completed");
  }
}

// Output:
// Running Calculator tests
// All tests completed`
      }
    },
    {
      id: 2,
      name: 'Mocking (Mockito)',
      icon: '🎭',
      color: '#10b981',
      description: 'Mocking dependencies with Mockito',
      content: {
        explanation: 'Mockito creates test doubles for dependencies, enabling isolated unit testing. Mocks simulate real object behavior without actual implementations. Use @Mock for dependencies and @InjectMocks for the class under test. Stubbing defines mock behavior with when().thenReturn(), while verification confirms interactions with verify().',
        keyPoints: [
          '@Mock creates mock objects - simulated dependencies',
          '@InjectMocks automatically injects mocks into the test subject',
          'when().thenReturn() stubs method calls with predefined responses',
          'Argument matchers (any(), eq()) make stubbing flexible',
          'verify() confirms method calls happened with expected parameters',
          'doThrow() and doNothing() handle void methods',
          '@Spy creates partial mocks - real object with selective stubbing',
          '@MockBean integrates Mockito with Spring Boot tests'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Basic Mocking Setup and Stubbing
// ═══════════════════════════════════════════════════════════
import org.junit.jupiter.api.*;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private EmailService emailService;

  @InjectMocks
  private UserService userService;

  @Test
  void testCreateUser() {
    // Arrange
    User user = new User("john@example.com", "John Doe");
    when(userRepository.save(any(User.class)))
      .thenReturn(user);

    // Act
    User result = userService.createUser(user);

    // Assert
    assertEquals("john@example.com", result.getEmail());
    verify(userRepository).save(user);
    verify(emailService).sendWelcomeEmail(user.getEmail());
  }

  @Test
  void testFindUserById() {
    // Arrange
    User user = new User("john@example.com", "John Doe");
    when(userRepository.findById(1L))
      .thenReturn(Optional.of(user));

    // Act
    Optional<User> result = userService.findById(1L);

    // Assert
    assertTrue(result.isPresent());
    assertEquals("John Doe", result.get().getName());
    verify(userRepository, times(1)).findById(1L);
  }

  @Test
  void testFindUserNotFound() {
    when(userRepository.findById(999L))
      .thenReturn(Optional.empty());

    Optional<User> result = userService.findById(999L);

    assertFalse(result.isPresent());
    verify(userRepository).findById(999L);
    verify(emailService, never()).sendWelcomeEmail(anyString());
  }

  // ═══════════════════════════════════════════════════════════
// ✦ Argument Matchers and Void Methods
// ═══════════════════════════════════════════════════════════
  // Argument matchers
  @Test
  void testArgumentMatchers() {
    when(userRepository.findByEmail(anyString()))
      .thenReturn(Optional.of(new User()));

    userService.findByEmail("test@example.com");

    verify(userRepository).findByEmail(eq("test@example.com"));
  }

  // Stubbing void methods
  @Test
  void testDeleteUser() {
    doNothing().when(userRepository).deleteById(1L);

    userService.deleteUser(1L);

    verify(userRepository).deleteById(1L);
  }

  // Throwing exceptions
  @Test
  void testCreateUserWithException() {
    when(userRepository.save(any(User.class)))
      .thenThrow(new RuntimeException("Database error"));

    assertThrows(RuntimeException.class, () -> {
      userService.createUser(new User());
    });
  }

  // ═══════════════════════════════════════════════════════════
// ✦ Spies and Custom Argument Matchers
// ═══════════════════════════════════════════════════════════
  // Spy example
  @Test
  void testWithSpy() {
    List<String> realList = new ArrayList<>();
    List<String> spyList = spy(realList);

    spyList.add("one");
    spyList.add("two");

    verify(spyList).add("one");
    verify(spyList).add("two");
    assertEquals(2, spyList.size());
  }

  // Custom argument matcher
  @Test
  void testCustomArgumentMatcher() {
    when(userRepository.save(argThat(user ->
      user.getEmail().endsWith("@example.com")
    ))).thenReturn(new User());

    userService.createUser(
      new User("test@example.com", "Test")
    );

    verify(userRepository).save(any(User.class));
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Spring Boot MockBean Integration
// ═══════════════════════════════════════════════════════════
// Spring Boot test with @MockBean
@SpringBootTest
class UserControllerIntegrationTest {

  @MockBean
  private UserService userService;

  @Autowired
  private MockMvc mockMvc;

  @Test
  void testGetUser() throws Exception {
    User user = new User("john@example.com", "John");
    when(userService.findById(1L))
      .thenReturn(Optional.of(user));

    mockMvc.perform(get("/api/users/1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.name").value("John"));
  }
}`
      }
    },
    {
      id: 3,
      name: 'Integration Testing',
      icon: '🔗',
      color: '#f59e0b',
      description: 'Testing component interactions',
      content: {
        explanation: 'Integration tests verify that multiple components work together correctly. Spring Boot provides @SpringBootTest for full application context testing, @WebMvcTest for controller layer testing, and @DataJpaTest for repository testing. Testcontainers provide real database instances for realistic integration tests.',
        keyPoints: [
          '@SpringBootTest loads full application context for integration tests',
          '@WebMvcTest tests only MVC layer with minimal context',
          '@DataJpaTest configures in-memory database for repository testing',
          'MockMvc simulates HTTP requests without starting server',
          'TestRestTemplate makes real HTTP calls to running server',
          'Testcontainers provide disposable database instances',
          '@DirtiesContext resets application context between tests',
          'Test profiles isolate test configuration'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Full Integration Test with MockMvc
// ═══════════════════════════════════════════════════════════
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.*;
import org.springframework.test.web.servlet.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Full integration test
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private UserRepository userRepository;

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
  }

  @Test
  void testCreateUser() throws Exception {
    String userJson = "{\\"email\\":\\"test@example.com\\",\\"name\\":\\"Test\\"}";

    mockMvc.perform(post("/api/users")
        .contentType(MediaType.APPLICATION_JSON)
        .content(userJson))
      .andExpect(status().isCreated())
      .andExpect(jsonPath("$.email").value("test@example.com"))
      .andExpect(jsonPath("$.name").value("Test"));

    assertEquals(1, userRepository.count());
  }

  @Test
  void testGetAllUsers() throws Exception {
    userRepository.save(new User("user1@example.com", "User 1"));
    userRepository.save(new User("user2@example.com", "User 2"));

    mockMvc.perform(get("/api/users"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$.length()").value(2));
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Repository and Controller Layer Testing
// ═══════════════════════════════════════════════════════════
// Repository testing
@DataJpaTest
class UserRepositoryTest {

  @Autowired
  private TestEntityManager entityManager;

  @Autowired
  private UserRepository userRepository;

  @Test
  void testFindByEmail() {
    User user = new User("test@example.com", "Test User");
    entityManager.persist(user);
    entityManager.flush();

    Optional<User> found = userRepository.findByEmail("test@example.com");

    assertTrue(found.isPresent());
    assertEquals("Test User", found.get().getName());
  }

  @Test
  void testFindByNameContaining() {
    entityManager.persist(new User("john@example.com", "John Doe"));
    entityManager.persist(new User("jane@example.com", "Jane Doe"));
    entityManager.flush();

    List<User> users = userRepository.findByNameContaining("Doe");

    assertEquals(2, users.size());
  }
}

// Controller layer testing
@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @Test
  void testGetUser() throws Exception {
    User user = new User("john@example.com", "John");
    when(userService.findById(1L)).thenReturn(Optional.of(user));

    mockMvc.perform(get("/api/users/1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.name").value("John"));
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Testcontainers and Real Database Testing
// ═══════════════════════════════════════════════════════════
// Testcontainers integration
@SpringBootTest
@Testcontainers
class UserRepositoryContainerTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
    "postgres:15-alpine"
  )
    .withDatabaseName("testdb")
    .withUsername("test")
    .withPassword("test");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired
  private UserRepository userRepository;

  @Test
  void testSaveUser() {
    User user = new User("test@example.com", "Test");
    User saved = userRepository.save(user);

    assertNotNull(saved.getId());
    assertEquals("test@example.com", saved.getEmail());
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ TestRestTemplate and End-to-End API Testing
// ═══════════════════════════════════════════════════════════
// TestRestTemplate example
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserApiIntegrationTest {

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  void testCreateAndGetUser() {
    User user = new User("test@example.com", "Test");

    ResponseEntity<User> createResponse = restTemplate.postForEntity(
      "/api/users",
      user,
      User.class
    );

    assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
    Long userId = createResponse.getBody().getId();

    ResponseEntity<User> getResponse = restTemplate.getForEntity(
      "/api/users/" + userId,
      User.class
    );

    assertEquals(HttpStatus.OK, getResponse.getStatusCode());
    assertEquals("Test", getResponse.getBody().getName());
  }
}`
      }
    },
    {
      id: 4,
      name: 'Test-Driven Development',
      icon: '🔴🟢',
      color: '#8b5cf6',
      description: 'Red-Green-Refactor cycle',
      content: {
        explanation: 'Test-Driven Development (TDD) writes tests before implementation code. The Red-Green-Refactor cycle: write a failing test (Red), write minimal code to pass (Green), then improve code quality (Refactor). TDD drives better design, ensures testable code, and provides living documentation. Start with the simplest test case and incrementally add complexity.',
        keyPoints: [
          'Red: Write a failing test that defines desired behavior',
          'Green: Write minimal code to make the test pass',
          'Refactor: Improve code quality while keeping tests green',
          'Write only enough code to pass the current test',
          'Tests drive design - write testable, loosely coupled code',
          'Start with simplest case, add complexity incrementally',
          'Refactor both production and test code',
          'TDD provides regression protection and living documentation'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Red Phase - Initial Failing Tests
// ═══════════════════════════════════════════════════════════
// TDD Example: Building a Stack class

// Step 1: RED - Write failing test
@Test
void newStackShouldBeEmpty() {
  Stack<Integer> stack = new Stack<>();
  assertTrue(stack.isEmpty());
}
// Compilation fails - Stack doesn't exist

// Step 2: GREEN - Minimal code to pass
public class Stack<T> {
  public boolean isEmpty() {
    return true;  // Hardcoded to pass
  }
}
// Test passes ✅

// Step 3: RED - Add test for push
@Test
void pushShouldAddElement() {
  Stack<Integer> stack = new Stack<>();
  stack.push(1);
  assertFalse(stack.isEmpty());
}
// Test fails - push() doesn't exist

// Step 4: GREEN - Implement push
public class Stack<T> {
  private List<T> elements = new ArrayList<>();

  public void push(T element) {
    elements.add(element);
  }

  public boolean isEmpty() {
    return elements.isEmpty();  // Now proper implementation
  }
}
// Tests pass ✅

// Step 5: RED - Test pop
@Test
void popShouldRemoveAndReturnLastElement() {
  Stack<Integer> stack = new Stack<>();
  stack.push(1);
  stack.push(2);

  assertEquals(2, stack.pop());
  assertEquals(1, stack.pop());
}
// Test fails - pop() doesn't exist

// Step 6: GREEN - Implement pop
public class Stack<T> {
  private List<T> elements = new ArrayList<>();

  public void push(T element) {
    elements.add(element);
  }

  public T pop() {
    if (isEmpty()) {
      throw new IllegalStateException("Stack is empty");
    }
    return elements.remove(elements.size() - 1);
  }

  public boolean isEmpty() {
    return elements.isEmpty();
  }
}
// Tests pass ✅

// ═══════════════════════════════════════════════════════════
// ✦ Edge Cases and Error Handling
// ═══════════════════════════════════════════════════════════
// Step 7: RED - Test pop on empty stack
@Test
void popOnEmptyStackShouldThrowException() {
  Stack<Integer> stack = new Stack<>();

  assertThrows(IllegalStateException.class, () -> stack.pop());
}
// Test passes (already implemented) ✅

// ═══════════════════════════════════════════════════════════
// ✦ Refactor Phase - Complete Implementation
// ═══════════════════════════════════════════════════════════
// Step 8: REFACTOR - Improve design
public class Stack<T> {
  private final List<T> elements;

  public Stack() {
    this.elements = new ArrayList<>();
  }

  public void push(T element) {
    if (element == null) {
      throw new IllegalArgumentException("Cannot push null");
    }
    elements.add(element);
  }

  public T pop() {
    if (isEmpty()) {
      throw new IllegalStateException("Cannot pop from empty stack");
    }
    return elements.remove(elements.size() - 1);
  }

  public T peek() {
    if (isEmpty()) {
      throw new IllegalStateException("Cannot peek empty stack");
    }
    return elements.get(elements.size() - 1);
  }

  public boolean isEmpty() {
    return elements.isEmpty();
  }

  public int size() {
    return elements.size();
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Complete Test Suite
// ═══════════════════════════════════════════════════════════
// Complete test suite
class StackTest {
  private Stack<Integer> stack;

  @BeforeEach
  void setUp() {
    stack = new Stack<>();
  }

  @Test
  void newStackShouldBeEmpty() {
    assertTrue(stack.isEmpty());
    assertEquals(0, stack.size());
  }

  @Test
  void pushShouldAddElement() {
    stack.push(1);
    assertFalse(stack.isEmpty());
    assertEquals(1, stack.size());
  }

  @Test
  void popShouldRemoveAndReturnLastElement() {
    stack.push(1);
    stack.push(2);

    assertEquals(2, stack.pop());
    assertEquals(1, stack.size());
    assertEquals(1, stack.pop());
    assertTrue(stack.isEmpty());
  }

  @Test
  void peekShouldReturnWithoutRemoving() {
    stack.push(1);
    assertEquals(1, stack.peek());
    assertEquals(1, stack.size());
  }

  @Test
  void popOnEmptyStackShouldThrowException() {
    assertThrows(IllegalStateException.class, () -> stack.pop());
  }

  @Test
  void pushNullShouldThrowException() {
    assertThrows(IllegalArgumentException.class, () -> stack.push(null));
  }
}

// TDD Benefits demonstrated:
// 1. Each feature driven by a test
// 2. Incremental development
// 3. Comprehensive test coverage
// 4. Tests as documentation
// 5. Confidence in refactoring`
      }
    },
    {
      id: 5,
      name: 'BDD with Cucumber',
      icon: '📝',
      color: '#ec4899',
      description: 'Behavior-Driven Development',
      content: {
        explanation: 'Behavior-Driven Development (BDD) uses natural language specifications to describe application behavior. Cucumber interprets Gherkin syntax (Given-When-Then) feature files and maps them to step definitions. BDD bridges communication between developers, testers, and business stakeholders. Focus on behavior rather than implementation details.',
        keyPoints: [
          'Feature files describe behavior in plain English using Gherkin',
          'Given-When-Then structure: Given (context), When (action), Then (outcome)',
          'Step definitions map Gherkin steps to Java code',
          'Scenario Outline enables data-driven testing',
          'Cucumber hooks (@Before, @After) manage test lifecycle',
          'Data tables pass structured data to step definitions',
          'BDD focuses on business value and acceptance criteria',
          'Living documentation - feature files document system behavior'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Gherkin Feature Files and Scenarios
// ═══════════════════════════════════════════════════════════
// Feature file: user_registration.feature
/*
Feature: User Registration
  As a new user
  I want to register for an account
  So that I can access the application

  Scenario: Successful registration with valid details
    Given I am on the registration page
    When I enter email "john@example.com"
    And I enter password "SecurePass123"
    And I click the register button
    Then I should see a success message
    And I should receive a welcome email

  Scenario: Registration with existing email
    Given a user exists with email "existing@example.com"
    When I try to register with email "existing@example.com"
    Then I should see an error "Email already registered"

  Scenario Outline: Invalid registration attempts
    When I register with email "<email>" and password "<password>"
    Then I should see error "<error>"

    Examples:
      | email           | password  | error                    |
      | invalid-email   | Pass123   | Invalid email format     |
      | test@test.com   | short     | Password too short       |
      | test@test.com   |           | Password is required     |
*/

// ═══════════════════════════════════════════════════════════
// ✦ Step Definitions Implementation
// ═══════════════════════════════════════════════════════════
// Step Definitions
import io.cucumber.java.en.*;
import static org.junit.jupiter.api.Assertions.*;

public class RegistrationSteps {

  private RegistrationPage registrationPage;
  private User currentUser;
  private String errorMessage;

  @Given("I am on the registration page")
  public void navigateToRegistrationPage() {
    registrationPage = new RegistrationPage();
    registrationPage.open();
  }

  @Given("a user exists with email {string}")
  public void createExistingUser(String email) {
    User existingUser = new User(email, "password123");
    userRepository.save(existingUser);
  }

  @When("I enter email {string}")
  public void enterEmail(String email) {
    registrationPage.enterEmail(email);
  }

  @When("I enter password {string}")
  public void enterPassword(String password) {
    registrationPage.enterPassword(password);
  }

  @When("I click the register button")
  public void clickRegister() {
    registrationPage.clickRegister();
  }

  @When("I try to register with email {string}")
  public void registerWithEmail(String email) {
    enterEmail(email);
    enterPassword("Password123");
    clickRegister();
  }

  @When("I register with email {string} and password {string}")
  public void registerWithCredentials(String email, String password) {
    enterEmail(email);
    enterPassword(password);
    clickRegister();
  }

  @Then("I should see a success message")
  public void verifySuccessMessage() {
    assertTrue(registrationPage.hasSuccessMessage());
  }

  @Then("I should receive a welcome email")
  public void verifyWelcomeEmail() {
    // Check email was sent (mock or test email service)
    verify(emailService).sendWelcomeEmail(anyString());
  }

  @Then("I should see an error {string}")
  public void verifyError(String expectedError) {
    String actualError = registrationPage.getErrorMessage();
    assertEquals(expectedError, actualError);
  }

  @Then("I should see error {string}")
  public void verifyErrorMessage(String expectedError) {
    assertTrue(registrationPage.hasError(expectedError));
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Cucumber Hooks and Lifecycle
// ═══════════════════════════════════════════════════════════
// Cucumber hooks
import io.cucumber.java.*;

public class Hooks {

  @Before
  public void setUp() {
    // Initialize test environment
    System.out.println("Setting up test environment");
    DatabaseHelper.cleanDatabase();
  }

  @After
  public void tearDown() {
    // Cleanup
    System.out.println("Cleaning up");
    DatabaseHelper.cleanDatabase();
  }

  @Before("@integration")
  public void setUpIntegration() {
    // Special setup for integration tests
    TestContainer.start();
  }

  @After("@integration")
  public void tearDownIntegration() {
    TestContainer.stop();
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Data Tables and Test Runner
// ═══════════════════════════════════════════════════════════
// Data Tables example
/*
Scenario: Create multiple users
  When I create users with the following details:
    | email              | name        | role  |
    | admin@example.com  | Admin User  | ADMIN |
    | user@example.com   | Regular User| USER  |
  Then 2 users should be created
*/

@When("I create users with the following details:")
public void createUsers(io.cucumber.datatable.DataTable dataTable) {
  List<Map<String, String>> users = dataTable.asMaps();

  for (Map<String, String> userData : users) {
    User user = new User(
      userData.get("email"),
      userData.get("name"),
      Role.valueOf(userData.get("role"))
    );
    userService.createUser(user);
  }
}

@Then("{int} users should be created")
public void verifyUserCount(int expectedCount) {
  assertEquals(expectedCount, userRepository.count());
}

// CucumberTest runner
@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME,
  value = "pretty, html:target/cucumber-reports.html")
public class CucumberTest {
}`
      }
    },
    {
      id: 6,
      name: 'Performance Testing',
      icon: '⚡',
      color: '#06b6d4',
      description: 'Load and performance testing',
      content: {
        explanation: 'Performance testing validates system behavior under load. Load testing simulates expected user load, stress testing finds breaking points, spike testing handles sudden load increases, and endurance testing checks long-term stability. Key metrics include throughput (requests/second), latency (response time), and error rate. Establish baselines and SLAs before testing.',
        keyPoints: [
          'Load testing validates performance under expected load',
          'Stress testing finds system breaking point',
          'Spike testing validates sudden load increase handling',
          'Endurance/soak testing checks long-term stability',
          'Key metrics: throughput, latency (p50, p95, p99), error rate',
          'JMeter for comprehensive load testing with GUI',
          'Gatling for code-based performance tests',
          'JMH for micro-benchmarking Java code'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ JMeter Load Testing Configuration
// ═══════════════════════════════════════════════════════════
// JMeter Test Plan (jmx file concept)
/*
Thread Group:
  - Number of Threads: 100
  - Ramp-Up Period: 10 seconds
  - Loop Count: 10

HTTP Request:
  - Method: POST
  - Path: /api/users
  - Body: {"email": "user\${__threadNum}@test.com", "name": "User \${__threadNum}"}

Assertions:
  - Response Code: 201
  - Response Time: < 500ms

Listeners:
  - Aggregate Report
  - View Results Tree
  - Response Time Graph
*/

// ═══════════════════════════════════════════════════════════
// ✦ Gatling Performance Test Framework
// ═══════════════════════════════════════════════════════════
// Gatling Performance Test (Scala-like syntax)
import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class UserApiSimulation extends Simulation {

  HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://localhost:8080")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  ScenarioBuilder scn = scenario("User API Load Test")
    .exec(
      http("Create User")
        .post("/api/users")
        .body(StringBody(
          "{\\"email\\":\\"user#{__UUID}@test.com\\",\\"name\\":\\"User\\"}"
        ))
        .check(status().is(201))
        .check(responseTimeInMillis().lt(500))
    )
    .pause(1)
    .exec(
      http("Get Users")
        .get("/api/users")
        .check(status().is(200))
    );

  {
    setUp(
      scn.injectOpen(
        rampUsers(100).during(30),      // Ramp to 100 users in 30s
        constantUsersPerSec(10).during(60)  // 10 users/sec for 60s
      )
    ).protocols(httpProtocol)
     .assertions(
       global().responseTime().max().lt(1000),
       global().successfulRequests().percent().gt(95.0)
     );
  }
}

// Run Gatling test
// mvn gatling:test

// ═══════════════════════════════════════════════════════════
// ✦ JMH Micro-Benchmarking
// ═══════════════════════════════════════════════════════════
// JMH Micro-benchmarking
import org.openjdk.jmh.annotations.*;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Fork(value = 2, warmups = 1)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
public class StringConcatenationBenchmark {

  @Param({"10", "100", "1000"})
  private int size;

  @Benchmark
  public String stringConcat() {
    String result = "";
    for (int i = 0; i < size; i++) {
      result += "a";
    }
    return result;
  }

  @Benchmark
  public String stringBuilder() {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < size; i++) {
      sb.append("a");
    }
    return sb.toString();
  }
}

// Run: mvn jmh:run

// ═══════════════════════════════════════════════════════════
// ✦ Spring Boot Performance Testing
// ═══════════════════════════════════════════════════════════
// Performance Test Assertions
@Test
@Timeout(value = 5, unit = TimeUnit.SECONDS)
void testPerformance() {
  long start = System.currentTimeMillis();

  for (int i = 0; i < 10000; i++) {
    userService.findById((long) i);
  }

  long duration = System.currentTimeMillis() - start;
  assertTrue(duration < 3000, "Should complete in under 3 seconds");
}

// Spring Boot performance test
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class PerformanceTest {

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  void loadTest() throws InterruptedException {
    int threads = 50;
    int requestsPerThread = 100;

    ExecutorService executor = Executors.newFixedThreadPool(threads);
    CountDownLatch latch = new CountDownLatch(threads * requestsPerThread);
    AtomicInteger successCount = new AtomicInteger(0);

    long startTime = System.currentTimeMillis();

    for (int i = 0; i < threads; i++) {
      executor.submit(() -> {
        for (int j = 0; j < requestsPerThread; j++) {
          ResponseEntity<String> response =
            restTemplate.getForEntity("/api/users", String.class);

          if (response.getStatusCode() == HttpStatus.OK) {
            successCount.incrementAndGet();
          }
          latch.countDown();
        }
      });
    }

    latch.await();
    long duration = System.currentTimeMillis() - startTime;
    executor.shutdown();

    int totalRequests = threads * requestsPerThread;
    double throughput = totalRequests / (duration / 1000.0);
    double successRate = (successCount.get() / (double) totalRequests) * 100;

    System.out.println("Total Requests: " + totalRequests);
    System.out.println("Duration: " + duration + "ms");
    System.out.println("Throughput: " + throughput + " req/sec");
    System.out.println("Success Rate: " + successRate + "%");

    assertTrue(successRate > 95, "Success rate should be > 95%");
    assertTrue(throughput > 100, "Throughput should be > 100 req/sec");
  }
}`
      }
    },
    {
      id: 7,
      name: 'Contract Testing',
      icon: '🤝',
      color: '#84cc16',
      description: 'API contract verification',
      content: {
        explanation: 'Contract testing validates API contracts between services. Consumer-driven contracts (Pact) let consumers define expectations, then verify providers meet them. Unlike integration tests that test actual integrations, contract tests verify communication protocols independently. Spring Cloud Contract generates tests from contract definitions. Contract testing prevents breaking changes in microservices.',
        keyPoints: [
          'Consumer-driven contracts - consumers define API expectations',
          'Pact generates provider verification tests from consumer tests',
          'Contracts serve as API documentation and validation',
          'Tests run independently - no need for running services',
          'Detect breaking changes before deployment',
          'Faster than full integration tests',
          'Spring Cloud Contract for Spring Boot applications',
          'Contract testing complements integration testing'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Pact Consumer Testing
// ═══════════════════════════════════════════════════════════
// Pact Consumer Test
import au.com.dius.pact.consumer.*;
import au.com.dius.pact.consumer.dsl.*;
import au.com.dius.pact.consumer.junit5.*;
import au.com.dius.pact.core.model.*;

@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "UserProvider")
class UserConsumerPactTest {

  @Pact(consumer = "UserConsumer")
  public RequestResponsePact createPact(PactDslWithProvider builder) {
    return builder
      .given("user exists")
      .uponReceiving("a request for user by id")
        .path("/api/users/1")
        .method("GET")
      .willRespondWith()
        .status(200)
        .headers(Map.of("Content-Type", "application/json"))
        .body(new PactDslJsonBody()
          .stringValue("email", "john@example.com")
          .stringValue("name", "John Doe")
          .numberValue("id", 1)
        )
      .toPact();
  }

  @Test
  @PactTestFor(pactMethod = "createPact")
  void testGetUser(MockServer mockServer) {
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<User> response = restTemplate.getForEntity(
      mockServer.getUrl() + "/api/users/1",
      User.class
    );

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("John Doe", response.getBody().getName());
    assertEquals("john@example.com", response.getBody().getEmail());
  }

  @Pact(consumer = "UserConsumer")
  public RequestResponsePact createUserPact(PactDslWithProvider builder) {
    return builder
      .given("no user exists")
      .uponReceiving("a request to create user")
        .path("/api/users")
        .method("POST")
        .body(new PactDslJsonBody()
          .stringValue("email", "new@example.com")
          .stringValue("name", "New User")
        )
      .willRespondWith()
        .status(201)
        .body(new PactDslJsonBody()
          .numberValue("id", 2)
          .stringValue("email", "new@example.com")
          .stringValue("name", "New User")
        )
      .toPact();
  }

  @Test
  @PactTestFor(pactMethod = "createUserPact")
  void testCreateUser(MockServer mockServer) {
    RestTemplate restTemplate = new RestTemplate();
    User newUser = new User("new@example.com", "New User");

    ResponseEntity<User> response = restTemplate.postForEntity(
      mockServer.getUrl() + "/api/users",
      newUser,
      User.class
    );

    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertEquals(2, response.getBody().getId());
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Pact Provider Verification
// ═══════════════════════════════════════════════════════════
// Pact Provider Verification
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Provider("UserProvider")
@PactFolder("pacts")
class UserProviderPactTest {

  @LocalServerPort
  private int port;

  @TestTemplate
  @ExtendWith(PactVerificationInvocationContextProvider.class)
  void pactVerificationTestTemplate(PactVerificationContext context) {
    context.verifyInteraction();
  }

  @BeforeEach
  void setUp(PactVerificationContext context) {
    context.setTarget(new HttpTestTarget("localhost", port));
  }

  @State("user exists")
  void userExists() {
    // Set up test data
    userRepository.save(new User(1L, "john@example.com", "John Doe"));
  }

  @State("no user exists")
  void noUserExists() {
    // Clean database
    userRepository.deleteAll();
  }
}

// ═══════════════════════════════════════════════════════════
// ✦ Spring Cloud Contract
// ═══════════════════════════════════════════════════════════
// Spring Cloud Contract (Groovy DSL)
/*
// contract.groovy
import org.springframework.cloud.contract.spec.Contract

Contract.make {
    description "should return user by id"
    request {
        method GET()
        url "/api/users/1"
    }
    response {
        status 200
        headers {
            contentType applicationJson()
        }
        body([
            id: 1,
            email: "john@example.com",
            name: "John Doe"
        ])
    }
}
*/

// Generated Base Test Class
@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
@AutoConfigureMockMvc
public abstract class BaseContractTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @BeforeEach
  void setUp() {
    User user = new User(1L, "john@example.com", "John Doe");
    when(userService.findById(1L)).thenReturn(Optional.of(user));
  }

  protected RestAssuredMockMvc getMockMvc() {
    return RestAssuredMockMvc.mockMvc(mockMvc);
  }
}

// Contract verification automatically generated
// Run: mvn spring-cloud-contract:generateTests

// ═══════════════════════════════════════════════════════════
// ✦ Schema Validation with REST Assured
// ═══════════════════════════════════════════════════════════
// Schema validation with REST Assured
@Test
void testUserResponseSchema() {
  given()
    .when()
      .get("/api/users/1")
    .then()
      .statusCode(200)
      .body(matchesJsonSchemaInClasspath("schemas/user-schema.json"));
}

/*
// user-schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "email", "name"],
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" },
    "name": { "type": "string", "minLength": 1 }
  }
}
*/`
      }
    },
    {
      id: 8,
      name: 'Test Automation & CI/CD',
      icon: '🤖',
      color: '#ef4444',
      description: 'Automated testing in pipelines',
      content: {
        explanation: 'Test automation integrates tests into CI/CD pipelines for continuous validation. Maven Surefire runs unit tests, Failsafe runs integration tests. Parallel execution speeds up test suites. Test reports (JaCoCo for coverage) provide visibility. Tag-based execution (@Tag) allows selective test runs. Mutation testing (PIT) validates test quality by mutating code and verifying tests fail.',
        keyPoints: [
          'Surefire plugin runs unit tests during Maven build',
          'Failsafe plugin runs integration tests in separate phase',
          'Parallel execution reduces test suite duration',
          'JaCoCo measures code coverage - aim for 80%+ on critical code',
          '@Tag enables selective test execution (smoke, integration, slow)',
          'Mutation testing validates test effectiveness',
          'Flaky tests undermine CI/CD - identify and fix',
          'Testing pyramid: many unit tests, fewer integration tests, minimal E2E'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════
// ✦ Maven Plugin Configuration
// ═══════════════════════════════════════════════════════════
// pom.xml - Maven Surefire configuration
/*
<build>
  <plugins>
    <!-- Unit tests -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.0.0</version>
      <configuration>
        <parallel>methods</parallel>
        <threadCount>4</threadCount>
        <excludedGroups>slow,integration</excludedGroups>
        <includes>
          <include>**/*Test.java</include>
        </includes>
      </configuration>
    </plugin>

    <!-- Integration tests -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-failsafe-plugin</artifactId>
      <version>3.0.0</version>
      <configuration>
        <includes>
          <include>**/*IT.java</include>
          <include>**/*IntegrationTest.java</include>
        </includes>
      </configuration>
      <executions>
        <execution>
          <goals>
            <goal>integration-test</goal>
            <goal>verify</goal>
          </goals>
        </execution>
      </executions>
    </plugin>

    <!-- Code coverage -->
    <plugin>
      <groupId>org.jacoco</groupId>
      <artifactId>jacoco-maven-plugin</artifactId>
      <version>0.8.10</version>
      <executions>
        <execution>
          <goals>
            <goal>prepare-agent</goal>
          </goals>
        </execution>
        <execution>
          <id>report</id>
          <phase>test</phase>
          <goals>
            <goal>report</goal>
          </goals>
        </execution>
        <execution>
          <id>jacoco-check</id>
          <goals>
            <goal>check</goal>
          </goals>
          <configuration>
            <rules>
              <rule>
                <element>PACKAGE</element>
                <limits>
                  <limit>
                    <counter>LINE</counter>
                    <value>COVEREDRATIO</value>
                    <minimum>0.80</minimum>
                  </limit>
                </limits>
              </rule>
            </rules>
          </configuration>
        </execution>
      </executions>
    </plugin>

    <!-- Mutation testing -->
    <plugin>
      <groupId>org.pitest</groupId>
      <artifactId>pitest-maven</artifactId>
      <version>1.14.2</version>
      <configuration>
        <targetClasses>
          <param>com.example.service.*</param>
        </targetClasses>
        <targetTests>
          <param>com.example.service.*Test</param>
        </targetTests>
        <mutationThreshold>80</mutationThreshold>
      </configuration>
    </plugin>
  </plugins>
</build>
*/

// ═══════════════════════════════════════════════════════════
// ✦ Tag-Based Test Execution
// ═══════════════════════════════════════════════════════════
// Tag-based test execution
@Test
@Tag("unit")
void fastUnitTest() {
  assertEquals(2, 1 + 1);
}

@Test
@Tag("integration")
@Tag("slow")
void slowIntegrationTest() {
  // Takes several seconds
}

@Test
@Tag("smoke")
void criticalSmokeTest() {
  // Essential functionality
}

// Run specific tags
// mvn test -Dgroups="unit"
// mvn test -Dgroups="smoke"
// mvn test -DexcludedGroups="slow"

// ═══════════════════════════════════════════════════════════
// ✦ CI/CD Pipeline Configuration
// ═══════════════════════════════════════════════════════════
// CI/CD Pipeline (.github/workflows/ci.yml)
/*
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: maven

    - name: Run unit tests
      run: mvn test

    - name: Run integration tests
      run: mvn verify

    - name: Generate coverage report
      run: mvn jacoco:report

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./target/site/jacoco/jacoco.xml

    - name: Publish test results
      uses: dorny/test-reporter@v1
      if: always()
      with:
        name: Test Results
        path: target/surefire-reports/*.xml
        reporter: java-junit
*/

// ═══════════════════════════════════════════════════════════
// ✦ Parallel Testing and Advanced Configuration
// ═══════════════════════════════════════════════════════════
// Parallel test execution
@Execution(ExecutionMode.CONCURRENT)
class ParallelTest {

  @Test
  void test1() { /* runs in parallel */ }

  @Test
  void test2() { /* runs in parallel */ }
}

// junit-platform.properties for parallel config
/*
junit.jupiter.execution.parallel.enabled=true
junit.jupiter.execution.parallel.mode.default=concurrent
junit.jupiter.execution.parallel.config.strategy=fixed
junit.jupiter.execution.parallel.config.fixed.parallelism=4
*/

// Flaky test detection
@Test
@RepeatedTest(10)
void potentiallyFlakyTest() {
  // Run 10 times to detect flakiness
  int result = someUnstableOperation();
  assertTrue(result > 0);
}

// Test execution order (when needed)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OrderedTests {

  @Test
  @Order(1)
  void firstTest() { }

  @Test
  @Order(2)
  void secondTest() { }
}

// ═══════════════════════════════════════════════════════════
// ✦ Maven Commands and Test Reporting
// ═══════════════════════════════════════════════════════════
// Maven commands for testing
/*
mvn test                     # Run unit tests
mvn verify                   # Run unit + integration tests
mvn test -Dtest=UserTest     # Run specific test class
mvn test -Dtest=UserTest#testCreate  # Run specific test method
mvn clean test jacoco:report # Generate coverage report
mvn pitest:mutationCoverage  # Run mutation tests
mvn test -DfailIfNoTests=false  # Don't fail if no tests
*/

// Test reporting example
@AfterAll
static void generateReport() {
  // Custom test report generation
  System.out.println("========== Test Summary ==========");
  System.out.println("Total Tests: " + totalTests);
  System.out.println("Passed: " + passedTests);
  System.out.println("Failed: " + failedTests);
  System.out.println("Coverage: " + coverage + "%");
}`
      }
    }
  ]

  const selectedTopicRef = useRef(selectedTopic)
  useEffect(() => {
    selectedTopicRef.current = selectedTopic
  }, [selectedTopic])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopicRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedTopic(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(14, 165, 233, 0.4)'
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
            backgroundColor: '#2563eb',
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
          🧪 Testing
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: 'rgba(14, 165, 233, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(14, 165, 233, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Comprehensive testing guide covering unit testing with JUnit, mocking with Mockito, integration testing,
          TDD/BDD methodologies, performance testing, contract testing, and test automation in CI/CD pipelines.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          testingTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(14, 165, 233, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(14, 165, 233, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: topic.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {topic.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {topic.description}
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: topic.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Testing Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {testingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(14, 165, 233, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(14, 165, 233, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedTopic?.id === topic.id ? topic.color : '#1f2937'
                      }}>
                        {topic.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: selectedTopic.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedTopic.icon}</span>
                {selectedTopic.name}
              </h3>

              <div style={{
                backgroundColor: `${selectedTopic.color}08`,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedTopic.content.explanation}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  📌 Key Points
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {selectedTopic.content.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: `${selectedTopic.color}08`,
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: selectedTopic.color,
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}>
                        •
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Examples with Dropdowns */}
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: selectedTopic.color,
                margin: '0 0 1.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: selectedTopic.color
                }} />
                Implementation Details
              </h3>

              {parseCodeSections(selectedTopic.content.codeExample).map((section, index) => {
                const sectionId = `section-${index}`
                const isExpanded = expandedSections[sectionId]

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(sectionId)}
                      style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        backgroundColor: isExpanded ? `${selectedTopic.color}10` : 'white',
                        border: 'none',
                        borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${selectedTopic.color}15`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isExpanded ? `${selectedTopic.color}10` : 'white'
                      }}
                    >
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: selectedTopic.color,
                        textAlign: 'left'
                      }}>
                        {section.title}
                      </span>
                      <span style={{
                        fontSize: '1.2rem',
                        color: selectedTopic.color,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}>
                        ▼
                      </span>
                    </button>

                    {/* Section Content */}
                    {isExpanded && (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        maxHeight: '600px',
                        overflowY: 'auto'
                      }}>
                        <SyntaxHighlighter code={section.code} />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Expand/Collapse all button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <button
                  onClick={() => {
                    const allExpanded = {}
                    parseCodeSections(selectedTopic.content.codeExample).forEach((_, index) => {
                      allExpanded[`section-${index}`] = true
                    })
                    setExpandedSections(allExpanded)
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    backgroundColor: selectedTopic.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Expand All
                </button>
                <button
                  onClick={() => setExpandedSections({})}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Collapse All
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Testing

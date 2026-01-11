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

function AgileScrum({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const agileScrumTopics = [
    {
      id: 1,
      name: 'Agile Principles',
      icon: '📜',
      color: '#3b82f6',
      description: 'Agile Manifesto and 12 principles',
      content: {
        explanation: 'Agile is a mindset and methodology for software development emphasizing flexibility, collaboration, and customer feedback. The Agile Manifesto values individuals over processes, working software over documentation, customer collaboration over contract negotiation, and responding to change over following a plan. The 12 Agile principles guide teams toward iterative development, continuous delivery, sustainable pace, and technical excellence. Agile promotes adaptive planning and evolutionary development.',
        keyPoints: [
          'Individuals and interactions over processes and tools',
          'Working software over comprehensive documentation',
          'Customer collaboration over contract negotiation',
          'Responding to change over following a plan',
          'Deliver working software frequently (weeks not months)',
          'Welcome changing requirements, even late in development',
          'Build projects around motivated individuals, give them environment and support',
          'Sustainable development - maintain constant pace indefinitely'
        ],
        codeExample: `// Agile Principles in Practice

// 1. Iterative Development - Release frequently
/*
Sprint Planning (2 weeks):
Week 1-2: User Authentication Feature
  - Day 1-3: Login/Registration
  - Day 4-6: Password Reset
  - Day 7-10: Testing & Refinement
  - Demo to stakeholders
  - Deploy to production
*/

// 2. Working Software - Focus on deliverable increments
public class UserAuthenticationService {

  // Sprint 1: Basic login (working software)
  public boolean login(String username, String password) {
    // Simple but working implementation
    User user = userRepository.findByUsername(username);
    return user != null && user.checkPassword(password);
  }

  // Sprint 2: Enhanced security (iterative improvement)
  public AuthToken loginWithToken(String username, String password) {
    User user = userRepository.findByUsername(username);
    if (user != null && passwordEncoder.matches(password, user.getPassword())) {
      return tokenService.generateToken(user);
    }
    throw new AuthenticationException("Invalid credentials");
  }

  // Sprint 3: Add MFA (incremental features)
  public AuthToken loginWithMFA(String username, String password, String mfaCode) {
    User user = authenticateUser(username, password);
    if (mfaService.validateCode(user, mfaCode)) {
      return tokenService.generateToken(user);
    }
    throw new MFAValidationException("Invalid MFA code");
  }
}

// 3. Customer Collaboration - Regular feedback
/*
Daily Standup (15 minutes):
  - What did I complete yesterday?
  - What will I work on today?
  - Are there any blockers?

Sprint Review (End of sprint):
  - Demo working features to stakeholders
  - Gather feedback
  - Adjust backlog priorities

Sprint Retrospective:
  - What went well?
  - What could be improved?
  - Action items for next sprint
*/

// 4. Responding to Change - Flexible architecture
public interface PaymentProcessor {
  PaymentResult process(Payment payment);
}

// Easy to swap implementations based on changing requirements
public class StripePaymentProcessor implements PaymentProcessor {
  public PaymentResult process(Payment payment) {
    // Stripe implementation
  }
}

public class PayPalPaymentProcessor implements PaymentProcessor {
  public PaymentResult process(Payment payment) {
    // PayPal implementation - added in Sprint 3
  }
}

// Configuration allows change without code modification
@Configuration
public class PaymentConfig {

  @Value("\${payment.processor}")
  private String processorType;

  @Bean
  public PaymentProcessor paymentProcessor() {
    // Adapt to changing business needs
    return switch (processorType) {
      case "stripe" -> new StripePaymentProcessor();
      case "paypal" -> new PayPalPaymentProcessor();
      default -> throw new IllegalArgumentException("Unknown processor");
    };
  }
}

// 5. Sustainable Pace - Technical Excellence
public class ProductService {

  // Write clean, maintainable code from the start
  public Product createProduct(ProductRequest request) {
    // Validate input
    validateProductRequest(request);

    // Create entity
    Product product = new Product(
      request.getName(),
      request.getDescription(),
      request.getPrice()
    );

    // Save to database
    Product saved = productRepository.save(product);

    // Publish event for other services
    eventPublisher.publishEvent(new ProductCreatedEvent(saved));

    // Send notification
    notificationService.notifyProductCreated(saved);

    return saved;
  }

  // Refactor continuously - keep code clean
  private void validateProductRequest(ProductRequest request) {
    if (request.getName() == null || request.getName().isEmpty()) {
      throw new ValidationException("Product name is required");
    }
    if (request.getPrice() <= 0) {
      throw new ValidationException("Price must be positive");
    }
  }
}

// 6. Self-organizing Teams
/*
Team Structure:
  - Product Owner: Defines what to build
  - Scrum Master: Facilitates process
  - Development Team: Decides how to build (5-9 people)

Team Autonomy:
  - Team commits to sprint goals
  - Team decides technical approach
  - Team self-organizes around work
  - No external task assignments
*/

// 7. Continuous Improvement
/*
Retrospective Actions:
Sprint 1:
  - Issue: Tests taking too long
  - Action: Implement parallel test execution
  - Owner: John
  - Due: Sprint 2

Sprint 2:
  - Issue: Unclear requirements
  - Action: Add acceptance criteria to all stories
  - Owner: Sarah
  - Due: Ongoing

Sprint 3:
  - Issue: Code review bottleneck
  - Action: Add second reviewer, limit PR size
  - Owner: Team
  - Due: Immediate
*/

// 8. Face-to-Face Communication
public class DailyStandup {
  /*
  Format (15 minutes max):
    1. Stand in circle (literally standing)
    2. Each person shares:
       - Yesterday: Completed login feature
       - Today: Working on password reset
       - Blockers: Need database schema approval
    3. Park detailed discussions for after
    4. Scrum Master tracks blockers
  */
}

// Agile vs Waterfall
/*
Waterfall (Sequential):
  Requirements (2 months) ->
  Design (2 months) ->
  Implementation (4 months) ->
  Testing (2 months) ->
  Deployment (1 month)
  Total: 11 months to first release

Agile (Iterative):
  Sprint 1 (2 weeks): Core features -> Deploy
  Sprint 2 (2 weeks): Enhanced features -> Deploy
  Sprint 3 (2 weeks): Additional features -> Deploy
  ...
  Total: 2 weeks to first release, continuous delivery

Benefits:
  - Early feedback
  - Risk reduction
  - Faster time to market
  - Ability to pivot
  - Higher customer satisfaction
*/

// Definition of Done (DoD)
/*
Story is Done when:
  ✓ Code complete and peer reviewed
  ✓ Unit tests written and passing (>80% coverage)
  ✓ Integration tests passing
  ✓ Documentation updated
  ✓ Deployed to staging environment
  ✓ Acceptance criteria met
  ✓ Product Owner accepted
  ✓ No critical bugs
*/`
      }
    },
    {
      id: 2,
      name: 'Scrum Framework',
      icon: '🔄',
      color: '#10b981',
      description: 'Scrum roles, artifacts, and events',
      content: {
        explanation: 'Scrum is an Agile framework for managing complex projects. It consists of three roles: Product Owner (defines what to build), Scrum Master (facilitates the process), and Development Team (builds the product). Three artifacts track progress: Product Backlog (all work items), Sprint Backlog (work for current sprint), and Increment (working product). Five events structure the work: Sprint, Sprint Planning, Daily Scrum, Sprint Review, and Sprint Retrospective. Scrum emphasizes time-boxed iterations (sprints) typically 2 weeks long.',
        keyPoints: [
          'Product Owner: Maximizes product value, manages Product Backlog, defines priorities',
          'Scrum Master: Facilitates Scrum process, removes impediments, coaches team',
          'Development Team: Self-organizing, cross-functional, 5-9 members, delivers increments',
          'Product Backlog: Ordered list of all work, single source of requirements',
          'Sprint Backlog: Selected Product Backlog items plus plan for delivering them',
          'Increment: Sum of all completed Product Backlog items, must be potentially shippable',
          'Sprint: Time-box of 1-4 weeks (typically 2 weeks) where work is completed',
          'Transparency, Inspection, Adaptation: Three pillars of Scrum'
        ],
        codeExample: `// Scrum Framework Implementation

// 1. Scrum Roles

// Product Owner - Business representative
public class ProductOwner {
  private ProductBacklog productBacklog;

  // Define product vision
  public void defineProductVision() {
    /*
    Vision: "E-commerce platform that enables small businesses
    to sell online with minimal technical knowledge"
    */
  }

  // Prioritize backlog
  public void prioritizeBacklog() {
    productBacklog.sortByPriority(
      new Comparator<UserStory>() {
        public int compare(UserStory s1, UserStory s2) {
          // Priority based on business value and dependencies
          return s2.getBusinessValue() - s1.getBusinessValue();
        }
      }
    );
  }

  // Accept or reject work
  public boolean acceptUserStory(UserStory story) {
    if (story.meetsAcceptanceCriteria() && story.hasNoBlockingBugs()) {
      story.setStatus(Status.DONE);
      return true;
    }
    return false;
  }

  // Stakeholder communication
  public void communicateProgress() {
    // Regular stakeholder updates
    // Sprint Review demos
    // Roadmap presentations
  }
}

// Scrum Master - Process facilitator
public class ScrumMaster {

  // Facilitate Daily Scrum
  public void facilitateDailyScrum() {
    /*
    Time: 9:00 AM daily (15 minutes)
    Location: Team area
    Format:
      - What did you complete yesterday?
      - What will you work on today?
      - Any blockers?
    */
  }

  // Remove impediments
  public void removeImpediment(Impediment impediment) {
    if (impediment.getType() == ImpedimentType.TECHNICAL) {
      // Arrange technical spike
      scheduleSpike(impediment);
    } else if (impediment.getType() == ImpedimentType.ORGANIZATIONAL) {
      // Escalate to management
      escalateToManagement(impediment);
    } else if (impediment.getType() == ImpedimentType.DEPENDENCY) {
      // Coordinate with other teams
      coordinateWithOtherTeams(impediment);
    }
  }

  // Coach team on Agile practices
  public void coachTeam() {
    // Teach Scrum principles
    // Facilitate retrospectives
    // Help team self-organize
    // Promote continuous improvement
  }

  // Shield team from interruptions
  public void protectTeam(ExternalRequest request) {
    // Defer non-urgent requests to next sprint
    // Handle stakeholder inquiries
    // Maintain team focus on sprint goal
  }
}

// Development Team - Self-organizing
public class DevelopmentTeam {
  private List<Developer> developers;
  private List<Tester> testers;

  // Self-organize around work
  public void selectSprintWork(List<UserStory> candidateStories) {
    int teamCapacity = calculateTeamCapacity();
    int committedPoints = 0;

    List<UserStory> sprintBacklog = new ArrayList<>();

    for (UserStory story : candidateStories) {
      if (committedPoints + story.getStoryPoints() <= teamCapacity) {
        sprintBacklog.add(story);
        committedPoints += story.getStoryPoints();
      } else {
        break; // Don't overcommit
      }
    }
  }

  // Cross-functional collaboration
  public void implementUserStory(UserStory story) {
    // Developers and testers work together
    Developer dev = findAvailableDeveloper();
    Tester tester = findAvailableTester();

    // Pair programming or collaboration
    dev.implement(story);
    tester.testEarly(story); // Shift-left testing
    dev.fixIssues(tester.getDefects());
    tester.verifyFixes();
  }
}

// 2. Scrum Artifacts

// Product Backlog
public class ProductBacklog {
  private List<UserStory> stories;

  // Example Product Backlog
  /*
  Priority | ID | Story | Points | Status
  ---------|----|--------------------------------------------|--------|--------
  1        | 1  | As a user, I want to register an account  | 5      | To Do
  2        | 2  | As a user, I want to login                | 3      | To Do
  3        | 3  | As a user, I want to search products      | 8      | To Do
  4        | 4  | As a user, I want to add items to cart    | 5      | To Do
  5        | 5  | As a user, I want to checkout              | 13     | To Do
  6        | 6  | As a user, I want to track my order       | 8      | To Do
  */

  public void refineBacklog() {
    // Backlog refinement (ongoing)
    // - Break down large stories
    // - Add acceptance criteria
    // - Estimate story points
    // - Clarify requirements
  }
}

// Sprint Backlog
public class SprintBacklog {
  private int sprintNumber;
  private LocalDate startDate;
  private LocalDate endDate;
  private List<UserStory> committedStories;
  private String sprintGoal;

  // Sprint 1 Example
  /*
  Sprint Goal: "Users can register and login to the platform"

  Committed Stories:
    - User Registration (5 points)
      Tasks:
        □ Create User entity and repository
        □ Implement registration API endpoint
        □ Add email validation
        □ Write unit tests
        □ Write integration tests

    - User Login (3 points)
      Tasks:
        □ Implement authentication service
        □ Create login API endpoint
        □ Add JWT token generation
        □ Write security tests

  Total Commitment: 8 points
  Team Capacity: 10 points (buffer for unexpected issues)
  */

  public void trackProgress() {
    int totalPoints = committedStories.stream()
      .mapToInt(UserStory::getStoryPoints)
      .sum();

    int completedPoints = committedStories.stream()
      .filter(s -> s.getStatus() == Status.DONE)
      .mapToInt(UserStory::getStoryPoints)
      .sum();

    System.out.println("Progress: " + completedPoints + "/" + totalPoints);
  }
}

// Increment
public class Increment {
  private int sprintNumber;
  private LocalDateTime releaseDate;
  private List<UserStory> completedStories;

  // Each sprint produces potentially shippable increment
  public boolean isPotentiallyShippable() {
    // All acceptance criteria met
    // All tests passing
    // Code reviewed
    // Documented
    // Deployed to staging
    // Product Owner accepted
    return completedStories.stream()
      .allMatch(story -> story.meetsDefinitionOfDone());
  }

  // Cumulative increments
  /*
  Sprint 1 Increment: User Registration + Login
  Sprint 2 Increment: Sprint 1 + Product Search + Shopping Cart
  Sprint 3 Increment: Sprint 2 + Checkout + Payment
  Each increment builds on previous
  */
}

// 3. Scrum Events

// Sprint Planning
public class SprintPlanning {

  // Part 1: What can be done? (4 hours for 2-week sprint)
  public SprintBacklog planSprintWork(ProductBacklog productBacklog) {
    // Product Owner presents top priorities
    // Team asks questions
    // Team determines what they can commit to

    String sprintGoal = "Enable users to search and purchase products";

    List<UserStory> selectedStories = new ArrayList<>();
    selectedStories.add(productBacklog.getStory(3)); // Product search
    selectedStories.add(productBacklog.getStory(4)); // Shopping cart
    selectedStories.add(productBacklog.getStory(5)); // Checkout

    return new SprintBacklog(sprintGoal, selectedStories);
  }

  // Part 2: How will it be done? (4 hours for 2-week sprint)
  public void breakDownStories(List<UserStory> stories) {
    for (UserStory story : stories) {
      // Team breaks down into tasks
      story.addTask("Create Product entity");
      story.addTask("Implement search API");
      story.addTask("Create search UI");
      story.addTask("Write tests");
      story.addTask("Code review");
    }
  }
}

// Daily Scrum
public class DailyScrum {
  public void conduct() {
    /*
    Time-box: 15 minutes
    Same time and place daily
    Stand up (literally)

    Each team member:
    1. Yesterday: "I completed user authentication API"
    2. Today: "I'll work on password reset functionality"
    3. Blockers: "Waiting for database schema approval"

    NOT a status report to Scrum Master
    Team synchronizes and identifies blockers
    Detailed discussions happen after
    */
  }
}

// Sprint Review
public class SprintReview {
  // 4 hours for 2-week sprint
  public void conductReview(Increment increment) {
    // 1. Product Owner describes what was Done vs Not Done

    // 2. Development Team demonstrates working software
    demo(increment.getCompletedStories());

    // 3. Stakeholders provide feedback
    List<Feedback> feedback = gatherStakeholderFeedback();

    // 4. Discussion of what to do next
    // Product Owner adjusts Product Backlog based on feedback

    // 5. Review timeline, budget, marketplace changes
  }

  private void demo(List<UserStory> stories) {
    // Live demonstration of working features
    // Not slides or presentations
    // Interactive - stakeholders can try it
  }
}

// Sprint Retrospective
public class SprintRetrospective {
  // 3 hours for 2-week sprint
  public void conductRetrospective() {
    // What went well?
    List<String> positives = Arrays.asList(
      "Great collaboration between developers and testers",
      "Daily standups were focused and helpful",
      "Code review process improved"
    );

    // What could be improved?
    List<String> improvements = Arrays.asList(
      "Tests are taking too long to run",
      "Requirements were unclear for Story #5",
      "Need better documentation"
    );

    // Action items
    List<ActionItem> actions = Arrays.asList(
      new ActionItem("Implement parallel test execution", "John", "Sprint 3"),
      new ActionItem("Add acceptance criteria template", "Sarah", "Immediate"),
      new ActionItem("Document API endpoints", "Team", "Sprint 3")
    );

    // Continuous improvement
  }
}

// Sprint Cadence
/*
2-Week Sprint Timeline:

Day 1 (Monday):
  - Sprint Planning (8:00 AM - 12:00 PM)
  - Team starts development (1:00 PM onwards)

Day 2-9 (Tuesday - Wednesday Week 2):
  - Daily Scrum (9:00 AM daily)
  - Development work
  - Backlog Refinement (Wednesday afternoon, 2 hours)

Day 10 (Thursday Week 2):
  - Sprint Review (10:00 AM - 2:00 PM)
  - Sprint Retrospective (2:00 PM - 5:00 PM)

Day 11 (Friday Week 2):
  - Next Sprint Planning
  - Cycle repeats
*/`
      }
    },
    {
      id: 3,
      name: 'Sprint Planning',
      icon: '📅',
      color: '#f59e0b',
      description: 'Sprint goals and capacity planning',
      content: {
        explanation: 'Sprint Planning is a collaborative event where the Scrum Team plans the work for the upcoming sprint. The Product Owner presents prioritized backlog items and explains business value. The Development Team asks clarifying questions and estimates effort. Together they define a Sprint Goal - a concise statement of what the sprint will achieve. The team considers their capacity (available hours minus vacation, meetings, etc.) and commits to realistic amount of work. Stories are broken into tasks with estimated hours. Sprint Planning answers "What can be delivered?" and "How will the work be done?"',
        keyPoints: [
          'Time-boxed: 8 hours for one-month sprint (4 hours for 2-week sprint)',
          'Sprint Goal: Concise objective that provides coherence to sprint work',
          'Capacity Planning: Calculate available team hours (subtract meetings, PTO, buffer)',
          'Story Selection: Team pulls stories from Product Backlog based on priority and capacity',
          'Definition of Ready: Stories must be clear, testable, and estimated before sprint',
          'Task Breakdown: Decompose stories into development tasks (typically < 8 hours each)',
          'Sprint Commitment: Team commits to Sprint Goal, not every story (flexibility)',
          'Sprint Backlog: Output is selected stories plus plan for delivering them'
        ],
        codeExample: `// Sprint Planning Implementation

// 1. Calculate Team Capacity
public class CapacityCalculator {

  public int calculateSprintCapacity(
    List<TeamMember> team,
    int sprintDurationDays,
    int hoursPerDay
  ) {
    int totalCapacity = 0;

    for (TeamMember member : team) {
      // Calculate member's available hours
      int memberHours = calculateMemberCapacity(
        member,
        sprintDurationDays,
        hoursPerDay
      );
      totalCapacity += memberHours;
    }

    // Apply focus factor (typically 70-80%)
    // Accounts for meetings, email, context switching
    double focusFactor = 0.75;
    int effectiveCapacity = (int) (totalCapacity * focusFactor);

    return effectiveCapacity;
  }

  private int calculateMemberCapacity(
    TeamMember member,
    int sprintDays,
    int hoursPerDay
  ) {
    int totalHours = sprintDays * hoursPerDay;

    // Subtract PTO
    int ptoHours = member.getPTODays() * hoursPerDay;

    // Subtract recurring meetings
    int meetingHours = calculateMeetingHours(sprintDays);

    // Subtract on-call or support duties
    int supportHours = member.isOnCall() ? 8 : 0;

    return totalHours - ptoHours - meetingHours - supportHours;
  }

  private int calculateMeetingHours(int sprintDays) {
    // Daily Scrum: 0.25 hours * days
    // Sprint Planning: 4 hours
    // Sprint Review: 2 hours
    // Sprint Retrospective: 1.5 hours
    // Backlog Refinement: 2 hours
    return (int) (sprintDays * 0.25) + 4 + 2 + 2 + 2;
  }

  // Example Calculation for 2-week sprint (10 working days)
  /*
  Team: 5 developers
  Sprint Duration: 10 days
  Hours per day: 8

  Developer 1: 10 days * 8 hours = 80 hours
    - PTO: 1 day (8 hours)
    - Meetings: 12 hours
    - Available: 60 hours

  Developer 2: 80 hours
    - Meetings: 12 hours
    - On-call: 8 hours
    - Available: 60 hours

  Developer 3: 80 hours
    - PTO: 2 days (16 hours)
    - Meetings: 12 hours
    - Available: 52 hours

  Developer 4: 80 hours
    - Meetings: 12 hours
    - Available: 68 hours

  Developer 5: 80 hours
    - Meetings: 12 hours
    - Available: 68 hours

  Total Raw Capacity: 308 hours
  Apply Focus Factor (75%): 231 hours
  Final Sprint Capacity: 231 hours (or ~29 story points if 8 hours = 1 point)
  */
}

// 2. Define Sprint Goal
public class SprintGoal {
  private String goal;
  private List<String> objectives;

  // Good Sprint Goals - Focused and Business-Oriented
  /*
  Sprint 1: "Users can register and authenticate"
  Sprint 2: "Users can search and view product catalog"
  Sprint 3: "Users can add products to cart and checkout"
  Sprint 4: "Users can track orders and view history"
  */

  // Bad Sprint Goals - Too vague or technical
  /*
  Bad: "Complete stories 1-5"
  Bad: "Refactor database layer"
  Bad: "Various improvements"
  */

  // Sprint Goal provides coherence
  public boolean storySupportsGoal(UserStory story, String sprintGoal) {
    // All stories should contribute to Sprint Goal
    // If story doesn't support goal, consider deferring
    return story.getBusinessValue().alignsWith(sprintGoal);
  }
}

// 3. User Story Definition of Ready
public class UserStory {
  private String id;
  private String title;
  private String description;
  private List<String> acceptanceCriteria;
  private int storyPoints;
  private List<String> dependencies;

  // INVEST Criteria for ready stories
  public boolean isReady() {
    return isIndependent() &&
           isNegotiable() &&
           isValuable() &&
           isEstimable() &&
           isSmall() &&
           isTestable();
  }

  // Independent - Can be developed in any order
  private boolean isIndependent() {
    return dependencies == null || dependencies.isEmpty();
  }

  // Negotiable - Details can be discussed
  private boolean isNegotiable() {
    return !description.contains("must exactly") &&
           !description.contains("no alternatives");
  }

  // Valuable - Delivers business value
  private boolean isValuable() {
    return description.contains("As a") &&
           description.contains("I want") &&
           description.contains("So that");
  }

  // Estimable - Team can estimate size
  private boolean isEstimable() {
    return storyPoints > 0 &&
           acceptanceCriteria != null &&
           acceptanceCriteria.size() > 0;
  }

  // Small - Can be completed in one sprint
  private boolean isSmall() {
    return storyPoints <= 8; // Stories > 8 points should be split
  }

  // Testable - Clear acceptance criteria
  private boolean isTestable() {
    return acceptanceCriteria != null &&
           acceptanceCriteria.stream()
             .allMatch(criteria -> criteria.startsWith("Given") ||
                                 criteria.startsWith("When") ||
                                 criteria.startsWith("Then"));
  }
}

// 4. Story Selection Process
public class SprintPlanning {

  public SprintBacklog selectSprintStories(
    ProductBacklog productBacklog,
    int teamCapacity
  ) {
    String sprintGoal = defineSprintGoal(productBacklog);
    List<UserStory> selectedStories = new ArrayList<>();
    int committedPoints = 0;

    // Product Owner presents stories in priority order
    for (UserStory story : productBacklog.getTopPriorityStories()) {

      // Verify story is ready
      if (!story.isReady()) {
        System.out.println("Story " + story.getId() + " not ready - skipping");
        continue;
      }

      // Check if story fits in remaining capacity
      if (committedPoints + story.getStoryPoints() <= teamCapacity) {

        // Team discusses and accepts story
        if (teamAcceptsStory(story)) {
          selectedStories.add(story);
          committedPoints += story.getStoryPoints();

          System.out.println("Committed: " + story.getTitle() +
                           " (" + story.getStoryPoints() + " points)");
        }
      } else {
        // Capacity full
        System.out.println("Sprint capacity reached: " +
                         committedPoints + " points committed");
        break;
      }
    }

    // Leave buffer for unexpected work
    if (committedPoints > teamCapacity * 0.9) {
      System.out.println("WARNING: Over 90% capacity committed");
    }

    return new SprintBacklog(sprintGoal, selectedStories);
  }

  private boolean teamAcceptsStory(UserStory story) {
    // Team asks questions
    // Team confirms understanding
    // Team agrees they can complete it
    // Fist of five voting: 3+ fingers = accept
    return true;
  }
}

// 5. Task Breakdown
public class TaskBreakdown {

  public void decomposeStory(UserStory story) {
    // Example: User Login Story (3 points)

    // Backend tasks
    story.addTask(new Task(
      "Create User entity and repository",
      4, // hours
      "John"
    ));

    story.addTask(new Task(
      "Implement authentication service",
      6,
      "Sarah"
    ));

    story.addTask(new Task(
      "Create login API endpoint",
      4,
      "John"
    ));

    story.addTask(new Task(
      "Add JWT token generation",
      3,
      "Sarah"
    ));

    // Testing tasks
    story.addTask(new Task(
      "Write unit tests for auth service",
      3,
      "Mike"
    ));

    story.addTask(new Task(
      "Write integration tests for login API",
      4,
      "Mike"
    ));

    // Total: 24 hours for 3-point story
    // Rule of thumb: 1 story point ≈ 8 ideal hours
  }

  // Task Characteristics
  /*
  Good Tasks:
    ✓ Small (< 8 hours)
    ✓ Specific and clear
    ✓ Testable
    ✓ Has owner (self-assigned)

  Bad Tasks:
    ✗ "Implement login" (too vague)
    ✗ "Fix all bugs" (not specific)
    ✗ "Refactor code" (no clear done state)
  */
}

// 6. Sprint Planning Agenda
public class SprintPlanningAgenda {
  /*
  Part 1: What can be done? (First 4 hours)
  ==========================================
  09:00 - Product Owner presents Sprint Goal
  09:15 - Product Owner presents top priority stories
  09:30 - Team asks clarifying questions
  10:00 - Team estimates unestimated stories
  10:30 - Break
  10:45 - Calculate team capacity
  11:00 - Select stories for sprint
  12:30 - Finalize Sprint Goal and commitment

  Part 2: How will it be done? (Next 4 hours)
  ===========================================
  13:00 - Break down stories into tasks
  14:00 - Identify dependencies and risks
  14:30 - Create initial task assignments
  15:00 - Break
  15:15 - Discuss technical approach
  15:45 - Identify spikes or unknowns
  16:15 - Review Definition of Done
  16:30 - Final questions and adjustments
  16:45 - Sprint Planning complete
  */
}

// 7. Sprint Backlog Board
public class SprintBacklogBoard {
  /*
  Physical or Digital Board:

  TO DO | IN PROGRESS | CODE REVIEW | TESTING | DONE
  ------|-------------|-------------|---------|------
  □ Registration    | 🔵 Login API    | 🟢 Password Reset | 🟡 Email Verify | ✅ User Profile
  □ Product Search  | 🔵 Auth Service |                  |                | ✅ Settings
  □ Shopping Cart   |                |                  |                |

  Story Cards include:
    - Story ID
    - Story title
    - Story points
    - Assignee
    - Tasks (checklist)
    - Acceptance criteria
    - Blockers (if any)
  */
}

// 8. Sprint Planning Anti-Patterns
public class SprintPlanningAntiPatterns {
  /*
  ❌ Anti-Pattern 1: Product Owner dictates commitment
  ✅ Solution: Team self-organizes and commits

  ❌ Anti-Pattern 2: No Sprint Goal defined
  ✅ Solution: Always create focused Sprint Goal

  ❌ Anti-Pattern 3: Overcommitting to hit targets
  ✅ Solution: Use historical velocity, leave buffer

  ❌ Anti-Pattern 4: Stories not ready for sprint
  ✅ Solution: Refine backlog before Sprint Planning

  ❌ Anti-Pattern 5: Planning takes 8+ hours
  ✅ Solution: Better backlog refinement, timeboxing

  ❌ Anti-Pattern 6: Detailed design during planning
  ✅ Solution: High-level approach only, details during sprint

  ❌ Anti-Pattern 7: Scope changes during sprint
  ✅ Solution: Protect sprint commitment, defer to next sprint

  ❌ Anti-Pattern 8: No task breakdown
  ✅ Solution: Break stories into tasks < 8 hours
  */
}`
      }
    },
    {
      id: 4,
      name: 'User Stories',
      icon: '📝',
      color: '#8b5cf6',
      description: 'User story format and acceptance criteria',
      content: {
        explanation: 'User Stories are short, simple descriptions of features told from the user perspective. They follow the format: "As a [user role], I want [goal], so that [benefit]." This format focuses on WHO wants the feature, WHAT they want, and WHY they want it, emphasizing business value over technical implementation. User Stories include Acceptance Criteria - specific conditions that must be met for the story to be considered complete. Stories should follow the INVEST principles: Independent, Negotiable, Valuable, Estimable, Small, and Testable.',
        keyPoints: [
          'Format: As a [role], I want [feature], so that [benefit]',
          'Focus on user value, not technical implementation',
          'INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable',
          'Acceptance Criteria: Specific, testable conditions for completion',
          'Story Splitting: Break large stories (epics) into smaller deliverable pieces',
          'Conversation over documentation: Stories prompt discussion',
          'Story Points: Relative sizing (Fibonacci: 1, 2, 3, 5, 8, 13)',
          '3 Cs: Card (brief description), Conversation (discussion), Confirmation (tests)'
        ],
        codeExample: `// User Stories Implementation

// 1. User Story Format
public class UserStory {
  private String id;
  private String role;      // As a...
  private String goal;      // I want...
  private String benefit;   // So that...
  private List<String> acceptanceCriteria;
  private int storyPoints;
  private String status;

  // Example: Good User Story
  /*
  ID: US-101
  Title: User Registration

  As a new visitor
  I want to create an account
  So that I can access personalized features and save my preferences

  Acceptance Criteria:
  1. Given I am on the registration page
     When I enter valid email, password, and name
     Then my account is created and I receive confirmation email

  2. Given I enter an email that already exists
     When I submit the registration form
     Then I see error "Email already registered"

  3. Given I enter a password less than 8 characters
     When I submit the registration form
     Then I see error "Password must be at least 8 characters"

  4. Given I successfully register
     When I check my email
     Then I receive a welcome email with account verification link

  Story Points: 5
  Priority: High
  Dependencies: None
  */

  // Bad User Story (Too Technical)
  /*
  ❌ As a developer
     I want to implement JWT authentication
     So that the system is secure

  Why bad?
  - User is "developer" not end user
  - Describes implementation not business value
  - Doesn't explain user benefit
  */

  // Bad User Story (Too Vague)
  /*
  ❌ As a user
     I want a good experience
     So that I'm happy

  Why bad?
  - "Good experience" is not specific
  - Cannot be estimated
  - Cannot be tested
  */
}

// 2. INVEST Principles
public class INVESTValidator {

  // I - Independent
  public boolean isIndependent(UserStory story) {
    /*
    Story should not depend on other stories being completed first
    Can be developed in any order

    Good: "User can search products"
    Bad: "User can see search results (depends on search feature)"
    */
    return story.getDependencies().isEmpty();
  }

  // N - Negotiable
  public boolean isNegotiable(UserStory story) {
    /*
    Details can be discussed and changed
    Not a contract or rigid specification

    Good: "User can filter products"
    (Can discuss which filters, implementation)

    Bad: "User must see filters as dropdown menus on left side"
    (Over-specified, no room for discussion)
    */
    return !story.containsImplementationDetails();
  }

  // V - Valuable
  public boolean isValuable(UserStory story) {
    /*
    Delivers value to user or business
    Not just technical tasks

    Good: "User can save favorite products"
    (Clear user value)

    Bad: "Refactor database schema"
    (Technical task, no direct user value)
    */
    return story.getBenefit() != null &&
           story.getBenefit().describesUserValue();
  }

  // E - Estimable
  public boolean isEstimable(UserStory story) {
    /*
    Team can estimate size/effort
    Requirements are clear enough

    Good: Clear requirements, team understands scope
    Bad: Too vague, too many unknowns
    */
    return story.getStoryPoints() > 0 &&
           story.hasAcceptanceCriteria() &&
           story.requirementsAreClear();
  }

  // S - Small
  public boolean isSmall(UserStory story) {
    /*
    Can be completed within one sprint
    Typically 1-8 story points

    Good: "User can login with email/password" (3 points)
    Bad: "User can manage entire account" (Too big - Epic)

    Stories > 8 points should be split
    */
    return story.getStoryPoints() <= 8;
  }

  // T - Testable
  public boolean isTestable(UserStory story) {
    /*
    Clear acceptance criteria
    Can verify when done

    Good: "User can login and see personalized dashboard"
    (Clear, testable outcome)

    Bad: "User has good login experience"
    ("Good" is subjective, not testable)
    */
    return story.getAcceptanceCriteria().size() > 0 &&
           story.hasVerifiableOutcomes();
  }
}

// 3. Acceptance Criteria (Given-When-Then)
public class AcceptanceCriteria {

  // Format: Given-When-Then (BDD style)
  public static void example() {
    /*
    Story: User Login

    Scenario 1: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I am redirected to dashboard
    And I see welcome message with my name

    Scenario 2: Invalid password
    Given I am on the login page
    When I enter incorrect password
    Then I see error "Invalid credentials"
    And I remain on login page

    Scenario 3: Account locked
    Given my account is locked
    When I try to login
    Then I see error "Account locked. Contact support"
    And I see link to support page

    Scenario 4: Remember me
    Given I check "Remember me" checkbox
    When I login successfully
    Then I remain logged in after closing browser
    */
  }

  // Alternative Format: Acceptance Criteria Checklist
  public static void checklistExample() {
    /*
    Story: Product Search

    Acceptance Criteria:
    ✓ User can enter search term in search box
    ✓ Search returns products matching term in name or description
    ✓ Results are paginated (20 per page)
    ✓ User can sort results by price, name, or relevance
    ✓ Search is case-insensitive
    ✓ Empty search shows all products
    ✓ No results shows "No products found" message
    ✓ Search completes within 2 seconds
    */
  }
}

// 4. Story Splitting Techniques
public class StorySplitting {

  // Epic (too large)
  /*
  Epic: E-commerce Checkout (21 points)

  Split by workflow steps:
    ✓ User can add items to cart (3 points)
    ✓ User can view cart and update quantities (2 points)
    ✓ User can enter shipping address (3 points)
    ✓ User can select shipping method (2 points)
    ✓ User can enter payment information (5 points)
    ✓ User can review and place order (3 points)
    ✓ User receives order confirmation (3 points)
  */

  // Split by CRUD operations
  /*
  Epic: Product Management (13 points)

  Split by operations:
    ✓ Admin can create product (3 points)
    ✓ Admin can view product details (2 points)
    ✓ Admin can update product (3 points)
    ✓ Admin can delete product (2 points)
    ✓ Admin can search products (3 points)
  */

  // Split by business rules
  /*
  Story: User can apply discount code (8 points)

  Split by complexity:
    ✓ User can apply single-use discount code (3 points)
    ✓ User can apply percentage discount code (2 points)
    ✓ User can apply free shipping code (2 points)
    ✓ System validates discount expiration (1 point)
  */

  // Split by data variations
  /*
  Story: User can login (8 points)

  Split by login methods:
    ✓ User can login with email/password (3 points)
    ✓ User can login with Google (3 points)
    ✓ User can login with Facebook (2 points)
  */

  // Vertical slicing (preferred)
  /*
  End-to-end functionality for specific scenario

  Good: "User can search products by name"
  (Complete vertical slice: UI -> API -> Database)

  Bad: "Create product search UI"
  (Horizontal slice: just one layer)
  */
}

// 5. Story Estimation (Planning Poker)
public class StoryEstimation {

  // Story Points (Fibonacci sequence)
  /*
  1 point  - Trivial (1-2 hours)
    Example: Change button color

  2 points - Simple (2-4 hours)
    Example: Add validation to form field

  3 points - Moderate (4-8 hours, ~1 day)
    Example: Create new API endpoint

  5 points - Complex (1-2 days)
    Example: User login with JWT

  8 points - Very Complex (2-4 days)
    Example: Product search with filters

  13 points - Epic (split into smaller stories)
    Example: Complete checkout flow

  Story points are relative, not time-based
  Compare to baseline story (reference story = 3 points)
  */

  // Planning Poker Process
  public void planningPokerSession(UserStory story) {
    /*
    1. Product Owner reads story
    2. Team asks clarifying questions
    3. Each team member selects card (1, 2, 3, 5, 8, 13, ?, ∞)
    4. Everyone reveals cards simultaneously
    5. If consensus (all same or close), done
    6. If different, highest and lowest explain reasoning
    7. Discussion and re-vote
    8. Repeat until consensus

    Special cards:
    ? = Need more information
    ∞ = Too large, needs splitting
    ☕ = Need break
    */
  }

  // Velocity Tracking
  public void calculateVelocity(List<Sprint> completedSprints) {
    /*
    Sprint 1: 18 points completed
    Sprint 2: 22 points completed
    Sprint 3: 20 points completed
    Sprint 4: 21 points completed

    Average Velocity: 20.25 points per sprint
    Use for future sprint planning
    */
    double avgVelocity = completedSprints.stream()
      .mapToInt(Sprint::getCompletedPoints)
      .average()
      .orElse(0);

    System.out.println("Team velocity: " + avgVelocity + " points/sprint");
  }
}

// 6. User Story Mapping
public class StoryMapping {
  /*
  Visual representation of user journey

  User Activity:   Browse Products → Add to Cart → Checkout → Track Order
                   ─────────────────────────────────────────────────────
  Release 1:       • Search          • Add item      • Pay
                   • Filter          • View cart     • Confirm

  Release 2:       • Compare                         • Save address
                   • Reviews                         • Multiple payment

  Release 3:       • Recommendations                 • Express checkout
                   • Wishlist                        • Gift cards

  Benefits:
  - Visualize user journey
  - Prioritize features
  - Plan releases
  - Identify gaps
  */
}

// 7. Definition of Done for User Stories
public class DefinitionOfDone {
  /*
  Story is Done when:

  Development:
  ✓ Code complete and checked in
  ✓ Unit tests written and passing
  ✓ Code reviewed and approved
  ✓ No critical bugs
  ✓ Refactored and clean

  Testing:
  ✓ Integration tests passing
  ✓ Acceptance criteria verified
  ✓ Exploratory testing completed
  ✓ No open defects

  Documentation:
  ✓ API documentation updated
  ✓ Release notes updated
  ✓ User documentation updated (if needed)

  Deployment:
  ✓ Deployed to staging environment
  ✓ Product Owner accepted
  ✓ Ready for production release

  Non-functional:
  ✓ Performance acceptable
  ✓ Security reviewed
  ✓ Accessibility verified
  */
}

// 8. Story Examples by Domain
public class StoryExamples {

  // E-commerce
  /*
  As a shopper
  I want to save products to wishlist
  So that I can purchase them later
  */

  // Banking
  /*
  As an account holder
  I want to transfer funds between my accounts
  So that I can manage my money efficiently
  */

  // Healthcare
  /*
  As a patient
  I want to schedule appointments online
  So that I don't have to call during business hours
  */

  // Social Media
  /*
  As a user
  I want to share posts with specific friends
  So that I can control who sees my content
  */

  // Internal Tools
  /*
  As a manager
  I want to approve time-off requests
  So that my team can plan their schedules
  */
}`
      }
    },
    {
      id: 5,
      name: 'Scrum Ceremonies',
      icon: '👥',
      color: '#ec4899',
      description: 'Daily Standup, Review, Retrospective',
      content: {
        explanation: 'Scrum Ceremonies (also called events) are structured meetings that provide opportunities for inspection and adaptation. The Daily Scrum (standup) is a 15-minute daily sync where team members share progress and blockers. Sprint Review demonstrates working software to stakeholders and gathers feedback. Sprint Retrospective reflects on the process and identifies improvements. Backlog Refinement prepares upcoming stories for sprint planning. These ceremonies create transparency, enable collaboration, and drive continuous improvement.',
        keyPoints: [
          'Daily Scrum: 15-minute daily sync at same time/place, focus on progress and blockers',
          'Sprint Review: Demo working software to stakeholders, gather feedback, adapt backlog',
          'Sprint Retrospective: Reflect on process, identify improvements, create action items',
          'Backlog Refinement: Clarify requirements, add acceptance criteria, estimate stories',
          'All ceremonies are time-boxed to maintain focus and efficiency',
          'Ceremonies provide transparency through regular inspection',
          'Enable adaptation based on learnings and feedback',
          'Foster collaboration between team and stakeholders'
        ],
        codeExample: `// Scrum Ceremonies Implementation

// 1. Daily Scrum (Daily Standup)
public class DailyScrum {

  // Format and Structure
  public void conductDailyScrum() {
    /*
    Time: Same time daily (e.g., 9:00 AM)
    Duration: 15 minutes (time-boxed)
    Location: Same place (team area or video call)
    Participants: Development Team (required)
                 Scrum Master (facilitates)
                 Product Owner (optional)

    Stand up (literally) - keeps meeting short

    Each team member answers 3 questions:
    1. What did I complete yesterday?
    2. What will I work on today?
    3. Are there any blockers?
    */
  }

  // Example Daily Scrum
  public static void exampleStandup() {
    /*
    Sarah (Developer):
    - Yesterday: Completed user login API endpoint
    - Today: Working on password reset functionality
    - Blockers: None

    John (Developer):
    - Yesterday: Fixed bugs in shopping cart
    - Today: Will add integration tests for cart
    - Blockers: Waiting for test database setup

    Mike (Tester):
    - Yesterday: Tested user registration flow
    - Today: Writing automated tests for login
    - Blockers: Need access to staging environment

    Lisa (Developer):
    - Yesterday: Implemented product search API
    - Today: Will work on search filters
    - Blockers: Unclear requirements for price filter

    Action Items:
    - Scrum Master: Set up test database for John (by EOD)
    - Scrum Master: Get staging access for Mike (by 11 AM)
    - Lisa: Schedule quick session with Product Owner on filters (after standup)
    */
  }

  // Daily Scrum Anti-Patterns
  public void antiPatterns() {
    /*
    ❌ Status report to manager/Scrum Master
    ✅ Team synchronization peer-to-peer

    ❌ Detailed problem solving during standup
    ✅ Identify issues, solve after standup

    ❌ Longer than 15 minutes
    ✅ Strict time-box, park discussions

    ❌ Sitting down, informal start
    ✅ Stand up, start exactly on time

    ❌ Reading from task board
    ✅ Speak from memory, reference board as needed

    ❌ Skipping when "nothing to report"
    ✅ Daily ceremony builds team habit

    ❌ Only talking about tasks
    ✅ Focus on Sprint Goal progress
    */
  }

  // Virtual Daily Scrum Tips
  public void virtualStandupTips() {
    /*
    Best Practices:
    ✓ Cameras on for engagement
    ✓ Mute when not speaking
    ✓ Use virtual hand raise
    ✓ Share screen with task board
    ✓ Use timer visible to all
    ✓ Record for absent members
    ✓ Digital parking lot for follow-ups
    */
  }
}

// 2. Sprint Review
public class SprintReview {

  // Structure and Format
  public void conductSprintReview(Sprint sprint) {
    /*
    Time: End of sprint (last day)
    Duration: 4 hours for 1-month sprint (2 hours for 2-week sprint)
    Participants: Scrum Team + Stakeholders + Customers

    Agenda:
    1. Product Owner reviews sprint goals (10 minutes)
    2. Development Team demos completed work (60 minutes)
    3. Stakeholder feedback and discussion (30 minutes)
    4. Product Owner discusses Product Backlog (10 minutes)
    5. Team discusses timeline and next release (10 minutes)

    Key: This is a working session, not a presentation
    */
  }

  // Demo Best Practices
  public void demoGuidelines() {
    /*
    ✅ DO:
    - Show working software (not slides)
    - Make it interactive (let stakeholders try)
    - Demo in production-like environment
    - Show actual user flows
    - Highlight business value
    - Demonstrate acceptance criteria met
    - Keep it real (show actual data)

    ❌ DON'T:
    - Use PowerPoint presentations
    - Demo on development machine
    - Make excuses for incomplete features
    - Demo incomplete work
    - Spend time on technical details
    - Make it too scripted/rehearsed
    */
  }

  // Example Sprint Review
  public static void exampleReview() {
    /*
    Sprint 3 Review - E-commerce Platform

    09:00 - Welcome and Sprint Goal Review
    Product Owner: "Our goal was to enable users to search and
    purchase products. Let's see what we accomplished."

    09:10 - Demo: Product Search Feature
    Sarah demos:
    - Search by product name
    - Filter by category and price range
    - Sort by price, name, relevance
    - Shows 100ms response time on 10,000 products

    Stakeholder: "Can we search by brand?"
    Sarah: "Not in this sprint. We can add that to backlog."

    09:30 - Demo: Shopping Cart
    John demos:
    - Add products to cart
    - Update quantities
    - Remove items
    - Cart persists across sessions
    - Shows cart on mobile responsive design

    Stakeholder: "Love the mobile view! Can we add coupon codes?"
    Product Owner: "Great idea. I'll add that as a story."

    09:50 - Demo: Checkout Flow
    Mike demos:
    - Enter shipping address
    - Select shipping method
    - Enter payment (Stripe integration)
    - Order confirmation
    - Email receipt

    Stakeholder: "What about saved addresses?"
    Lisa: "That's planned for Sprint 5."

    10:10 - Break

    10:20 - Feedback Discussion
    - Overall positive feedback
    - Request: Add product recommendations
    - Request: Add order tracking
    - Request: Support multiple payment methods

    10:40 - Backlog Discussion
    Product Owner reviews updated backlog:
    - Reprioritized based on feedback
    - Added new stories for recommendations
    - Moved multi-payment to Sprint 4

    10:50 - Next Steps
    - Sprint 4 focus: Order management and tracking
    - Expected release date: 3 weeks
    - Next review: December 15

    11:00 - Review Complete
    */
  }

  // Gathering Actionable Feedback
  public List<FeedbackItem> gatherFeedback() {
    List<FeedbackItem> feedback = new ArrayList<>();

    // Good feedback questions:
    /*
    - What did you like about what you saw?
    - What would make this more useful?
    - Are we building the right thing?
    - What should we prioritize next?
    - Who else should see this demo?
    - What concerns do you have?
    */

    return feedback;
  }
}

// 3. Sprint Retrospective
public class SprintRetrospective {

  // Structure and Format
  public void conductRetrospective() {
    /*
    Time: After Sprint Review, before next Planning
    Duration: 3 hours for 1-month sprint (1.5 hours for 2-week sprint)
    Participants: Scrum Team only (safe environment)

    Purpose:
    - Inspect team and process
    - Identify improvements
    - Create actionable plan

    Format (many variations):
    1. Set the stage (5 minutes)
    2. Gather data (15 minutes)
    3. Generate insights (20 minutes)
    4. Decide what to do (20 minutes)
    5. Close retrospective (10 minutes)
    */
  }

  // Retrospective Formats
  public void retrospectiveFormats() {
    /*
    Format 1: Start-Stop-Continue
    ═══════════════════════════════
    Start: What should we start doing?
    - Pair programming for complex features
    - Writing API documentation upfront

    Stop: What should we stop doing?
    - Working on multiple stories simultaneously
    - Skipping code reviews for "quick fixes"

    Continue: What should we keep doing?
    - Daily standups at 9 AM
    - Thorough testing before deployment


    Format 2: Glad-Sad-Mad
    ═════════════════════
    Glad: What made you happy?
    😊 Great collaboration with QA
    😊 Deployed twice this sprint
    😊 Clear acceptance criteria

    Sad: What disappointed you?
    😟 Sprint goal not fully met
    😟 Two production bugs
    😟 Unclear story requirements

    Mad: What frustrated you?
    😠 Frequent interruptions during sprint
    😠 Build pipeline failures
    😠 Delayed feedback from stakeholders


    Format 3: 4 Ls
    ══════════════
    Liked: Great team collaboration
    Learned: New testing framework
    Lacked: Better documentation
    Longed For: Faster deployment process


    Format 4: Sailboat
    ══════════════════
    Island (Goal): Sprint objectives
    Wind (Helping): What moved us forward?
    Anchors (Hindering): What held us back?
    Rocks (Risks): What dangers ahead?


    Format 5: Temperature Reading
    ═════════════════════════════
    Rate sprint on scale 1-10:
    - Team collaboration: 8/10
    - Code quality: 7/10
    - Sprint goal achievement: 6/10
    - Process efficiency: 7/10
    - Communication: 9/10

    Discuss highest and lowest ratings
    */
  }

  // Example Retrospective
  public static void exampleRetrospective() {
    /*
    Sprint 3 Retrospective

    14:00 - Set the Stage
    Scrum Master: "Let's reflect on Sprint 3. Be honest and constructive.
    This is a safe space."

    14:05 - Gather Data (Start-Stop-Continue)

    START:
    - Writing integration tests earlier (Sarah)
    - Reviewing PRs within 4 hours (John)
    - Adding performance tests (Mike)

    STOP:
    - Taking on unplanned work mid-sprint (Lisa)
    - Skipping backlog refinement (Team)
    - Working late to meet deadlines (Sarah)

    CONTINUE:
    - Excellent communication (Team)
    - Helping each other with blockers (Team)
    - Thorough code reviews (John)

    14:20 - Generate Insights
    Discussion identifies patterns:
    - Taking unplanned work derailed sprint goal
    - Late work indicates overcommitment
    - Code quality good but testing could improve

    14:40 - Decide What to Do
    Action Items:
    1. Implement "no new work" policy after Day 3 of sprint
       Owner: Scrum Master
       Due: Immediate

    2. Add performance test task to DoD checklist
       Owner: Mike
       Due: Sprint 4

    3. Set up automated PR review reminders (4-hour SLA)
       Owner: John
       Due: Sprint 4

    4. Protect team from mid-sprint interruptions
       Owner: Scrum Master
       Due: Ongoing

    5. Reduce sprint commitment by 10% to prevent overwork
       Owner: Team
       Due: Sprint 4 Planning

    15:00 - Close Retrospective
    - Team commits to action items
    - Scrum Master will track progress
    - Next retrospective will review these actions

    15:10 - Retrospective Complete
    */
  }

  // Retrospective Prime Directive
  public static final String PRIME_DIRECTIVE =
    "Regardless of what we discover, we understand and truly believe " +
    "that everyone did the best job they could, given what they knew " +
    "at the time, their skills and abilities, the resources available, " +
    "and the situation at hand.";

  // Anti-Patterns
  public void retrospectiveAntiPatterns() {
    /*
    ❌ Same format every sprint (gets stale)
    ✅ Rotate formats to keep fresh

    ❌ No action items or follow-through
    ✅ Create specific, measurable actions

    ❌ Blaming individuals
    ✅ Focus on process and system improvements

    ❌ Management or stakeholders present
    ✅ Team only - safe environment

    ❌ Skipping retrospective when "went well"
    ✅ Always reflect, even on good sprints

    ❌ Too many action items
    ✅ Focus on 1-3 key improvements

    ❌ Vague improvements ("communicate better")
    ✅ Specific actions with owners and dates
    */
  }
}

// 4. Backlog Refinement
public class BacklogRefinement {

  // Structure and Format
  public void conductRefinement() {
    /*
    Time: Mid-sprint (ongoing activity)
    Duration: ~10% of sprint (2-4 hours per 2-week sprint)
    Participants: Scrum Team
    Frequency: Weekly or multiple sessions

    Activities:
    - Review upcoming stories
    - Add acceptance criteria
    - Break down large stories
    - Estimate stories
    - Clarify requirements
    - Order backlog by priority

    Goal: Prepare stories for Sprint Planning
    Stories should be "ready" (meet Definition of Ready)
    */
  }

  // Refinement Agenda
  public void refinementAgenda() {
    /*
    Backlog Refinement Session (2 hours)

    14:00 - Review top 5 priority stories
    - Product Owner explains each story
    - Team asks clarifying questions
    - Identify missing information

    14:30 - Add acceptance criteria
    - Product Owner defines "done" for each story
    - Team provides input on edge cases
    - Document in Gherkin format (Given-When-Then)

    15:00 - Break

    15:10 - Story estimation
    - Planning poker for each story
    - Discuss complexity and unknowns
    - Split stories > 8 points

    15:40 - Identify dependencies
    - Technical dependencies
    - External dependencies
    - Risks and unknowns

    15:50 - Update backlog order
    - Confirm priorities
    - Ensure top 1-2 sprints are ready

    16:00 - Refinement complete
    */
  }

  // Definition of Ready
  public boolean isStoryReady(UserStory story) {
    /*
    Story is Ready when:
    ✓ User story format complete (As a...I want...So that...)
    ✓ Business value is clear
    ✓ Acceptance criteria defined
    ✓ Story is estimated
    ✓ Dependencies identified
    ✓ Story is testable
    ✓ Story is small enough (≤ 8 points)
    ✓ Team understands requirements

    Ready backlog = efficient Sprint Planning
    */
    return story.hasUserStoryFormat() &&
           story.hasAcceptanceCriteria() &&
           story.isEstimated() &&
           story.isSmall() &&
           story.isTestable();
  }

  // Example Refinement Session
  public static void exampleRefinement() {
    /*
    Story: "User can reset forgotten password"

    Before Refinement:
    - Vague description
    - No acceptance criteria
    - Not estimated
    - Implementation unclear

    During Refinement:

    Product Owner: "Users often forget passwords and need a way
    to reset them without contacting support."

    Team Questions:
    - How is identity verified? (Email link)
    - How long is reset link valid? (1 hour)
    - Can old password be reused? (No, last 5 passwords)
    - What if email doesn't arrive? (Resend option)
    - What about expired accounts? (Show account status)

    Updated Story:
    As a user with forgotten password
    I want to reset my password via email
    So that I can regain access to my account without contacting support

    Acceptance Criteria:
    1. Given I click "Forgot Password"
       When I enter my email
       Then I receive password reset email within 5 minutes

    2. Given I click reset link in email
       When link is less than 1 hour old
       Then I see password reset form

    3. Given I enter new password
       When new password is different from last 5 passwords
       Then my password is updated

    4. Given reset link is expired
       When I click link
       Then I see "Link expired" message
       And option to request new link

    5. Given I enter invalid email
       When I submit forgot password
       Then I see "If account exists, email sent" (security)

    Estimated: 5 story points

    Dependencies: Email service must be configured

    Story is now READY for Sprint Planning
    */
  }
}

// 5. Ceremony Calendar
public class ScrumCalendar {
  /*
  2-Week Sprint Schedule

  Week 1:
  ───────
  Monday 09:00   - Sprint Planning (4 hours)
  Monday 14:00   - Sprint work begins

  Tuesday 09:00  - Daily Scrum (15 min)
  Wednesday 09:00- Daily Scrum (15 min)
  Wednesday 14:00- Backlog Refinement (2 hours)
  Thursday 09:00 - Daily Scrum (15 min)
  Friday 09:00   - Daily Scrum (15 min)

  Week 2:
  ───────
  Monday 09:00   - Daily Scrum (15 min)
  Tuesday 09:00  - Daily Scrum (15 min)
  Wednesday 09:00- Daily Scrum (15 min)
  Thursday 09:00 - Daily Scrum (15 min)

  Friday 09:00   - Daily Scrum (15 min)
  Friday 10:00   - Sprint Review (2 hours)
  Friday 13:00   - Sprint Retrospective (1.5 hours)
  Friday 15:00   - Sprint ends

  Next Monday: New Sprint Planning
  */
}`
      }
    },
    {
      id: 6,
      name: 'Agile Estimation',
      icon: '🎯',
      color: '#06b6d4',
      description: 'Story points and velocity tracking',
      content: {
        explanation: 'Agile estimation uses relative sizing instead of hours to estimate work. Story Points represent the effort, complexity, and uncertainty of a user story relative to other stories. Teams use Planning Poker with Fibonacci sequence (1, 2, 3, 5, 8, 13) to estimate collaboratively, promoting discussion and consensus. Velocity is the average story points completed per sprint, used for forecasting and capacity planning. T-shirt sizing (XS, S, M, L, XL) provides rough estimates for epics. Estimation focuses on comparing stories rather than predicting exact time.',
        keyPoints: [
          'Story Points: Relative sizing representing effort, complexity, and risk',
          'Fibonacci Sequence: 1, 2, 3, 5, 8, 13, 21 - larger numbers = more uncertainty',
          'Planning Poker: Team estimation technique using cards, promotes discussion',
          'Velocity: Average story points completed per sprint, used for forecasting',
          'T-shirt Sizing: XS, S, M, L, XL for initial rough estimates',
          'Reference Story: Baseline story (typically 3 points) to compare against',
          'Re-estimation: Dont re-estimate completed stories, use original estimate for velocity',
          'Estimation maturity: Teams get better at estimation over time'
        ],
        codeExample: `// Agile Estimation Implementation

// 1. Story Points Fundamentals
public class StoryPoints {

  // Fibonacci Scale (most common)
  /*
  1 point  - Trivial, almost no effort
    Example: Change button text
    Effort: 1-2 hours
    Complexity: None
    Risk: None

  2 points - Very simple, minimal effort
    Example: Add new field to form
    Effort: 2-4 hours
    Complexity: Low
    Risk: Low

  3 points - Simple, straightforward
    Example: Create new API endpoint (CRUD)
    Effort: 4-8 hours (about 1 day)
    Complexity: Low-Medium
    Risk: Low

  5 points - Moderate complexity
    Example: User login with JWT authentication
    Effort: 1-2 days
    Complexity: Medium
    Risk: Medium

  8 points - Complex, significant effort
    Example: Product search with filters
    Effort: 2-4 days
    Complexity: High
    Risk: Medium-High

  13 points - Very complex, should split
    Example: Complete checkout flow
    Effort: 4+ days
    Complexity: Very High
    Risk: High

  21+ points - Epic, must split into smaller stories
  */

  // Why Fibonacci?
  /*
  - Reflects uncertainty: larger estimates = more uncertainty
  - Prevents false precision (no 3.5 or 4 points)
  - Forces distinction between sizes
  - Natural sequence in nature and mathematics
  */

  // Story Point Components
  public int estimateStory(UserStory story) {
    int effort = estimateEffort(story);        // How much work?
    int complexity = estimateComplexity(story); // How difficult?
    int uncertainty = estimateUncertainty(story); // How much risk?

    // Story points consider all three dimensions
    // Not just time!
    return calculateStoryPoints(effort, complexity, uncertainty);
  }
}

// 2. Planning Poker Process
public class PlanningPoker {

  // Team-based estimation technique
  public int conductPlanningPoker(UserStory story, List<TeamMember> team) {
    /*
    Step 1: Product Owner reads story
    "As a user, I want to reset my password via email,
     so that I can regain access to my account"

    Step 2: Team asks clarifying questions
    - How is identity verified?
    - How long is reset link valid?
    - What about security requirements?
    - Any integration with email service?

    Step 3: Each team member selects estimate card (1,2,3,5,8,13)
    Sarah:   3 points
    John:    5 points
    Mike:    5 points
    Lisa:    8 points

    Step 4: Reveal cards simultaneously (no anchoring)

    Step 5: Discuss differences
    Lisa (8): "Email service integration is complex. We need
               to handle retries, failures, and security."

    Sarah (3): "We already have email service. This is just
                creating reset token and sending email."

    Step 6: Discussion and re-vote
    After discussion:
    Sarah:   5 points (agreed complexity higher)
    John:    5 points
    Mike:    5 points
    Lisa:    5 points

    Step 7: Consensus reached - Story estimated at 5 points

    If no consensus after 2-3 rounds:
    - Take average or higher estimate
    - Or identify what's unclear and defer estimation
    */

    return conductVote(story, team);
  }

  // Planning Poker Cards
  /*
  Standard Deck:
  0   - No effort (documentation change)
  ½   - Minimal effort (not commonly used)
  1   - Trivial
  2   - Very simple
  3   - Simple
  5   - Moderate
  8   - Complex
  13  - Very complex
  20  - Epic (split)
  40  - Epic (definitely split)
  100 - Epic (way too big)
  ?   - Need more information
  ∞   - Too large/undefined to estimate
  ☕   - Need a break!
  */

  // Remote Planning Poker
  public void remotePlanningPoker() {
    /*
    Tools:
    - PlanningPoker.com
    - Scrum Poker Online
    - Planning Poker in Jira
    - Miro/Mural virtual cards

    Best Practices:
    ✓ Use video calls (see reactions)
    ✓ Screen share story details
    ✓ Use timer for discussions
    ✓ Digital polling for reveals
    */
  }
}

// 3. Velocity Tracking
public class VelocityTracker {

  // Calculate velocity
  public double calculateVelocity(List<Sprint> sprints) {
    /*
    Sprint 1: 18 points completed
    Sprint 2: 22 points completed
    Sprint 3: 20 points completed
    Sprint 4: 16 points completed (team member out sick)
    Sprint 5: 21 points completed
    Sprint 6: 23 points completed

    Average Velocity: 20 points per sprint

    Use rolling average (last 3-6 sprints)
    Ignore outliers (abnormal sprints)
    */

    return sprints.stream()
      .mapToInt(Sprint::getCompletedPoints)
      .average()
      .orElse(0);
  }

  // Velocity for Forecasting
  public void forecastRelease(ProductBacklog backlog, double velocity) {
    /*
    Product Backlog:
    Epic 1: User Authentication (35 points)
    Epic 2: Product Catalog (48 points)
    Epic 3: Shopping Cart (28 points)
    Epic 4: Checkout (42 points)
    Total: 153 points

    Team Velocity: 20 points per sprint (2 weeks)

    Forecast:
    153 points ÷ 20 points/sprint = 7.65 sprints
    = 8 sprints × 2 weeks = 16 weeks to complete

    With buffer (20%): 16 weeks × 1.2 = ~19 weeks

    Target Release Date: ~5 months from now
    */

    int totalPoints = backlog.getTotalPoints();
    int sprintsNeeded = (int) Math.ceil(totalPoints / velocity);
    int weeksNeeded = sprintsNeeded * 2; // 2-week sprints

    System.out.println("Estimated completion: " + weeksNeeded + " weeks");
  }

  // Velocity Chart
  public void displayVelocityChart() {
    /*
    Story Points
    30 │
       │              ╭─●
    25 │         ╭────╯
       │    ╭────╯
    20 │────●────●────●─── Average Velocity
       │    │    │    │
    15 │    │    │    │
       │    │    │    │
    10 │    │    │    │
       └────┴────┴────┴────
         S1   S2   S3   S4   Sprint

    Committed vs Completed:
    Sprint 3: Committed 25, Completed 23
    Sprint 4: Committed 22, Completed 22
    Sprint 5: Committed 20, Completed 24 (under-committed)
    */
  }

  // Velocity Anti-Patterns
  public void velocityAntiPatterns() {
    /*
    ❌ Treating velocity as productivity metric
    ✅ Use for planning, not performance evaluation

    ❌ Comparing team velocities
    ✅ Story points are team-specific

    ❌ Pressuring team to increase velocity
    ✅ Let velocity stabilize naturally

    ❌ Re-estimating completed stories
    ✅ Use original estimates for historical velocity

    ❌ Adding hours to calculate velocity
    ✅ Velocity is in story points only

    ❌ Gaming estimates to hit velocity targets
    ✅ Honest estimates maintain forecasting accuracy
    */
  }
}

// 4. T-Shirt Sizing
public class TShirtSizing {

  // Initial rough estimates for epics
  public enum Size {
    XS,  // Extra Small: 1-2 sprints, 20-40 points
    S,   // Small: 2-3 sprints, 40-60 points
    M,   // Medium: 3-5 sprints, 60-100 points
    L,   // Large: 5-8 sprints, 100-160 points
    XL   // Extra Large: 8+ sprints, 160+ points (split!)
  }

  // Example T-Shirt Sizing
  /*
  Epic: E-commerce Platform

  XS - User Profile Management
       (Edit profile, change password, manage preferences)

  S  - Product Catalog
       (Browse products, search, filters, product details)

  M  - Shopping Cart & Checkout
       (Add to cart, modify cart, checkout flow, payment)

  L  - Order Management
       (Order history, tracking, returns, notifications)

  XL - Admin Dashboard
       (Product management, user management, analytics, reports)
       >> Too large! Split into smaller epics

  Benefits:
  - Quick estimates without details
  - Good for portfolio/roadmap planning
  - Easy for non-technical stakeholders
  - Converts to story points later
  */

  public int convertToStoryPoints(Size size, int velocity) {
    // Rough conversion
    return switch (size) {
      case XS -> velocity * 1;   // 1 sprint worth
      case S  -> velocity * 2;   // 2 sprints
      case M  -> velocity * 4;   // 4 sprints
      case L  -> velocity * 7;   // 7 sprints
      case XL -> velocity * 12;  // Way too big!
    };
  }
}

// 5. Estimation Techniques
public class EstimationTechniques {

  // Technique 1: Reference Stories
  public void referenceStoryMethod() {
    /*
    Select baseline reference stories:

    1 point: Change button color
    2 points: Add validation to form field
    3 points: Create simple CRUD API endpoint (REFERENCE)
    5 points: User login with authentication
    8 points: Product search with filters

    Compare new stories to reference:
    "Is this story bigger or smaller than reference (3 points)?"
    "Is it twice as complex? Use 5 points"
    "Is it simpler? Use 2 points"
    */
  }

  // Technique 2: Affinity Mapping
  public void affinityMapping() {
    /*
    Physical or virtual board with columns:

    1    2    3    5    8    13
    ────────────────────────────
    [Story cards moved to appropriate columns]

    Process:
    1. Place all story cards on table
    2. Team silently sorts stories into columns
    3. Discuss stories in wrong columns
    4. Move until consensus
    5. Fast estimation for many stories
    */
  }

  // Technique 3: Bucket System
  public void bucketSystem() {
    /*
    Similar to affinity mapping but uses buckets:
    0, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ∞

    Fast estimation for large backlog refinement
    Rough estimates, refined later with Planning Poker
    */
  }

  // Technique 4: Relative Mass Valuation
  public void relativeMassValuation() {
    /*
    Compare stories like comparing weights:
    - Story A is twice as heavy as Story B
    - Story C is half of Story A
    - Builds relative understanding
    */
  }
}

// 6. Estimation Maturity
public class EstimationMaturity {

  /*
  Sprint 1-3: Estimation Variance High
  ══════════════════════════════════════
  Team still learning, estimates off by 50%+
  Velocity unstable (15-30 points)
  Many stories incomplete
  Re-estimation needed

  Sprint 4-8: Estimation Improving
  ══════════════════════════════════════
  Better understanding of complexity
  Estimates off by 20-30%
  Velocity stabilizing (18-22 points)
  Fewer incomplete stories

  Sprint 9+: Estimation Mature
  ══════════════════════════════════════
  Accurate relative sizing
  Estimates consistently close to actual
  Stable velocity (19-21 points)
  Predictable sprint outcomes
  */

  public void estimationCalibration() {
    /*
    Review completed stories:
    - Was 5-point story actually 5 points?
    - Did 2-point story take as long as expected?
    - Adjust understanding for future estimates

    Don't change historical estimates!
    Learn from differences for next time
    */
  }
}

// 7. Estimation Metrics
public class EstimationMetrics {

  // Burndown Chart
  public void burndownChart() {
    /*
    Story Points Remaining

    40 │●
       │ ╲
    30 │  ●
       │   ╲
    20 │    ●
       │     ╲  Ideal
    10 │      ●─╲─
       │         ╲●
     0 │          ●
       └───────────────── Sprint Days
         0 2 4 6 8 10

    Shows remaining work over sprint
    Track if team is on pace
    Identify scope increases
    */
  }

  // Burnup Chart
  public void burnupChart() {
    /*
    Story Points

    60 │          ╭──── Total Scope
       │        ╭─╯
    40 │      ╭─╯
       │    ╭─╯
    20 │  ╭─╯  ●────●────● Completed
       │ ╯    ╱
     0 │    ╱
       └──────────────────── Sprints
         1   2   3   4   5

    Shows work completed over time
    Shows scope changes
    Better for releases (multiple sprints)
    */
  }

  // Cumulative Flow Diagram
  public void cumulativeFlowDiagram() {
    /*
    Visualizes work in different states over time
    Helps identify bottlenecks
    Shows WIP (Work in Progress)
    */
  }
}

// 8. Estimation Best Practices
public class EstimationBestPractices {
  /*
  ✓ Estimate as a team (whole team)
  ✓ Use relative sizing, not hours
  ✓ Base estimates on current team composition
  ✓ Include all work (dev, test, review)
  ✓ Re-estimate only if requirements change significantly
  ✓ Track velocity for 3-6 sprints before forecasting
  ✓ Don't compare velocities between teams
  ✓ Use estimates for planning, not judging performance
  ✓ Split stories > 13 points
  ✓ Focus on conversation during estimation
  ✓ Capture learning from completed stories
  ✓ Don't pad estimates with buffers (already in points)

  ✗ Don't estimate in hours
  ✗ Don't let one person estimate alone
  ✗ Don't pressure team on velocity
  ✗ Don't re-estimate completed stories
  ✗ Don't treat story points as commitments
  ✗ Don't use velocity as productivity metric
  ✗ Don't estimate every task, only user stories
  ✗ Don't change estimates to fit in sprint
  */
}`
      }
    },
    {
      id: 7,
      name: 'Agile Best Practices',
      icon: '✨',
      color: '#84cc16',
      description: 'Definition of Done and continuous improvement',
      content: {
        explanation: 'Agile Best Practices ensure teams deliver high-quality software sustainably. The Definition of Done (DoD) is a shared understanding of what "complete" means, ensuring consistent quality standards. Continuous improvement happens through retrospectives and experimentation. Team collaboration involves pair programming, code reviews, and knowledge sharing. Velocity tracking and burndown charts provide transparency. Limit work-in-progress to maintain focus. Embrace change and feedback. Maintain sustainable pace to prevent burnout. Metrics like velocity, cycle time, and defect rates guide improvement.',
        keyPoints: [
          'Definition of Done: Shared checklist ensuring every story meets quality standards',
          'Continuous Improvement: Regular retrospectives with actionable improvements',
          'Team Collaboration: Pair programming, code reviews, collective ownership',
          'Velocity Tracking: Historical average used for capacity planning and forecasting',
          'Burndown Charts: Visualize sprint progress and remaining work',
          'Limit WIP: Focus on completing stories before starting new ones',
          'Sustainable Pace: 40-hour weeks, avoid overtime, prevent burnout',
          'Metrics: Track velocity, cycle time, defect rate, customer satisfaction'
        ],
        codeExample: `// Agile Best Practices Implementation

// 1. Definition of Done (DoD)
public class DefinitionOfDone {

  // Comprehensive DoD Checklist
  public boolean isStoryDone(UserStory story) {
    /*
    DEVELOPMENT COMPLETE
    ══════════════════════════════════════════════
    ✓ Code written and follows coding standards
    ✓ Code checked into version control (Git)
    ✓ Feature branch merged to main/develop
    ✓ No compiler warnings
    ✓ No code quality issues (SonarQube clean)
    ✓ Technical debt identified and documented

    TESTING COMPLETE
    ══════════════════════════════════════════════
    ✓ Unit tests written and passing (>80% coverage)
    ✓ Integration tests written and passing
    ✓ Acceptance criteria verified
    ✓ Manual testing completed
    ✓ Regression testing passed
    ✓ No critical or high-priority bugs
    ✓ Performance acceptable (meets SLA)
    ✓ Security review completed

    CODE REVIEW COMPLETE
    ══════════════════════════════════════════════
    ✓ Peer review completed
    ✓ At least one approval from team member
    ✓ Review feedback addressed
    ✓ Architecture review (if needed)

    DOCUMENTATION COMPLETE
    ══════════════════════════════════════════════
    ✓ API documentation updated
    ✓ README updated (if needed)
    ✓ Release notes updated
    ✓ User documentation updated (if customer-facing)
    ✓ Runbooks updated (if operational changes)

    DEPLOYMENT READY
    ══════════════════════════════════════════════
    ✓ Deployed to staging environment
    ✓ Smoke tests passing on staging
    ✓ Product Owner acceptance obtained
    ✓ Ready for production deployment
    ✓ Rollback plan documented
    ✓ Database migrations tested

    NON-FUNCTIONAL REQUIREMENTS
    ══════════════════════════════════════════════
    ✓ Performance requirements met
    ✓ Security requirements met
    ✓ Accessibility requirements met (WCAG)
    ✓ Browser compatibility verified
    ✓ Mobile responsiveness verified
    ✓ Monitoring/alerting configured
    */

    return story.isDevelopmentComplete() &&
           story.isTestingComplete() &&
           story.isReviewed() &&
           story.isDocumented() &&
           story.isDeploymentReady() &&
           story.meetsNonFunctionalRequirements();
  }

  // DoD varies by team and context
  /*
  Early-stage startup DoD (minimal):
  ✓ Code works
  ✓ Manually tested
  ✓ Deployed to production

  Enterprise DoD (comprehensive):
  ✓ All automated tests passing
  ✓ Security scan clean
  ✓ Performance tested
  ✓ Compliance requirements met
  ✓ Documentation complete
  ✓ Multiple environment deployments
  */
}

// 2. Continuous Improvement
public class ContinuousImprovement {

  // Track improvement metrics
  public void trackImprovements(List<Sprint> sprints) {
    /*
    Velocity Trend:
    Sprint 1: 15 points
    Sprint 2: 18 points
    Sprint 3: 20 points
    Sprint 4: 21 points
    Sprint 5: 22 points
    → Improving velocity (team maturing)

    Defect Trend:
    Sprint 1: 12 bugs
    Sprint 2: 8 bugs
    Sprint 3: 5 bugs
    Sprint 4: 3 bugs
    Sprint 5: 2 bugs
    → Improving quality

    Code Coverage:
    Sprint 1: 45%
    Sprint 2: 58%
    Sprint 3: 68%
    Sprint 4: 75%
    Sprint 5: 82%
    → Improving test coverage
    */
  }

  // Kaizen (Small continuous improvements)
  public void implementKaizen() {
    /*
    Sprint 1 Improvement:
    - Add pre-commit hooks for code formatting

    Sprint 2 Improvement:
    - Implement parallel test execution (tests run 3x faster)

    Sprint 3 Improvement:
    - Add automated deployment to staging

    Sprint 4 Improvement:
    - Create story template with acceptance criteria

    Sprint 5 Improvement:
    - Implement feature flags for safer deployments

    Small changes compound over time!
    */
  }

  // Retrospective Action Tracking
  public class ActionItem {
    private String action;
    private String owner;
    private String dueDate;
    private String status;

    // Example:
    /*
    Action: Set up automated PR review reminders
    Owner: John
    Due: Sprint 4
    Status: Complete

    Action: Reduce sprint commitment by 10%
    Owner: Team
    Due: Sprint 4 Planning
    Status: In Progress

    Action: Add performance tests to DoD
    Owner: Mike
    Due: Sprint 4
    Status: Complete
    */
  }

  // Learning culture
  public void fosterLearning() {
    /*
    ✓ Lunch & Learn sessions (weekly)
    ✓ Tech talks (bi-weekly)
    ✓ Conference attendance
    ✓ Internal training budget
    ✓ Pair programming (knowledge sharing)
    ✓ Code reviews (learning opportunity)
    ✓ Documentation as you go
    ✓ Failure retrospectives (blameless)
    */
  }
}

// 3. Team Collaboration Practices
public class TeamCollaboration {

  // Pair Programming
  public void pairProgramming() {
    /*
    Driver (typing):
    - Writes code
    - Focuses on tactical details
    - Implements solution

    Navigator (reviewing):
    - Reviews code as it's written
    - Thinks strategically
    - Suggests improvements
    - Catches errors early

    Benefits:
    ✓ Higher code quality
    ✓ Knowledge sharing
    ✓ Fewer bugs
    ✓ Better design discussions
    ✓ Onboarding new team members
    ✓ Complex problems solved faster

    When to pair:
    - Complex features
    - Critical functionality
    - Bug fixing
    - Code reviews
    - Knowledge transfer
    - Learning new technology
    */
  }

  // Code Review Best Practices
  public class CodeReview {
    /*
    Reviewer Checklist:
    ✓ Does code meet requirements?
    ✓ Is code readable and maintainable?
    ✓ Are there tests?
    ✓ Are there edge cases missed?
    ✓ Are there security issues?
    ✓ Is error handling appropriate?
    ✓ Is performance acceptable?
    ✓ Does it follow team conventions?

    Review Guidelines:
    - Review within 4 hours
    - Provide constructive feedback
    - Ask questions, don't command
    - Praise good code
    - Focus on code, not person
    - Use automated tools first (linters)

    Good Comment:
    "Consider using a HashMap here for O(1) lookup
     instead of iterating through the list (O(n))"

    Bad Comment:
    "This is wrong. Use a HashMap."
    */
  }

  // Daily Standup Effectiveness
  public void effectiveStandup() {
    /*
    ✓ Same time, same place daily
    ✓ Exactly 15 minutes (use timer)
    ✓ Stand up (keeps it short)
    ✓ Focus on Sprint Goal progress
    ✓ Identify blockers immediately
    ✓ Park detailed discussions
    ✓ Update task board during standup
    ✓ Anyone can facilitate (not just Scrum Master)

    Red Flags:
    ✗ Standup runs over 20 minutes
    ✗ Detailed problem solving during standup
    ✗ Status reports to manager
    ✗ People arrive late consistently
    ✗ No discussion of blockers
    ✗ Team members unprepared
    */
  }

  // Team Norms and Working Agreements
  public void teamNorms() {
    /*
    Example Team Working Agreement:

    Core Hours:
    - Team available 10 AM - 3 PM daily
    - Flexible outside core hours

    Communication:
    - Slack for quick questions
    - Video calls for discussions
    - Email for external communication
    - Response time: 2 hours during core hours

    Code Standards:
    - Follow team coding conventions
    - Code reviews within 4 hours
    - All tests must pass before merge
    - No commits directly to main

    Meetings:
    - Cameras on for team meetings
    - Decline meetings if not needed
    - Send agenda 24 hours before
    - Start and end on time

    Work-Life Balance:
    - No expectation to work evenings/weekends
    - Take time off when needed
    - Respect PTO - no work contact
    - Support each other
    */
  }
}

// 4. Metrics and Measurement
public class AgileMetrics {

  // Velocity (Story Points per Sprint)
  public double calculateVelocity(List<Sprint> sprints) {
    return sprints.stream()
      .mapToInt(Sprint::getCompletedPoints)
      .average()
      .orElse(0);
  }

  // Cycle Time (Time from start to done)
  public long calculateCycleTime(UserStory story) {
    /*
    Story started: Jan 10, 9:00 AM
    Story completed: Jan 12, 3:00 PM
    Cycle Time: 2.25 days

    Target: Stories < 5 points should complete in 2-3 days
    */
    return ChronoUnit.HOURS.between(
      story.getStartTime(),
      story.getCompletionTime()
    ) / 24;
  }

  // Lead Time (Time from request to delivery)
  public long calculateLeadTime(UserStory story) {
    /*
    Story created: Jan 5
    Story delivered: Jan 12
    Lead Time: 7 days

    Includes time in backlog waiting to be started
    */
    return ChronoUnit.DAYS.between(
      story.getCreationTime(),
      story.getDeliveryTime()
    );
  }

  // Sprint Burndown
  public void trackBurndown(Sprint sprint) {
    /*
    Day 0: 40 points remaining
    Day 2: 35 points remaining
    Day 4: 28 points remaining
    Day 6: 22 points remaining
    Day 8: 12 points remaining
    Day 10: 0 points remaining ✓

    Ideal vs Actual burndown shows if on track
    */
  }

  // Defect Density
  public double calculateDefectDensity(Sprint sprint) {
    /*
    Bugs found: 5
    Story points delivered: 20
    Defect Density: 0.25 bugs per point

    Track over time:
    Sprint 1: 0.50 bugs/point
    Sprint 2: 0.35 bugs/point
    Sprint 3: 0.25 bugs/point
    Sprint 4: 0.20 bugs/point
    → Quality improving
    */
    return (double) sprint.getBugCount() / sprint.getCompletedPoints();
  }

  // Sprint Goal Success Rate
  public double sprintGoalSuccessRate(List<Sprint> sprints) {
    /*
    Last 6 sprints:
    Sprint 1: Goal met ✓
    Sprint 2: Goal partially met ⚠
    Sprint 3: Goal met ✓
    Sprint 4: Goal met ✓
    Sprint 5: Goal not met ✗
    Sprint 6: Goal met ✓

    Success Rate: 67% (4/6 fully met)
    */
    long successfulSprints = sprints.stream()
      .filter(Sprint::isGoalMet)
      .count();

    return (double) successfulSprints / sprints.size();
  }

  // Team Happiness Metric
  public void trackTeamMorale() {
    /*
    Weekly happiness survey (1-5 scale):

    Week 1: 4.2 average
    Week 2: 4.5 average
    Week 3: 3.8 average (investigate drop)
    Week 4: 4.3 average (improved after retrospective)

    Track trends and address issues
    Happy teams are productive teams
    */
  }
}

// 5. Sustainable Pace
public class SustainablePace {

  // Work-life balance
  public void maintainSustainablePace() {
    /*
    40-hour work weeks
    ══════════════════════════════════════════════
    ✓ No expectation of overtime
    ✓ No weekend work (except critical issues)
    ✓ Respect PTO and time off
    ✓ Flexible hours when possible
    ✓ No late-night deployments regularly

    Signs of unsustainable pace:
    ✗ Team working nights/weekends regularly
    ✗ Increasing bugs and technical debt
    ✗ Declining velocity over time
    ✗ Team burnout and turnover
    ✗ Decreased code quality
    ✗ Missing sprint goals repeatedly

    Solutions:
    ✓ Reduce sprint commitment
    ✓ Add buffer time
    ✓ Invest in technical debt
    ✓ Improve estimation
    ✓ Protect team from interruptions
    ✓ Hire additional team members
    */
  }

  // Technical Debt Management
  public void manageTechnicalDebt() {
    /*
    Allocate 20% of sprint capacity to technical debt

    Sprint capacity: 20 points
    New features: 16 points (80%)
    Tech debt: 4 points (20%)

    Tech debt work:
    - Refactoring
    - Upgrading dependencies
    - Improving test coverage
    - Fixing performance issues
    - Improving deployment pipeline
    - Documentation

    Don't let debt accumulate!
    */
  }
}

// 6. Agile Anti-Patterns to Avoid
public class AgileAntiPatterns {
  /*
  ❌ Scrum-but
  "We do Scrum, but we skip retrospectives"
  "We do Scrum, but Product Owner is never available"
  ✅ Follow Scrum framework completely or adapt transparently

  ❌ Agile Theater
  Going through motions without embracing mindset
  ✅ Focus on principles, not just rituals

  ❌ Mini-Waterfall Sprints
  Requirements → Design → Development → Testing in sequence
  ✅ Cross-functional work throughout sprint

  ❌ Velocity as Performance Metric
  Comparing teams, pressuring to increase velocity
  ✅ Use velocity for planning only

  ❌ Changing Sprint Length
  2-week sprints, then 3-week, then 1-week
  ✅ Consistent sprint length

  ❌ Not Protecting Sprint
  Adding work mid-sprint, changing requirements
  ✅ Protect sprint commitment

  ❌ Skipping Ceremonies
  "Too busy to do retrospective"
  ✅ All ceremonies are essential

  ❌ Large Teams
  12-person "Agile team"
  ✅ Keep teams 5-9 people, split if larger

  ❌ No Definition of Done
  "Done" means different things
  ✅ Clear shared DoD

  ❌ Technical Stories
  "Refactor database" without user value
  ✅ Frame work in terms of user value
  */
}

// 7. Scaling Agile
public class ScalingAgile {
  /*
  Single Team: Pure Scrum
  ══════════════════════════════════════════════
  5-9 people, one Product Owner, one Scrum Master

  Multiple Teams (2-9 teams): Scrum of Scrums
  ══════════════════════════════════════════════
  - Representatives from each team meet daily
  - Coordinate dependencies
  - Resolve cross-team impediments
  - Synchronize integrations

  Large Organizations: SAFe, LeSS, or Spotify Model
  ══════════════════════════════════════════════
  SAFe (Scaled Agile Framework):
  - Program Increments (PI) - 8-12 week cycles
  - Multiple Agile Release Trains
  - Portfolio, Program, Team levels

  LeSS (Large-Scale Scrum):
  - One Product Backlog
  - One Definition of Done
  - One Sprint across all teams

  Spotify Model:
  - Squads (small teams)
  - Tribes (collection of squads)
  - Chapters (functional groups)
  - Guilds (communities of interest)

  Key Principles for Scaling:
  ✓ Keep teams small and autonomous
  ✓ Minimize dependencies between teams
  ✓ Clear interfaces and contracts
  ✓ Shared Product Backlog
  ✓ Synchronized sprints
  ✓ Regular cross-team sync
  */
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
          🔄 Agile & Scrum
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
          Comprehensive Agile and Scrum guide covering Agile principles, Scrum framework, sprint planning,
          user stories, Scrum ceremonies, estimation techniques, and best practices for continuous improvement.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          agileScrumTopics.map((topic) => (
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
                Agile & Scrum Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {agileScrumTopics.map((topic) => (
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

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Examples
                </h4>
                <div style={{
                  backgroundColor: '#1e293b',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #334155'
                }}>
                  <SyntaxHighlighter code={selectedTopic.content.codeExample} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AgileScrum

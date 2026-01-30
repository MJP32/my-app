/**
 * Agile & Scrum Section - Tab Template Format
 *
 * Converted to use modal-based navigation with concepts and details.
 * Each concept is a main category with multiple detail tabs.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Main topic colors - cyan theme for Agile/Scrum
 */
const AGILE_COLORS = {
  primary: '#0891b2',           // Cyan main color
  primaryHover: '#06b6d4',      // Cyan hover
  bg: 'rgba(8, 145, 178, 0.1)', // Cyan background
  border: 'rgba(8, 145, 178, 0.3)', // Cyan border
  arrow: '#0891b2',             // Arrow color
  hoverBg: 'rgba(8, 145, 178, 0.2)', // Hover background
  topicBg: 'rgba(8, 145, 178, 0.15)' // Topic card background
}

/**
 * Alternating colors for subtopic detail explanations
 */
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const AgilePrinciplesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="agile-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0891b2" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Agile Manifesto Values</text>

    {/* Value 1 */}
    <rect x="30" y="50" width="160" height="50" rx="8" fill="#0891b2" stroke="#06b6d4" strokeWidth="2"/>
    <text x="110" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`Individuals &`}</text>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Interactions</text>
    <text x="215" y="75" textAnchor="middle" fill="#64748b" fontSize="11">over</text>
    <rect x="240" y="50" width="160" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
    <text x="320" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">{`Processes &`}</text>
    <text x="320" y="85" textAnchor="middle" fill="#9ca3af" fontSize="10">Tools</text>

    {/* Value 2 */}
    <rect x="430" y="50" width="160" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="510" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Working</text>
    <text x="510" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Software</text>
    <text x="615" y="75" textAnchor="middle" fill="#64748b" fontSize="11">over</text>
    <rect x="640" y="50" width="130" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
    <text x="705" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">Comprehensive</text>
    <text x="705" y="85" textAnchor="middle" fill="#9ca3af" fontSize="10">Documentation</text>

    {/* Value 3 */}
    <rect x="30" y="120" width="160" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="110" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Customer</text>
    <text x="110" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Collaboration</text>
    <text x="215" y="145" textAnchor="middle" fill="#64748b" fontSize="11">over</text>
    <rect x="240" y="120" width="160" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
    <text x="320" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">Contract</text>
    <text x="320" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">Negotiation</text>

    {/* Value 4 */}
    <rect x="430" y="120" width="160" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="510" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Responding to</text>
    <text x="510" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Change</text>
    <text x="615" y="145" textAnchor="middle" fill="#64748b" fontSize="11">over</text>
    <rect x="640" y="120" width="130" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
    <text x="705" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">Following a</text>
    <text x="705" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">Plan</text>
  </svg>
)

const ScrumFrameworkDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="scrum-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0891b2" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Scrum Framework Overview</text>

    {/* Left side: Roles */}
    <text x="100" y="55" textAnchor="middle" fill="#0891b2" fontSize="12" fontWeight="bold">ROLES</text>
    <rect x="40" y="70" width="120" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="100" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">Product Owner</text>

    <rect x="40" y="120" width="120" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="100" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10">Scrum Master</text>

    <rect x="40" y="170" width="120" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="100" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="10">Dev Team</text>

    {/* Middle: Artifacts */}
    <text x="400" y="55" textAnchor="middle" fill="#0891b2" fontSize="12" fontWeight="bold">ARTIFACTS</text>
    <rect x="310" y="70" width="180" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="400" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">Product Backlog</text>

    <rect x="310" y="120" width="180" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="400" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10">Sprint Backlog</text>

    <rect x="310" y="170" width="180" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="10">Increment</text>

    {/* Right side: Events */}
    <text x="700" y="55" textAnchor="middle" fill="#0891b2" fontSize="12" fontWeight="bold">EVENTS</text>
    <rect x="620" y="70" width="160" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="700" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">Sprint Planning</text>

    <rect x="620" y="120" width="160" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="700" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10">Daily Standup</text>

    <rect x="620" y="170" width="160" height="40" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="700" y="195" textAnchor="middle" fill="#e2e8f0" fontSize="10">Sprint Review</text>
  </svg>
)

const SprintCycleDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="sprint-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0891b2" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Sprint Cycle (2 Weeks)</text>

    <rect x="50" y="50" width="110" height="60" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Day 1</text>
    <text x="105" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Planning</text>

    <line x1="160" y1="80" x2="190" y2="80" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>

    <rect x="190" y="50" width="110" height="60" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="245" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Days 2-9</text>
    <text x="245" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Development</text>

    <line x1="300" y1="80" x2="330" y2="80" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>

    <rect x="330" y="50" width="110" height="60" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="385" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Day 10</text>
    <text x="385" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Review</text>

    <line x1="440" y1="80" x2="470" y2="80" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>

    <rect x="470" y="50" width="110" height="60" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="525" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Day 10</text>
    <text x="525" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">Retro</text>

    <line x1="580" y1="80" x2="610" y2="80" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>

    <rect x="610" y="50" width="110" height="60" rx="6" fill="#0891b2" stroke="#06b6d4" strokeWidth="2"/>
    <text x="665" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Release</text>
    <text x="665" y="92" textAnchor="middle" fill="white" fontSize="9">Deploy</text>
  </svg>
)

const UserStoryFormatDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="story-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0891b2" />
      </marker>
    </defs>

    <rect x="50" y="20" width="700" height="140" rx="8" fill="rgba(8, 145, 178, 0.1)" stroke="#0891b2" strokeWidth="2"/>

    <text x="70" y="45" fill="#06b6d4" fontSize="12" fontWeight="bold">User Story Format:</text>
    <text x="70" y="65" fill="#e2e8f0" fontSize="11">"As a [user role], I want [action], so that [benefit]"</text>

    <text x="70" y="90" fill="#94a3b8" fontSize="10" fontStyle="italic">Example:</text>
    <text x="70" y="108" fill="#e2e8f0" fontSize="10">"As a customer, I want to reset my password, so that I can regain access to my account"</text>

    <text x="70" y="135" fill="#94a3b8" fontSize="9">Acceptance Criteria | Story Points | Priority | Definition of Done</text>
  </svg>
)

const EstimationDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="est-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0891b2" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Story Point Scale</text>

    <circle cx="80" cy="90" r="25" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="80" y="95" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">1</text>
    <text x="80" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Trivial</text>

    <circle cx="200" cy="90" r="25" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="200" y="95" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">3</text>
    <text x="200" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Easy</text>

    <circle cx="320" cy="90" r="30" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="320" y="98" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">5</text>
    <text x="320" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Medium</text>

    <circle cx="450" cy="90" r="30" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="450" y="98" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">8</text>
    <text x="450" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Hard</text>

    <circle cx="580" cy="90" r="35" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="580" y="100" textAnchor="middle" fill="#06b6d4" fontSize="18" fontWeight="bold">13</text>
    <text x="580" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Very Hard</text>

    <circle cx="720" cy="90" r="35" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="720" y="100" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">?</text>
    <text x="720" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Unknown</text>
  </svg>
)

const CeremoniesDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Scrum Ceremonies Timeline</text>

    {/* Sprint Planning */}
    <rect x="40" y="50" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Sprint Planning</text>
    <text x="115" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">4 hours</text>
    <text x="115" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Define sprint goal</text>

    {/* Daily Standup */}
    <rect x="220" y="50" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="295" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Daily Standup</text>
    <text x="295" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">15 min</text>
    <text x="295" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Status update</text>

    {/* Sprint Review */}
    <rect x="400" y="50" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="475" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Sprint Review</text>
    <text x="475" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">2 hours</text>
    <text x="475" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">{`Demo & feedback`}</text>

    {/* Retrospective */}
    <rect x="580" y="50" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="2"/>
    <text x="655" y="75" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Retrospective</text>
    <text x="655" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9">1.5 hours</text>
    <text x="655" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">Team reflection</text>

    {/* Backlog Refinement */}
    <rect x="220" y="140" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="295" y="165" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Refinement</text>
    <text x="295" y="182" textAnchor="middle" fill="#e2e8f0" fontSize="9">Ongoing</text>
    <text x="295" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8">Prep next sprint</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function AgileScrum({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'concept-1',
      name: 'Agile Principles',
      icon: '📜',
      color: '#3b82f6',
      description: 'Core values and 12 principles',
      diagram: AgilePrinciplesDiagram,
      details: [
        {
          name: 'Agile Manifesto',
          explanation: 'The Agile Manifesto is a set of 4 core values that prioritize individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan. These values form the foundation of agile development and guide all agile practices.',
          codeExample: `// Agile Values in Practice

// 1. INDIVIDUALS & INTERACTIONS over processes and tools
// Empower team members to make decisions
public class TeamEmpowerment {
  public void conductDailyStandup() {
    // Face-to-face communication
    // Direct problem solving
    // Immediate feedback loops
  }
}

// 2. WORKING SOFTWARE over comprehensive documentation
// Release incrementally with working features
public class IncrementalRelease {
  public void sprintGoal() {
    // Week 1: Authentication system (working)
    // Week 2: User dashboard (working)
    // Week 3: Admin panel (working)
    // Continuous deployment
  }
}

// 3. CUSTOMER COLLABORATION over contract negotiation
// Involve customer in development
public class CustomerInvolvement {
  public void sprintReview() {
    // Demonstrate features
    // Gather feedback
    // Adjust backlog based on feedback
  }
}

// 4. RESPONDING TO CHANGE over following a plan
// Build flexible, adaptable solutions
public interface PaymentProcessor {
  PaymentResult process(Payment payment);
}

// Add new payment methods without major refactoring
public class CreditCardProcessor implements PaymentProcessor { }
public class PayPalProcessor implements PaymentProcessor { }
public class CryptoProcessor implements PaymentProcessor { }`
        },
        {
          name: 'The 12 Principles',
          explanation: 'The 12 Agile Principles provide specific guidance: prioritize customer satisfaction through continuous delivery, welcome changing requirements, deliver working software frequently, collaborate daily, build projects around motivated individuals, communicate face-to-face, measure progress by working software, maintain sustainable pace, ensure technical excellence and good design, keep things simple, trust self-organizing teams, and continuously improve through reflection.',
          codeExample: `// The 12 Agile Principles

/*
1. Satisfy the customer through continuous delivery
   → Deploy to production every 2 weeks

2. Welcome changing requirements
   → Design for flexibility and extensibility

3. Deliver working software frequently
   → Each sprint produces releasable increment

4. Business & developers work together daily
   → Daily communication and collaboration

5. Build projects around motivated individuals
   → Hire smart people and give them autonomy

6. Most effective communication: face-to-face
   → Use video calls, pair programming, standups

7. Working software is primary measure of progress
   → Track burndown, velocity, delivered features

8. Sustainable pace (40-hour work weeks)
   → Prevent burnout, maintain long-term velocity

9. Technical excellence and good design
   → Code reviews, refactoring, testing

10. Simplicity - maximize work not done
    → YAGNI principle (You Aren't Gonna Need It)

11. Self-organizing teams are most effective
    → Teams decide how to accomplish work

12. Team reflects and adjusts regularly
    → Retrospectives every sprint
*/`
        },
        {
          name: 'Values vs Waterfall',
          explanation: 'Agile methodology fundamentally differs from Waterfall. Waterfall follows a sequential process: requirements, design, implementation, testing, deployment with months between each phase. Agile works in 2-week cycles, delivering working software continuously. Waterfall requires all requirements upfront; Agile embraces changing requirements. Waterfall finds bugs late; Agile catches them immediately. Choose Agile for evolving products, Waterfall only for well-defined projects.',
          codeExample: `// Waterfall vs Agile Timeline

/*
WATERFALL (11 months to first release):
═════════════════════════════════════════

Month 1-2: Requirements gathering
  ✓ Document all features upfront
  ✓ 200-page specification document
  ✗ Can't change requirements later
  ✗ Can't verify assumptions

Month 3-4: Design phase
  ✓ Architecture planned
  ✗ No code yet
  ✗ Design assumptions may be wrong

Month 5-8: Development
  ✓ Developers implement from spec
  ✗ No feedback from users
  ✗ Issues discovered late

Month 9-10: Testing phase
  ✓ QA finds bugs
  ✗ Fixing bugs delays release
  ✗ Major rework needed

Month 11: Deployment
  ✓ Finally in production
  ✗ Customer may not want this anymore
  ✗ Market may have moved on


AGILE (2 weeks to first release):
═════════════════════════════════

Sprint 1 (Week 1-2):
  ✓ Core features defined
  ✓ Design & code together
  ✓ Test continuously
  ✓ Deploy to production
  ✓ Gather user feedback
  ✓ Learn from real users

Sprint 2 (Week 3-4):
  ✓ Build on Sprint 1 feedback
  ✓ Add customer-requested features
  ✓ Adjust based on usage data
  ✓ Continuous improvement

Sprint 3, 4, 5...:
  ✓ Rapid iterations
  ✓ Respond to market changes
  ✓ Stay competitive
  ✓ Happy customers


Key Differences:
══════════════════════════════════
Waterfall: All planning first, then execution
Agile:     Plan + Execute in parallel

Waterfall: Fixed scope, variable cost & time
Agile:     Fixed time & cost, variable scope

Waterfall: Complete features at the end
Agile:     Complete features continuously

Waterfall: Big risk - invest 11 months then fail
Agile:     Small risk - fail in 2 weeks, pivot*/`
        }
      ]
    },
    {
      id: 'concept-2',
      name: 'Scrum Framework',
      icon: '🔄',
      color: '#10b981',
      description: 'Roles, artifacts, and events',
      diagram: ScrumFrameworkDiagram,
      details: [
        {
          name: 'Roles',
          explanation: 'Scrum defines three key roles: The Product Owner manages the backlog, prioritizes work, and represents the customer. The Scrum Master facilitates the process, removes blockers, and coaches the team. The Development Team is 5-9 people who do the actual work, self-organize, and commit to sprint goals. Each role is essential; teams without clear roles fail.',
          codeExample: `// Scrum Roles and Responsibilities

// PRODUCT OWNER (PO)
public class ProductOwner {

  public void manageProductBacklog() {
    /*
    Responsibilities:
    - Define product vision
    - Create and prioritize user stories
    - Accept completed work
    - Talk to stakeholders
    - Make business decisions
    - Ensure ROI
    */
  }

  public void refineBacklog() {
    /*
    Weekly: Backlog Refinement
    - Review upcoming stories
    - Add acceptance criteria
    - Estimate complexity
    - Answer team questions
    - Prepare for next sprint
    */
  }
}

// SCRUM MASTER (SM)
public class ScrumMaster {

  public void facilitateScrum() {
    /*
    Responsibilities:
    - Facilitate ceremonies (not lead them)
    - Remove team blockers
    - Coach team on Scrum practices
    - Protect team from interruptions
    - Improve team velocity
    - Track metrics
    */
  }

  public void removeImpediments() {
    /*
    Handle blockers like:
    - "We need database schema approval"
    - "Testing environment is down"
    - "Product Owner not available"
    - "Dependency from other team"
    - "Infrastructure issues"

    Goal: Unblock team within 24 hours
    */
  }
}

// DEVELOPMENT TEAM
public class DevelopmentTeam {

  public void commitToSprint() {
    /*
    Responsibilities:
    - Estimate story complexity
    - Commit to sprint goal
    - Deliver working software
    - Self-organize work
    - Collaborate on solutions
    - Maintain code quality
    */
  }

  public void selfOrganize() {
    /*
    Team decides:
    - How to accomplish work
    - Who works on what
    - Code standards
    - Testing approach
    - Deployment process

    No external task assignments!
    */
  }
}

// Team Size Matters
/*
Optimal: 5-9 people
Too small: Can't deliver enough, single point of failure
Too large: Communication overhead, coordination issues

If larger:
- Split into multiple teams
- Use Scrum of Scrums pattern
- Coordinate cross-team dependencies
*/`
        },
        {
          name: 'Artifacts',
          explanation: 'Scrum artifacts represent concrete work and provide transparency. The Product Backlog is a prioritized list of all work needed. The Sprint Backlog is the subset of work for the current sprint. The Increment is the sum of all completed items, which must be working software. These artifacts enable the team to track progress and maintain alignment.',
          codeExample: `// Scrum Artifacts

// PRODUCT BACKLOG
public class ProductBacklog {

  private List<UserStory> stories;

  /*
  Backlog Structure:
  ═════════════════════════════════════════

  Priority 1: User Authentication
    - Story 1: Login with email/password (8 pts)
    - Story 2: Forgot password reset (5 pts)
    - Story 3: MFA support (13 pts)

  Priority 2: User Profile
    - Story 1: View profile (3 pts)
    - Story 2: Edit profile (5 pts)
    - Story 3: Upload avatar (5 pts)

  Priority 3: Dashboard
    - Story 1: Show stats (8 pts)
    - Story 2: Charts and graphs (13 pts)

  Estimated Total: ~60 story points
  At velocity of 20pts/sprint = 3 sprints
  */
}

// SPRINT BACKLOG
public class SprintBacklog {

  private String sprintGoal = "Enable user authentication with secure login";
  private List<Task> tasks;

  /*
  Sprint Goal: Single focus for 2 weeks

  Stories committed:
  ═════════════════════════════════════════

  1. User Authentication (8 points)
     [ ] Design security model
     [ ] Implement login endpoint
     [ ] Add password encryption
     [ ] Write tests
     [ ] Code review

  2. Forgot Password (5 points)
     [ ] Design email flow
     [ ] Implement reset endpoint
     [ ] Send reset emails
     [ ] Test email delivery

  3. MFA Support (13 points)  [Carry over from last sprint]
     [ ] Research MFA libraries
     [ ] Design MFA flow
     [ ] Implement TOTP
     [ ] Test edge cases

  Total: 21 points (based on team velocity)
  */
}

// INCREMENT (Product Increment)
public class Increment {

  /*
  Definition of Increment:
  "Sum of all Product Backlog items completed during
   a Sprint and all previous Sprints"

  Must be:
  ✓ WORKING - Tested and integrated
  ✓ RELEASABLE - Can deploy to production
  ✓ COMPLETE - Meets definition of done

  Sprint 1 Increment:
  ├─ User login functionality
  ├─ Password reset flow
  └─ Unit tests (80% coverage)

  Sprint 2 Increment (cumulative):
  ├─ User login functionality
  ├─ Password reset flow
  ├─ MFA authentication
  ├─ Security audit passed
  └─ Integration tests pass

  This is the real measure of progress!
  Not "70% complete" but actual working features
  */
}`
        },
        {
          name: 'Events & Ceremonies',
          explanation: 'Scrum events provide a rhythm and structure. Sprint Planning kicks off each 2-week sprint with clear goals. Daily Standups keep the team synchronized. Sprint Review demos completed work to stakeholders. Sprint Retrospective reflects on how the team can improve. These timeboxed events prevent endless meetings while ensuring alignment.',
          codeExample: `// Scrum Events (Ceremonies)

// SPRINT PLANNING (4 hours for 2-week sprint)
public class SprintPlanning {

  public void conductPlanning() {
    /*
    Duration: 4 hours max for 2-week sprint
    Attendees: Entire team + Product Owner

    Output:
    - Sprint goal (single focus for sprint)
    - Sprint backlog (selected stories)
    - Task breakdown
    - Commitment from team

    Example Dialog:
    ─────────────────────────────────────────
    PO: "I want users to be able to login securely"
    Team: "We'll complete login + password reset"
    SM: "Confirm you're committing to 16 points?"
    Team: "Yes, we can deliver this"
    PO: "Great! This is your sprint goal"
    */
  }
}

// DAILY STANDUP (15 minutes, same time daily)
public class DailyStandup {

  public void conduct() {
    /*
    Format: Stand in circle (literally standing!)

    Each person shares (2 min):
    1. What I completed yesterday
    2. What I'll work on today
    3. What's blocking me

    Example:
    ─────────────────────────────────────────
    Alice: "Completed login UI. Today: password reset.
            Blocker: Need database schema approval"

    Bob: "Wrote tests for login. Today: code review.
          No blockers"

    Carol: "Reviewed login code. Today: database schema.
            No blockers"

    SM: "I'll follow up on database schema approval"

    Duration: Usually 10 minutes, max 15

    NOT a status report to managers!
    It's team sync for self-organization
    */
  }
}

// SPRINT REVIEW (2 hours for 2-week sprint)
public class SprintReview {

  public void conductReview() {
    /*
    Demo to Stakeholders

    Attendees: Team + Product Owner + Stakeholders

    Goals:
    - Show working software
    - Gather feedback
    - Adjust priorities
    - Build trust with stakeholders

    Example:
    ─────────────────────────────────────────
    Team: "Here's the login feature"
      [Live demo in staging environment]
      - Email login works
      - Password reset works
      - Error handling works

    Stakeholder: "Great! Can we add OAuth?"
    PO: "That's valuable. Adding to backlog"

    Stakeholder: "The UI looks good but..."
    [Feedback incorporated into backlog]

    Focus on WORKING SOFTWARE, not slides!
    */
  }
}

// SPRINT RETROSPECTIVE (1.5 hours for 2-week sprint)
public class SprintRetrospective {

  public void conductRetro() {
    /*
    Team Reflection (without PO usually)

    Attendees: Development Team + Scrum Master

    Questions:
    - What went well? (celebrate successes)
    - What could be better? (identify issues)
    - What will we do differently? (action items)

    Example:
    ─────────────────────────────────────────
    Went well:
    ✓ Code reviews caught security issues early
    ✓ Test coverage prevented regressions
    ✓ Team collaboration on hard problems

    Could be better:
    ✗ Tests took too long to run (30 min)
    ✗ Unclear story acceptance criteria sometimes
    ✗ Too many production incidents after deploy

    Action items:
    → Parallelize test execution (Alice - Sprint 2)
    → Add checklist to acceptance criteria (PO - ongoing)
    → Add smoke tests before deploy (Bob - Sprint 2)

    This is the team's continuous improvement engine
    */
  }
}`
        }
      ]
    },
    {
      id: 'concept-3',
      name: 'User Stories',
      icon: '📝',
      color: '#f59e0b',
      description: 'Writing and estimating stories',
      diagram: UserStoryFormatDiagram,
      details: [
        {
          name: 'Story Format',
          explanation: 'User stories follow the format: "As a [user role], I want [action], so that [benefit]". This format ensures we capture who needs the feature and why. Stories should be written from the user\'s perspective, be small enough to complete in a sprint, and have clear acceptance criteria. Well-written stories facilitate clear communication between developers and stakeholders.',
          codeExample: `// User Story Format and Best Practices

/*
Standard Format:
"As a [user role], I want [action], so that [benefit]"

Why this format?
- User role: Defines WHO needs the feature
- Action: Describes WHAT they want to do
- Benefit: Explains WHY it matters (business value)

Examples:
*/

// GOOD User Story
/*
Title: User Password Reset

As a user with a forgotten password,
I want to reset my password via email,
so that I can regain access to my account.

Acceptance Criteria:
✓ User clicks "Forgot Password" link
✓ User enters email address
✓ User receives reset email within 1 minute
✓ Reset link is valid for 24 hours
✓ User sets new password (min 8 chars)
✓ User can login with new password
✓ Old sessions are invalidated
✓ Works on mobile and desktop

Definition of Done:
✓ Code reviewed and approved
✓ Unit tests (80%+ coverage)
✓ Integration tests pass
✓ Tested in staging
✓ Works across browsers
✓ Documentation updated
*/

// BAD User Story (Technical Task - Not from user perspective)
/*
Title: Refactor database layer

This is NOT a user story - users don't care
about refactoring. It should be:

"As a developer,
I want cleaner database queries,
so that we can add features faster"

OR frame it as a story that enables customer value:

"As a customer,
I want faster page loads,
so that I have a better experience"

(Then refactoring is the technical implementation)
*/

// Story Size Guidelines
/*
Size estimates using story points (Fibonacci: 1,2,3,5,8,13)

1-2 points: Can complete in 1-2 days
  Example: Add login field validation

3-5 points: Can complete in 2-3 days
  Example: Implement user registration

8 points: Challenging, needs careful work
  Example: OAuth integration with Google

13 points: Very complex, may need to split
  Example: Payment system integration

20+ points: TOO BIG - must split into smaller stories
*/

// How to Split Large Stories
/*
Original (20 points - Too Big):
"As a user, I want to make payments securely"

Split into:

Story 1 (5 pts): "User sees payment form"
Story 2 (5 pts): "User enters card details"
Story 3 (8 pts): "Payment processes securely"
Story 4 (3 pts): "User sees confirmation email"

Now each can be completed in a sprint
*/`
        },
        {
          name: 'Acceptance Criteria',
          explanation: 'Acceptance criteria define what "done" means for a story. They should be specific, measurable, and testable - not vague descriptions. Criteria help developers understand exactly what to build and enable QA to verify the feature works correctly. Well-written criteria prevent misunderstandings and reduce rework.',
          codeExample: `// Acceptance Criteria Best Practices

/*
Definition: Specific conditions that must be true
for the story to be considered complete.

Why they matter:
- Developers know exactly what to build
- QA knows what to test
- PO knows when to accept
- Prevents "almost done" stories
*/

// GOOD Acceptance Criteria
/*
Story: User can update their profile

Acceptance Criteria:
✓ User can edit first name (required, max 50 chars)
✓ User can edit last name (required, max 50 chars)
✓ User can upload new profile picture (jpg/png, max 2MB)
✓ User can update email (must be unique)
✓ User can update phone (optional, validate format)
✓ User sees validation error if field invalid
✓ User sees success message after save
✓ Changes persist when user logs out/in
✓ Form works on mobile (responsive)
✓ Profile picture crops/centers correctly
*/

// BAD Acceptance Criteria
/*
✗ "User can update profile"
   → Too vague, doesn't define WHAT

✗ "Should work correctly"
   → Not testable, too subjective

✗ "Profile updates quickly"
   → How quick? Not measurable
*/

// Technical Acceptance Criteria
/*
Sometimes include technical requirements:

✓ API returns 200 status on success
✓ Validation happens client-side (instant feedback)
✓ Database transaction succeeds or rolls back
✓ No N+1 queries on load
✓ Images resize to max 500px width
✓ Response time < 200ms (API)
✓ Supports 10,000 concurrent users
*/

// Testing Against Criteria
/*
Acceptance Criteria make testing systematic:

Test 1: Valid Input
  Input: firstName="John", lastName="Doe"
  Expected: Success message, data saved

Test 2: Invalid Input
  Input: firstName="" (empty)
  Expected: Error message shown

Test 3: Boundary
  Input: firstName with 50 chars
  Expected: Accepted

Test 4: Boundary
  Input: firstName with 51 chars
  Expected: Error message

Test 5: Edge Case
  Input: Special characters: "O'Brien"
  Expected: Accepted

Each criterion should be a test case!
*/`
        },
        {
          name: 'Estimation',
          explanation: 'Teams estimate stories using story points (1, 2, 3, 5, 8, 13), not hours. Points represent complexity and risk, not time. The team estimates together in planning poker to expose different perspectives. Over time, teams measure velocity (points completed per sprint) to predict how much they can deliver. Velocity helps with planning and prevents over-commitment.',
          codeExample: `// Story Point Estimation and Velocity

// STORY POINT SCALE (Fibonacci Sequence)
/*
1 point: Trivial
  - Simple bugfix
  - Copy-paste existing code
  - Very straightforward
  - Example: Add validation to form field

2 points: Easy
  - Straightforward task
  - Clear requirements
  - Low risk
  - Example: Add new API endpoint

3 points: Simple
  - Well-understood work
  - Some unknowns
  - Example: Implement basic search feature

5 points: Medium
  - Some complexity
  - Multiple components
  - Moderate risk
  - Example: User authentication flow

8 points: Hard
  - Significant complexity
  - Multiple unknowns
  - Higher risk
  - Example: OAuth integration

13 points: Very Hard
  - Very complex
  - Many unknowns
  - High risk
  - Example: Payment system integration
  - Usually should be split!

? (Unknown): Need more research
  - Spike/research task needed
  - Example: "Evaluate caching options"
*/

// PLANNING POKER
public class PlanningPoker {
  /*
  Estimation Technique:

  1. PO reads story aloud
  2. Team asks clarifying questions
  3. Each person picks a card (1-13 or ?)
  4. Everyone reveals simultaneously
  5. Discuss differences:
     - High estimate: "This is risky, needs design first"
     - Low estimate: "We did similar recently"
  6. Re-estimate if discussion changes understanding
  7. Reach consensus

  Benefits:
  ✓ Exposes different perspectives
  ✓ Prevents groupthink
  ✓ Reveals uncertainties
  ✓ Team commitment to estimate
  */
}

// VELOCITY TRACKING
public class VelocityTracking {

  /*
  Velocity = Story points completed per sprint

  Sprint 1: Completed 16 points
  Sprint 2: Completed 20 points
  Sprint 3: Completed 18 points
  Sprint 4: Completed 21 points
  Sprint 5: Completed 19 points
  Sprint 6: Completed 20 points

  Average Velocity: 19 points per sprint

  This enables predictability:

  Backlog: 114 points of work
  Velocity: 19 points/sprint
  Estimate: 114 / 19 = 6 sprints = 12 weeks

  For stakeholders: "We can deliver by Q3"
  */
}

// COMMON MISTAKES
public class EstimationMistakes {
  /*
  ✗ Mixing points with hours
    "This is 5 points = 40 hours"
    → Points are relative complexity, not hours

  ✗ Pressuring to increase velocity
    PO: "Why not 50 points next sprint?"
    → Velocity is what team can actually deliver
    → Forcing it leads to burnout and bugs

  ✗ Using velocity to compare teams
    Team A: 25 points/sprint
    Team B: 15 points/sprint
    → Different story point scales, team sizes
    → Can't compare across teams

  ✗ Including estimates in performance reviews
    "Developer estimated wrong, fired"
    → Estimates are team guesses, not individuals
    → Creates fear of honest estimation

  ✓ DO use velocity for planning
  ✓ DO track trends over time
  ✓ DO discuss estimation differences
  ✓ DO adjust process, not people
  */
}`
        }
      ]
    },
    {
      id: 'concept-4',
      name: 'Scrum Ceremonies',
      icon: '👥',
      color: '#8b5cf6',
      description: 'Daily standups and key events',
      diagram: CeremoniesDiagram,
      details: [
        {
          name: 'Daily Standup',
          explanation: 'The Daily Standup is a 15-minute timeboxed meeting where each team member shares three things: what they completed yesterday, what they\'ll work on today, and any blockers. The team literally stands in a circle to keep it brief and focused. This is not a status report to managers but a team synchronization to identify blockers and coordinate work. If someone discusses something at length, they should "park it" for a separate conversation after.',
          codeExample: `// Daily Standup Best Practices

public class DailyStandup {

  /*
  WHEN: Every day, same time (9:00 AM)
  WHERE: Team area (in-person if possible)
  HOW LONG: 15 minutes MAXIMUM

  If over 15 min: Park detailed discussions
  for after standup with relevant people
  */

  public void threeQuestions() {
    /*
    1. What did I complete yesterday?

       Good: "Implemented login validation"
       Bad: "Fixed some bugs and stuff"

    2. What will I work on today?

       Good: "Building password reset flow"
       Bad: "Continuing on my tasks"

    3. What's blocking me?

       Good: "Need DB approval for schema"
       Bad: "Nothing, all good"
    */
  }

  public void format() {
    /*
    Visual Format (Circle, standing):

           Alice ← Yesterday: login validation
                   Today: password reset
                   Blocker: None

           Bob                Carol
    Yesterday: Tests       Yesterday: DB schema
    Today: Code review     Today: Deployment
    Blocker: Password      Blocker: None

           David
    Yesterday: API work
    Today: Bug fixes
    Blocker: Need Carol's schema

    SM: "Carol, David needs schema today?"
    Carol: "Yes, 2 hours"
    SM: "David, can you start API tests meanwhile?"
    */
  }
}

// ANTI-PATTERNS (What NOT to do)

public class StandupAntiPatterns {

  public void wrongApproach1() {
    /*
    ✗ Status Report to Manager

    Manager asks each person:
    "What are you working on?"
    "When will it be done?"
    "Are you on track?"

    Problems:
    - People feel micromanaged
    - Team doesn't connect with each other
    - Just reporting, not solving blockers
    - Takes 30+ minutes

    ✓ Instead: Team stands in circle
      Each person talks to TEAM, not manager
      Focus on blockers and coordination
    */
  }

  public void wrongApproach2() {
    /*
    ✗ Detailed Technical Discussions

    Alice: "I'm working on query optimization"
    Bob: "How are you doing it? Have you tried..."
    Carol: "I used a similar approach in..."
    [15 minutes of technical discussion]

    ✓ Instead:
    Alice: "Query optimization, no blockers"
    [After standup: Alice, Bob, Carol discuss approach]
    */
  }

  public void wrongApproach3() {
    /*
    ✗ Checking if people worked

    SM: "Did everyone work 8 hours yesterday?"
    SM: "Who did actual coding vs meetings?"

    Problems:
    - Creates distrust
    - People feel watched
    - Doesn't improve team velocity

    ✓ Trust the team
      Focus on blockers, not hours
    */
  }
}

// RUNNING EFFECTIVE STANDUPS

public class EffectiveStandup {

  public void timeboxing() {
    /*
    If discussion takes > 30 seconds:

    SM: "Let's discuss this separately"

    Park long discussions for:
    - Right after standup (interested parties)
    - Dedicated discussion time
    - Async Slack thread

    Standup must stay 15 minutes!
    */
  }

  public void blockersEscalation() {
    /*
    Blocker identified:

    David: "Waiting for external API docs"
    SM: "I'll follow up today, update in standup tomorrow"

    SM responsibility:
    - Own blocker resolution
    - Update team next day
    - Escalate if needed
    - Don't let blockers linger > 24 hours
    */
  }

  public void remoteStandups() {
    /*
    If team is distributed:

    Option 1: Video call (best)
    - Standup at specific time
    - Camera on (face-to-face)
    - 15 minutes strict

    Option 2: Async (when impossible)
    - Posted in Slack at fixed time
    - Team responds within 1 hour
    - SM identifies blockers
    - Follow-up call if too many blockers

    Avoid: Email chains, multiple channels
    */
  }
}`
        },
        {
          name: 'Sprint Review',
          explanation: 'The Sprint Review is a ceremony to demonstrate completed work to stakeholders. The team shows working software (not slides or prototypes) and gathers feedback. This is not about status reporting but about collaborating with customers and adjusting priorities. The review influences backlog prioritization - if stakeholders love a feature, related work moves higher priority.',
          codeExample: `// Sprint Review Best Practices

public class SprintReview {

  /*
  WHEN: Last day of sprint, last 2 hours
  WHO: Dev team + Scrum Master + Product Owner
       + Key stakeholders + Customers
  FORMAT: Demo-driven, interactive
  OUTPUT: Stakeholder feedback → backlog adjustments
  */

  public void preparation() {
    /*
    Day before review:
    - Verify all completed work is demo-ready
    - Test in staging environment
    - Have demo script prepared (not slides)
    - Ensure internet/WiFi stable
    - Have backup demo (video, local copy)

    Worst demo: "Let me just load this page..."
                [spinner spinning]
                [awkward silence]
    */
  }

  public void demoing() {
    /*
    Demo Best Practices:

    ✓ Live demo from working software
      [Open login page]
      [Enter credentials]
      [Page loads, shows user profile]
      → Much more convincing than mockup

    ✓ Let stakeholders try it
      "Here, try logging in with this account"
      "Try changing your profile picture"
      → People engage with actual product

    ✓ Walk through acceptance criteria
      "Per requirements, email validation..."
      [Shows validation message]
      → Proves feature is complete

    ✗ Avoid: Reading from PowerPoint slides
    ✗ Avoid: Only showing frontend screenshots
    ✗ Avoid: "Trust me, it works" without demo
    */
  }

  public void gatheringFeedback() {
    /*
    During demo:

    Stakeholder: "Can we add OAuth login too?"
    PO: [Writing in backlog]

    Stakeholder: "This UI is confusing"
    Team: "Can you show us what's confusing?"
    [Discussion about UX]

    Stakeholder: "Performance is great!"
    Team: "Thanks! We optimized the queries"

    Notes:
    - Feature requests → backlog items
    - Bug reports → backlog items
    - Praise → reinforces good decisions
    - Questions → shows understanding gaps
    */
  }

  public void backlogImpact() {
    /*
    Review generates backlog adjustments:

    Before review:
    Backlog Priority:
    1. Advanced search (5 pts) - Medium priority
    2. OAuth login (8 pts) - Low priority
    3. Admin panel (13 pts) - High priority

    Feedback: "OAuth is critical! Many users use Google"

    After review:
    Backlog Priority:
    1. OAuth login (8 pts) - NOW HIGH priority
    2. Advanced search (5 pts) - Medium priority
    3. Admin panel (13 pts) - Still high, but after OAuth

    Next sprint PO picks OAuth first!
    */
  }
}

// COMMON MISTAKES

public class ReviewMistakes {

  public void wrongApproach1() {
    /*
    ✗ Blaming team for incomplete work

    PO: "Why wasn't X completed?"
    Developer: [defensive]
    "Well, we hit technical issues..."

    This shuts down honest communication.

    ✓ Instead: Matter-of-fact discussion
    "We estimated X at 5 points but
     discovered it was more complex.
     Here's what we learned.
     Next time we'll..."

    Focus on process improvement, not blame.
    */
  }

  public void wrongApproach2() {
    /*
    ✗ Scope creeping in review

    Stakeholder: "Can you add this other feature?"
    PO: "Sure, we'll add it this sprint"
    [Sprint is already full]

    Result: Overcommitment, missed goals

    ✓ Instead:
    PO: "Great idea! Adding to backlog.
         We can prioritize for Sprint N."

    Backlog is for capturing ideas.
    Current sprint commitment doesn't change.
    */
  }

  public void wrongApproach3() {
    /*
    ✗ Only technical team present

    Review becomes internal:
    "Look at our beautiful code architecture"
    Stakeholders don't care about code!

    ✓ Invite actual users/stakeholders
    "Here's the new feature you requested"
    "Does this solve your problem?"
    "What would improve this?"
    */
  }
}`
        },
        {
          name: 'Sprint Retrospective',
          explanation: 'The Sprint Retrospective is a team reflection on how to improve. Without the Product Owner, the team discusses what went well, what could improve, and commits to action items for next sprint. Retrospectives are essential for continuous improvement. The Scrum Master facilitates but doesn\'t lead - the team drives the discussion. Format varies: Start-Stop-Continue, Glad-Sad-Mad, or simple What Went Well/Could Be Better.',
          codeExample: `// Sprint Retrospective Best Practices

public class SprintRetrospective {

  /*
  WHEN: Last day of sprint, 1.5 hours for 2-week sprint
  WHO: Development team + Scrum Master (no PO usually)
  WHY: Continuous improvement, team ownership
  OUTPUT: 1-3 action items for next sprint
  */

  public void psych() {
    /*
    Retrospective must feel SAFE:

    ✓ Confidential - what's said stays in room
    ✓ Blameless - focus on systems, not people
    ✓ Respectful - everyone's view matters
    ✓ Actionable - don't just complain

    If team fears feedback:
    "I can't say we failed because
     management might punish us"
    → Team never improves

    If blameless:
    "Tests took 30 min. Let's parallelize"
    → Action: Run tests in parallel
    → Faster feedback loop
    → Team improves
    */
  }

  public void format() {
    /*
    Simple Format (Start - Stop - Continue):

    START: "We should start doing..."
    - Start pair programming for complex features
    - Start code reviews before committing
    - Start writing tests first

    STOP: "We should stop doing..."
    - Stop having long meetings
    - Stop context switching
    - Stop delaying retrospectives

    CONTINUE: "We should keep doing..."
    - Continue daily standups (they help)
    - Continue code reviews (they catch bugs)
    - Continue writing tests (prevents regressions)
    */
  }

  public void discussion() {
    /*
    Facilitate Deeper Thinking:

    Observation: "Tests are slow"

    SM: "Why are tests slow?"
    Team: "We run all tests sequentially"

    SM: "What's the impact?"
    Team: "Developers wait 30 min for feedback"

    SM: "How could we improve?"
    Team: "Run tests in parallel on CI"

    Action: "Alice will investigate parallel testing,
            report in next retro"
    */
  }

  public void actionItems() {
    /*
    Retrospectives produce action items:

    Good Action Item:
    - Specific: "Set up parallel test execution"
    - Owned: "Alice owns this"
    - Deadline: "Complete by Sprint 2 day 3"
    - Measurable: "Tests run in 5 min vs 30 min"

    Bad Action Item:
    - Vague: "Improve team communication"
    - Unowned: "We should all communicate better"
    - No deadline: "Sometime soon"
    - Unmeasurable: "Do better"

    Typical: 1-3 action items per sprint
    Too many: Team can't focus
    Zero items: Not actually improving
    */
  }
}

// ADVANCED RETROSPECTIVE TECHNIQUES

public class RetroVariations {

  public void gladSadMad() {
    /*
    Alternative Format (Emotional):

    GLAD: What are we happy about?
    - Quick deployment process
    - Team collaboration
    - Feature shipped on time

    SAD: What disappointed us?
    - Database performance issues
    - Unclear requirements from PO
    - One person blocked for days

    MAD: What frustrated us?
    - Build server kept crashing
    - Third-party API was unreliable
    - Interruptions from support team

    Discussion → Action items
    */
  }

  public void sailboat() {
    /*
    Visual Format (Sailboat):

         ⛵
        ╱  ╲
       ╱    ╲      ISLAND (Goal)
      ╱      ╲     "Deliver payment system"
    ────────────
    │         │

    Wind: Helping us move
    - Skilled team
    - Good tooling
    - Clear requirements

    Anchor: Slowing us down
    - Slow deployment
    - Unclear requirements
    - Production bugs

    Island: Our goal
    - Delivery date
    - Feature completeness
    - Performance targets
    */
  }

  public void retrospectiveGoals() {
    /*
    Track improvement across sprints:

    Sprint 1 Retro:
    Action: "Parallelize tests"
    Result: Test time: 30 min → 10 min ✓

    Sprint 2 Retro:
    Action: "Improve deployment process"
    Result: Deploy time: 45 min → 10 min ✓

    Sprint 3 Retro:
    Action: "Better requirements clarity"
    Result: Stories returned: 3 → 0 ✓

    This is continuous improvement!
    Each sprint better than last.
    */
  }
}`
        }
      ]
    },
    {
      id: 'concept-5',
      name: 'Best Practices',
      icon: '✨',
      color: '#ec4899',
      description: 'Definition of Done and metrics',
      diagram: EstimationDiagram,
      details: [
        {
          name: 'Definition of Done',
          explanation: 'Definition of Done (DoD) is a shared agreement on what "complete" means. Without it, some people think "done" means "code written" while others think it means "tested and deployed". A clear DoD prevents surprises and ensures quality. DoD typically includes code review, tests, documentation, and often deployment to staging. Different items might have different DoD levels, but all must meet the minimum.',
          codeExample: `// Definition of Done (DoD)

public class DefinitionOfDone {

  /*
  Team Agreement: A story is DONE when:
  */

  // CODE QUALITY
  public void codeQuality() {
    /*
    ✓ Code written following team standards
    ✓ Code reviewed by at least 1 peer
    ✓ Code review approved (not just seen)
    ✓ No code smells or obvious issues
    ✓ Follows language/framework conventions
    ✓ Proper error handling
    ✓ No hardcoded values
    */
  }

  // TESTING
  public void testing() {
    /*
    ✓ Unit tests written for new code
    ✓ Unit tests passing (100%)
    ✓ Test coverage ≥ 80%
    ✓ Integration tests pass
    ✓ No regression in existing tests
    ✓ Manual testing completed
    ✓ Edge cases considered
    */
  }

  // DOCUMENTATION
  public void documentation() {
    /*
    ✓ Code comments for complex logic
    ✓ Public methods have JavaDoc
    ✓ README updated if needed
    ✓ API documentation updated
    ✓ Database schema documented
    ✓ Configuration documented
    */
  }

  // DEPLOYMENT
  public void deployment() {
    /*
    ✓ Code deployed to staging
    ✓ Works in staging environment
    ✓ Works on multiple browsers (if web)
    ✓ Works on mobile (if applicable)
    ✓ Performance acceptable
    ✓ No errors in logs
    ✓ Ready for production (even if not deployed)
    */
  }

  // ACCEPTANCE
  public void acceptance() {
    /*
    ✓ Acceptance criteria met
    ✓ Product Owner reviews
    ✓ Product Owner accepts
    ✓ No critical bugs
    ✓ Ready for release
    */
  }
}

// SAMPLE DEFINITION OF DONE

public class SampleDoD {

  public void checklist() {
    /*
    Story: User can reset password

    Before marking DONE, verify:

    DEVELOPMENT TASKS:
    ☐ Code written
    ☐ Unit tests written (80%+ coverage)
    ☐ All tests passing
    ☐ Code reviewed and approved
    ☐ No TODO comments in code
    ☐ Handles error cases (invalid email, etc)
    ☐ Follows security best practices
    ☐ Deployed to staging
    ☐ Works on Chrome, Firefox, Safari
    ☐ Responsive on mobile
    ☐ Load time < 2 seconds

    DOCUMENTATION:
    ☐ Code comments added
    ☐ API documentation updated
    ☐ Database schema documented
    ☐ README updated

    ACCEPTANCE:
    ☐ Acceptance criteria met
    ☐ No regression in other features
    ☐ Product Owner tested and approved

    When all checked: DONE! ✓
    */
  }
}

// TECHNICAL DEBT IN DOD

public class TechnicalDebtManagement {

  public void debtAllocation() {
    /*
    Allocate 20% of sprint capacity to debt:

    Sprint capacity: 20 points
    New features: 16 points (80%)
    Technical debt: 4 points (20%)

    Debt work:
    ✓ Refactoring
    ✓ Upgrading dependencies
    ✓ Improving test coverage
    ✓ Performance optimization
    ✓ Security patches
    ✓ Code cleanup
    ✓ Build process improvements

    All debt work follows SAME DoD as features!
    */
  }

  public void preventAccumulation() {
    /*
    If team ignores debt:

    Sprint 1: Code works, but messy
    Sprint 2: Adding features gets slower
    Sprint 3: Tests take too long
    Sprint 4: Bugs increase
    Sprint 5: Team velocity plummets
    Sprint 6: Rewrite project from scratch ❌

    If team allocates 20% to debt:

    Sprint 1: Feature + refactor
    Sprint 2: Feature + update dependencies
    Sprint 3: Feature + improve tests
    Sprint 4-N: Steady velocity, high quality ✓
    */
  }
}`
        },
        {
          name: 'Metrics & Velocity',
          explanation: 'Velocity is the number of story points completed per sprint. It\'s a planning tool, not a performance metric for individuals. Velocity trends show if the team is accelerating, stable, or declining. Declining velocity might indicate technical debt, team turnover, or increased complexity. Use velocity to predict how much work can fit in future sprints. Velocity should be team metric, never used in performance reviews.',
          codeExample: `// Metrics and Velocity Tracking

public class VelocityMetrics {

  public void tracking() {
    /*
    Velocity = Story points delivered per sprint

    Sprint Results:
    ═════════════════════════════════════════
    Sprint 1: 16 points
    Sprint 2: 20 points
    Sprint 3: 18 points
    Sprint 4: 21 points
    Sprint 5: 19 points
    Sprint 6: 20 points

    Average: 19 points/sprint
    Trend: Stable around 19-20 points
    */
  }

  public void planning() {
    /*
    Use velocity to predict delivery:

    Backlog: 114 story points
    Team velocity: 19 points/sprint
    Sprints needed: 114 / 19 = 6 sprints
    Timeline: 6 × 2 weeks = 12 weeks

    PO: "When can we launch?"
    Team: "In 12 weeks with this scope"

    PO: "I need it in 8 weeks"
    Team: "We can deliver 152 points in 8 weeks"
    PO: "That's only 67% of backlog"
    → Prioritize what's most important
    */
  }

  public void interpretation() {
    /*
    Increasing Velocity:
    ✓ Team learning domain
    ✓ Process improvements working
    ✓ Team gelling (forming → storming → norming)
    ✓ Technical debt decreasing

    Stable Velocity:
    ✓ Team settled in
    ✓ Good planning and estimation
    ✓ Sustainable pace
    ✓ Can predict delivery dates

    Decreasing Velocity:
    ⚠ Accumulating technical debt
    ⚠ Team members leaving
    ⚠ New team members (learning curve)
    ⚠ Increasing complexity
    ⚠ Burnout/unsustainable pace
    → Investigate and improve process
    */
  }
}

// OTHER METRICS

public class OtherMetrics {

  public void burndown() {
    /*
    Sprint Burndown Chart:
    Track remaining story points day-by-day

    Ideal: Straight line down
    Actual: Jagged, eventually reaching zero

    Day:  0   2   4   6   8  10
    Ideal 40  32  24  16  8   0  ▄▄▄▄▄
    Actual 40  38  35  22  15  0

    ▁▄▂▃▂▄▃ (jagged but reaches zero ✓)

    If stuck above zero on final day:
    → Sprint goal at risk → Escalate
    */
  }

  public void cycleTime() {
    /*
    Cycle Time: Days from start to done

    Story created: Jan 10
    Story finished: Jan 15
    Cycle Time: 5 days

    Improving cycle time:
    → Can deliver to customers faster
    → Get feedback faster
    → Fix issues faster
    → Respond to market faster

    Measure: Average cycle time over sprints
    Target: Decreasing over time
    */
  }

  public void defectDensity() {
    /*
    Defect Density: Bugs found per point delivered

    Sprint 4:
    - Delivered: 20 points
    - Bugs found after deployment: 2
    - Defect Density: 2/20 = 0.1 bugs/point

    Trend:
    Sprint 1: 0.5 bugs/point (quality low)
    Sprint 2: 0.35 bugs/point
    Sprint 3: 0.25 bugs/point
    Sprint 4: 0.1 bugs/point (quality improving!)

    Target: Decrease over time
    */
  }

  public void leadTime() {
    /*
    Lead Time: Days from request to delivery

    Story created: Jan 1
    Story deployed: Jan 20
    Lead Time: 19 days

    Includes:
    - Days waiting in backlog (14 days)
    - Days in sprint (5 days)

    Reducing lead time:
    ✓ Priorities clearer (less backlog wait)
    ✓ Process efficient (less sprint time)
    ✓ Customers happier (faster delivery)
    */
  }
}

// METRICS ANTI-PATTERNS

public class MetricsAntiPatterns {

  public void velocityPerformanceReview() {
    /*
    ✗ DON'T tie velocity to performance reviews:

    Manager: "Developer A had lower velocity"
    Team: [Fear] "We'll overcommit next sprint"
    Result: Burnout, burnout, missed goals

    ✓ Velocity is TEAM metric
    If team velocity is low, investigate:
    - Process issues? → Improve process
    - Too much scope? → Prioritize
    - Technical debt? → Allocate time
    - Team burnout? → Reduce workload
    */
  }

  public void velocityComparison() {
    /*
    ✗ DON'T compare velocity across teams:

    Team A: 25 points/sprint
    Team B: 15 points/sprint
    Manager: "Why is Team B less productive?"

    Problems:
    - Different story point scales
    - Different team sizes
    - Different problem complexity
    - Different tech stacks

    Comparing is misleading and demoralizing
    */
  }

  public void forcingVelocity() {
    /*
    ✗ DON'T force velocity to increase:

    PO: "Why wasn't velocity 30 points?"
    Team: "Our realistic capacity is 20"
    PO: "Push harder, commit to 30"

    Result in weeks 2-3:
    - Team working nights/weekends
    - Quality drops
    - Bugs increase
    - Team burnout
    - Turnover

    ✓ Velocity is what team can sustainably deliver
    Accept it, plan based on it
    */
  }
}`
        },
        {
          name: 'Continuous Improvement',
          explanation: 'Agile embraces continuous improvement through retrospectives and metrics. Teams should regularly reflect on what\'s working and what isn\'t, then commit to small improvements each sprint. Improvements might be process-related (shiorten meeting), technical (parallelize tests), or people-related (pair programming). Small consistent improvements compound into significant productivity gains over time.',
          codeExample: `// Continuous Improvement Philosophy

public class ContinuousImprovement {

  public void kaizen() {
    /*
    Kaizen: Japanese philosophy of continuous improvement

    Key Ideas:
    ✓ Small improvements regularly > big changes rarely
    ✓ Everyone participates in improvement
    ✓ Focus on process, not people
    ✓ Data-driven decisions
    ✓ Implement, measure, adjust, repeat

    Example: Test execution

    Sprint 1 Retro:
    - Tests take 30 minutes
    - Action: "Run tests in parallel"
    - Result: 15 minutes
    - Improvement: 50%

    Sprint 2 Retro:
    - Tests take 15 minutes
    - Action: "Skip tests for migrations"
    - Result: 12 minutes
    - Improvement: 20%

    Sprint 3 Retro:
    - Tests take 12 minutes
    - Action: "Optimize database queries"
    - Result: 8 minutes
    - Improvement: 33%

    Cumulative: 30 min → 8 min (73% improvement!)
    */
  }

  public void actionItems() {
    /*
    Retrospective Action Items:

    Sprint 1:
    - Issue: Code reviews take too long
    - Action: Limit PR to 400 lines
    - Owner: Alice
    - Target: Sprint 2 day 1

    Sprint 2:
    - Review Alice's status
    - Measure: Average review time 2 hours → 45 min
    - Success! Continue practice
    - New issue: Deployment is slow
    - Action: Automate deployment steps
    - Owner: Bob

    Sprint 3:
    - Deployment time: 45 min → 10 min
    - Success!
    - New issue: Developers revert to long PRs
    - Action: Code review tool enforces 400-line limit
    - Owner: Carol

    This is incremental improvement compounding
    */
  }
}

// SUSTAINABILITY AND PACE

public class SustainablePace {

  public void workLifeBalance() {
    /*
    Agile supports sustainable pace:

    ✓ 40-hour work weeks (standard)
    ✓ No expectation of overtime
    ✓ No weekend work (except critical outages)
    ✓ Respect PTO and time off
    ✓ Flexible hours where possible
    ✓ No late-night deployments regularly

    Signs of UNsustainable pace:
    ✗ Team working nights/weekends regularly
    ✗ Increasing bugs and technical debt
    ✗ Velocity declining over sprints
    ✗ Team turnover increasing
    ✗ Decreased code quality
    ✗ Missing sprint goals repeatedly

    Solutions:
    ✓ Reduce sprint commitment
    ✓ Add buffer time
    ✓ Invest in technical debt
    ✓ Improve estimation accuracy
    ✓ Protect team from interruptions
    ✓ Hire additional team members
    */
  }

  public void technicalDebt() {
    /*
    Allocate 20% sprint capacity to debt:

    Total capacity: 20 points
    New features: 16 points (80%)
    Technical debt: 4 points (20%)

    Debt work types:
    - Refactoring old code
    - Upgrading dependencies
    - Improving test coverage
    - Performance optimization
    - Security patches
    - Build process improvements
    - Documentation cleanup

    If debt not addressed:
    Sprint N: Velocity 20 points
    Sprint N+1: Velocity 18 points (tests slow)
    Sprint N+2: Velocity 16 points (more code fragile)
    Sprint N+3: Velocity 12 points (deployment breaks)
    → Compounding problem

    If debt allocated 20% of time:
    Sprint N: Velocity 20 points
    Sprint N+1-5: Velocity 20 points (maintained)
    → Sustainable, consistent delivery
    */
  }
}

// ANTI-PATTERNS TO AVOID

public class AgileAntiPatterns {

  public void scrumBut() {
    /*
    "We do Scrum, but..."

    ✗ "We do Scrum, but we skip retrospectives"
    ✗ "We do Scrum, but Product Owner is never in meetings"
    ✗ "We do Scrum, but we change sprint mid-way"
    ✗ "We do Scrum, but we don't track velocity"

    If you skip core practices:
    → You're not doing Scrum
    → You lose the benefits

    ✓ Either do Scrum fully, or adapt transparently
    "We modified Scrum because..."
    [Document why and measure impact]
    */
  }

  public void agileTheater() {
    /*
    ✗ Going through motions without commitment:

    - Standups where nobody talks to each other
    - Retrospectives where nothing changes
    - Planning where PO isn't engaged
    - Sprints where no one cares about goal

    Result: Zero benefit from Agile

    ✓ Agile is mindset, not just ceremonies
    Focus on principles:
    - Customer collaboration (real)
    - Working software (real)
    - Continuous improvement (real)
    */
  }

  public void fixedScopeVsNegotiable() {
    /*
    ✗ "We must deliver all 100 points this sprint"

    Pressure to force 100 points:
    - Overcommitment
    - Burnout
    - Low quality
    - Missed goals anyway

    ✓ Negotiate scope:
    "We can deliver 20 points
     in 2 weeks with quality.
     Which 20 are most important?"

    Agile trades scope flexibility for
    stable time and cost predictability
    */
  }
}`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

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

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Projects', icon: '🚀', page: 'Projects' },
      { name: 'Agile & Scrum', icon: '📋', page: 'Agile & Scrum' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: `rgba(8, 145, 178, 0.2)`,
    border: '1px solid rgba(8, 145, 178, 0.3)',
    borderRadius: '0.5rem',
    color: '#06b6d4',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Agile & Scrum</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = `rgba(8, 145, 178, 0.3)`
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = `rgba(8, 145, 178, 0.2)`
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={AGILE_COLORS}
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
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={AGILE_COLORS}
            />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
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

export default AgileScrum

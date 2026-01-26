import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TESTING_COLORS = {
  primary: '#0c4a6e',           // Deep blue - main accent color
  primaryHover: '#0369a1',      // Lighter blue hover
  bg: 'rgba(12, 74, 110, 0.1)', // Background with transparency
  border: 'rgba(12, 74, 110, 0.3)', // Border color
  arrow: '#0ea5e9',             // Sky blue arrow/indicator
  hoverBg: 'rgba(12, 74, 110, 0.2)', // Hover background
  topicBg: 'rgba(12, 74, 110, 0.2)'  // Topic card background
}

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

// Testing Pyramid Diagram
const TestingPyramidDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="unitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8"/>
      </linearGradient>
      <linearGradient id="integrationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#047857" stopOpacity="0.8"/>
      </linearGradient>
      <linearGradient id="e2eGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.8"/>
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Testing Pyramid
    </text>

    {/* E2E Tests (top) */}
    <path d="M 300 60 L 500 60 L 450 120 L 350 120 Z" fill="url(#e2eGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="92" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">E2E Tests</text>
    <text x="400" y="108" textAnchor="middle" fill="white" fontSize="10">Few • Slow • High Cost</text>

    {/* Integration Tests (middle) */}
    <path d="M 250 130 L 550 130 L 475 210 L 325 210 Z" fill="url(#integrationGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="167" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Integration Tests</text>
    <text x="400" y="183" textAnchor="middle" fill="white" fontSize="10">Moderate • Medium Cost</text>

    {/* Unit Tests (bottom) */}
    <path d="M 200 220 L 600 220 L 500 290 L 300 290 Z" fill="url(#unitGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="250" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Unit Tests</text>
    <text x="400" y="266" textAnchor="middle" fill="white" fontSize="10">Many • Fast • Low Cost</text>

    {/* Side labels */}
    <text x="120" y="95" fill="#94a3b8" fontSize="11" fontWeight="bold">Coverage</text>
    <text x="620" y="95" fill="#94a3b8" fontSize="11" fontWeight="bold">Speed</text>
    <text x="120" y="255" fill="#94a3b8" fontSize="11" fontWeight="bold">Narrow</text>
    <text x="620" y="255" fill="#94a3b8" fontSize="11" fontWeight="bold">Fast</text>
  </svg>
)

// Test Types Diagram
const TestTypesDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTestTypes" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Types of Testing
    </text>

    {/* Unit */}
    <rect x="50" y="60" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Unit Testing</text>
    <text x="110" y="102" textAnchor="middle" fill="white" fontSize="9">Isolated</text>
    <text x="110" y="114" textAnchor="middle" fill="white" fontSize="9">components</text>

    {/* Integration */}
    <rect x="220" y="60" width="120" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="280" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Integration</text>
    <text x="280" y="102" textAnchor="middle" fill="white" fontSize="9">Component</text>
    <text x="280" y="114" textAnchor="middle" fill="white" fontSize="9">interactions</text>

    {/* Performance */}
    <rect x="390" y="60" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="450" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Performance</text>
    <text x="450" y="102" textAnchor="middle" fill="white" fontSize="9">{`Load & stress`}</text>
    <text x="450" y="114" textAnchor="middle" fill="white" fontSize="9">testing</text>

    {/* Contract */}
    <rect x="560" y="60" width="120" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="620" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Contract</text>
    <text x="620" y="102" textAnchor="middle" fill="white" fontSize="9">API contract</text>
    <text x="620" y="114" textAnchor="middle" fill="white" fontSize="9">validation</text>

    {/* Arrows */}
    <line x1="170" y1="90" x2="215" y2="90" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowTestTypes)"/>
    <line x1="340" y1="90" x2="385" y2="90" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowTestTypes)"/>
    <line x1="510" y1="90" x2="555" y2="90" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowTestTypes)"/>

    {/* Bottom labels */}
    <text x="110" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">Scope: Smallest</text>
    <text x="280" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">Scope: Medium</text>
    <text x="450" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">Non-functional</text>
    <text x="620" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">API-focused</text>

    {/* Methodology row */}
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Methodologies
    </text>
    <rect x="280" y="195" width="80" height="30" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1.5"/>
    <text x="320" y="214" textAnchor="middle" fill="#f9a8d4" fontSize="10" fontWeight="bold">TDD</text>

    <rect x="370" y="195" width="80" height="30" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="410" y="214" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">BDD</text>
  </svg>
)

// CI/CD Integration Diagram
const CICDIntegrationDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowCICD" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CI/CD Testing Pipeline
    </text>

    {/* Code Commit */}
    <rect x="40" y="60" width="100" height="50" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2"/>
    <text x="90" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Code</text>
    <text x="90" y="102" textAnchor="middle" fill="white" fontSize="9">Commit</text>

    {/* Unit Tests */}
    <rect x="180" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="230" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Unit Tests</text>
    <text x="230" y="102" textAnchor="middle" fill="white" fontSize="9">Fast ✓</text>

    {/* Integration Tests */}
    <rect x="320" y="60" width="100" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="370" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Integration</text>
    <text x="370" y="102" textAnchor="middle" fill="white" fontSize="9">Medium ✓</text>

    {/* Build */}
    <rect x="460" y="60" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="510" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Build</text>
    <text x="510" y="102" textAnchor="middle" fill="white" fontSize="9">Package</text>

    {/* Deploy */}
    <rect x="600" y="60" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="650" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Deploy</text>
    <text x="650" y="102" textAnchor="middle" fill="white" fontSize="9">to Staging</text>

    {/* Arrows */}
    <line x1="140" y1="85" x2="175" y2="85" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowCICD)"/>
    <line x1="280" y1="85" x2="315" y2="85" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowCICD)"/>
    <line x1="420" y1="85" x2="455" y2="85" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowCICD)"/>
    <line x1="560" y1="85" x2="595" y2="85" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowCICD)"/>

    {/* Bottom row - Coverage & Reporting */}
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Quality Gates
    </text>

    <rect x="150" y="170" width="130" height="45" rx="8" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="215" y="192" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">Code Coverage</text>
    <text x="215" y="205" textAnchor="middle" fill="#67e8f9" fontSize="9">&gt; 80%</text>

    <rect x="310" y="170" width="130" height="45" rx="8" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="375" y="192" textAnchor="middle" fill="#f9a8d4" fontSize="11" fontWeight="bold">Test Reports</text>
    <text x="375" y="205" textAnchor="middle" fill="#f9a8d4" fontSize="9">JaCoCo</text>

    <rect x="470" y="170" width="130" height="45" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="535" y="192" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">Quality Check</text>
    <text x="535" y="205" textAnchor="middle" fill="#c4b5fd" fontSize="9">SonarQube</text>
  </svg>
)

// JUnit Lifecycle Diagram
const JUnitLifecycleDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowJUnit" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      JUnit Test Lifecycle
    </text>

    {/* BeforeAll */}
    <rect x="330" y="50" width="140" height="35" rx="6" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">@BeforeAll (once)</text>

    {/* Loop box */}
    <rect x="250" y="110" width="300" height="145" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="260" y="128" fill="#4ade80" fontSize="10" fontWeight="bold">Per Test Loop</text>

    {/* BeforeEach */}
    <rect x="330" y="140" width="140" height="30" rx="6" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">@BeforeEach</text>

    {/* Test */}
    <rect x="330" y="185" width="140" height="30" rx="6" fill="rgba(34, 197, 94, 0.5)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">@Test</text>

    {/* AfterEach */}
    <rect x="330" y="230" width="140" height="30" rx="6" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="250" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">@AfterEach</text>

    {/* AfterAll */}
    <rect x="330" y="270" width="140" height="35" rx="6" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="292" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">@AfterAll (once)</text>

    {/* Arrows */}
    <line x1="400" y1="85" x2="400" y2="105" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowJUnit)"/>
    <line x1="400" y1="170" x2="400" y2="180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowJUnit)"/>
    <line x1="400" y1="215" x2="400" y2="225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowJUnit)"/>
    <line x1="400" y1="260" x2="400" y2="265" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowJUnit)"/>

    {/* Loop arrow */}
    <path d="M 555 200 Q 580 200 580 140 L 580 140 Q 580 130 570 130 L 475 130"
          stroke="#22c55e" strokeWidth="2" fill="none" markerEnd="url(#arrowJUnit)"/>
    <text x="585" y="170" fill="#4ade80" fontSize="9">repeat for</text>
    <text x="585" y="182" fill="#4ade80" fontSize="9">each test</text>
  </svg>
)

// Mockito Pattern Diagram
const MockitoPatternDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowMock" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Mockito Testing Pattern
    </text>

    {/* Test Class */}
    <rect x="50" y="60" width="120" height="80" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Test Class</text>
    <text x="110" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">@Mock</text>
    <text x="110" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9">dependencies</text>

    {/* Service Under Test */}
    <rect x="230" y="60" width="120" height="80" rx="8" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="2"/>
    <text x="290" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Service</text>
    <text x="290" y="92" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Under Test</text>
    <text x="290" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">@InjectMocks</text>

    {/* Mock Repository */}
    <rect x="410" y="60" width="120" height="80" rx="8" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="470" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Mock</text>
    <text x="470" y="97" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Repository</text>
    <text x="470" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9">@Mock</text>

    {/* Real Database (crossed out) */}
    <rect x="590" y="60" width="120" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"/>
    <text x="650" y="95" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Real Database</text>
    <text x="650" y="115" textAnchor="middle" fill="#f87171" fontSize="9">Not Used</text>
    <line x1="600" y1="70" x2="700" y2="130" stroke="#ef4444" strokeWidth="2"/>
    <line x1="700" y1="70" x2="600" y2="130" stroke="#ef4444" strokeWidth="2"/>

    {/* Arrows */}
    <line x1="170" y1="100" x2="225" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowMock)"/>
    <text x="197" y="92" textAnchor="middle" fill="#94a3b8" fontSize="9">inject</text>

    <line x1="350" y1="100" x2="405" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowMock)"/>
    <text x="377" y="92" textAnchor="middle" fill="#94a3b8" fontSize="9">uses</text>

    {/* Bottom labels */}
    <text x="110" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">1. Setup mocks</text>
    <text x="290" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">2. Test behavior</text>
    <text x="470" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">3. Stubbed responses</text>
    <text x="650" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">4. Isolated test</text>
  </svg>
)

// TDD Cycle Diagram
const TDDCycleDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTDD" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="30" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">
      Test-Driven Development Cycle
    </text>

    {/* Red - Write failing test */}
    <circle cx="200" cy="140" r="60" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="3"/>
    <text x="200" y="130" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">RED</text>
    <text x="200" y="148" textAnchor="middle" fill="white" fontSize="11">Write</text>
    <text x="200" y="162" textAnchor="middle" fill="white" fontSize="11">Failing Test</text>

    {/* Green - Make it pass */}
    <circle cx="400" cy="220" r="60" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="3"/>
    <text x="400" y="210" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">GREEN</text>
    <text x="400" y="228" textAnchor="middle" fill="white" fontSize="11">Write Code</text>
    <text x="400" y="242" textAnchor="middle" fill="white" fontSize="11">to Pass</text>

    {/* Refactor - Improve code */}
    <circle cx="600" cy="140" r="60" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="3"/>
    <text x="600" y="130" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">REFACTOR</text>
    <text x="600" y="148" textAnchor="middle" fill="white" fontSize="11">Improve</text>
    <text x="600" y="162" textAnchor="middle" fill="white" fontSize="11">Code Quality</text>

    {/* Curved arrows forming cycle */}
    <path d="M 250 115 Q 320 80 350 180"
          stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowTDD)"/>
    <text x="300" y="120" fill="#94a3b8" fontSize="11">1</text>

    <path d="M 450 195 Q 520 170 555 165"
          stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowTDD)"/>
    <text x="505" y="180" fill="#94a3b8" fontSize="11">2</text>

    <path d="M 560 90 Q 430 50 230 105"
          stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowTDD)"/>
    <text x="400" y="65" fill="#94a3b8" fontSize="11">3</text>

    {/* Center label */}
    <text x="400" y="135" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">Repeat</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Testing({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'unit-testing',
      name: 'Unit Testing (JUnit)',
      icon: '🔬',
      color: '#3b82f6',
      description: 'Fundamental unit testing with JUnit 5 - test lifecycle, annotations, assertions, and parameterized tests',
      diagram: JUnitLifecycleDiagram,
      details: [
        {
          name: 'Test Lifecycle & Annotations',
          diagram: JUnitLifecycleDiagram,
          explanation: 'Unit testing validates individual components in isolation. JUnit 5 provides annotations for test lifecycle management: @BeforeAll runs once before all tests (must be static), @BeforeEach runs before each test for setup, @Test marks test methods, @AfterEach runs cleanup after each test, and @AfterAll runs once after all tests complete. This lifecycle ensures proper test isolation and resource management.',
          codeExample: `import org.junit.jupiter.api.*;
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
    int a = 5, b = 3;

    // Act
    int result = calculator.add(a, b);

    // Assert
    assertEquals(8, result, "5 + 3 should equal 8");
  }

  @AfterEach
  void tearDown() {
    calculator = null;
  }

  @AfterAll
  static void tearDownAll() {
    System.out.println("All tests completed");
  }
}`
        },
        {
          name: 'Assertions & Exception Testing',
          explanation: 'JUnit assertions validate expected outcomes. Common assertions include assertEquals() for value comparison, assertTrue()/assertFalse() for boolean conditions, assertNull()/assertNotNull() for reference checks, and assertThrows() for exception testing. The assertAll() method performs multiple assertions together, reporting all failures instead of stopping at the first.',
          codeExample: `@Test
void testDivision() {
  assertEquals(2, calculator.divide(10, 5));
  assertEquals(0, calculator.divide(0, 5));
}

@Test
void testDivisionByZero() {
  Exception exception = assertThrows(
    ArithmeticException.class,
    () -> calculator.divide(10, 0)
  );
  assertEquals("Division by zero", exception.getMessage());
}

@Test
void testAllOperations() {
  assertAll("calculator",
    () -> assertEquals(8, calculator.add(5, 3)),
    () -> assertEquals(2, calculator.subtract(5, 3)),
    () -> assertEquals(15, calculator.multiply(5, 3)),
    () -> assertEquals(1, calculator.divide(5, 3))
  );
}`
        },
        {
          name: 'Parameterized Tests',
          explanation: 'Parameterized tests reduce code duplication by running the same test with different inputs. @ParameterizedTest with @ValueSource provides simple value arrays. @CsvSource supplies multiple parameters per test case. @MethodSource allows complex parameter generation from custom methods. This approach improves test coverage while maintaining clean, maintainable test code.',
          codeExample: `@ParameterizedTest
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
}`
        }
      ]
    },
    {
      id: 'mocking',
      name: 'Mocking (Mockito)',
      icon: '🎭',
      color: '#10b981',
      description: 'Mock dependencies with Mockito for isolated unit testing - stubbing, verification, and argument matchers',
      diagram: MockitoPatternDiagram,
      details: [
        {
          name: 'Mock Setup & Stubbing',
          diagram: MockitoPatternDiagram,
          explanation: 'Mockito creates test doubles for dependencies, enabling isolated unit testing. Use @Mock to create mock objects and @InjectMocks to automatically inject mocks into the class under test. The when().thenReturn() pattern stubs method calls with predefined responses. This isolates the system under test from its dependencies, making tests faster and more focused.',
          codeExample: `import org.mockito.*;
import static org.mockito.Mockito.*;

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
  }`
        },
        {
          name: 'Argument Matchers & Verification',
          explanation: 'Argument matchers like any(), eq(), and anyString() make stubbing flexible. The verify() method confirms interactions happened with expected parameters. Use times() to verify call count, never() to ensure methods were not called, and custom argument matchers with argThat() for complex validation. Verification ensures your code behaves correctly under test conditions.',
          codeExample: `@Test
void testFindUserById() {
  User user = new User("john@example.com", "John Doe");
  when(userRepository.findById(1L))
    .thenReturn(Optional.of(user));

  Optional<User> result = userService.findById(1L);

  assertTrue(result.isPresent());
  assertEquals("John Doe", result.get().getName());
  verify(userRepository, times(1)).findById(1L);
}

@Test
void testArgumentMatchers() {
  when(userRepository.findByEmail(anyString()))
    .thenReturn(Optional.of(new User()));

  userService.findByEmail("test@example.com");

  verify(userRepository).findByEmail(eq("test@example.com"));
}

@Test
void testCustomArgumentMatcher() {
  when(userRepository.save(argThat(user ->
    user.getEmail().endsWith("@example.com")
  ))).thenReturn(new User());

  userService.createUser(
    new User("test@example.com", "Test")
  );

  verify(userRepository).save(any(User.class));
}`
        },
        {
          name: 'Void Methods & Exceptions',
          explanation: 'For void methods, use doNothing(), doThrow(), or doAnswer() instead of when(). The doThrow() method simulates exceptions from dependencies. Spies (@Spy) create partial mocks that use real implementations selectively. Spring Boot integration uses @MockBean to replace beans in the application context during tests.',
          codeExample: `@Test
void testDeleteUser() {
  doNothing().when(userRepository).deleteById(1L);

  userService.deleteUser(1L);

  verify(userRepository).deleteById(1L);
}

@Test
void testCreateUserWithException() {
  when(userRepository.save(any(User.class)))
    .thenThrow(new RuntimeException("Database error"));

  assertThrows(RuntimeException.class, () -> {
    userService.createUser(new User());
  });
}

@Test
void testWithSpy() {
  List<String> realList = new ArrayList<>();
  List<String> spyList = spy(realList);

  spyList.add("one");
  spyList.add("two");

  verify(spyList).add("one");
  assertEquals(2, spyList.size());
}`
        }
      ]
    },
    {
      id: 'integration-testing',
      name: 'Integration Testing',
      icon: '🔗',
      color: '#f59e0b',
      description: 'Test component interactions with Spring Boot - MockMvc, TestContainers, and repository testing',
      details: [
        {
          name: 'Spring Boot Test Annotations',
          explanation: 'Integration tests verify multiple components work together. @SpringBootTest loads the full application context, @WebMvcTest tests only the MVC layer with minimal context, and @DataJpaTest configures an in-memory database for repository testing. These annotations provide different levels of integration testing with appropriate context loading.',
          codeExample: `import org.springframework.boot.test.context.*;
import org.springframework.test.web.servlet.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
      .andExpect(jsonPath("$.email").value("test@example.com"));

    assertEquals(1, userRepository.count());
  }
}`
        },
        {
          name: 'Repository & Controller Testing',
          explanation: 'Repository testing with @DataJpaTest provides TestEntityManager for database operations and automatic rollback after tests. Controller testing with @WebMvcTest loads only web layer components and requires @MockBean for services. MockMvc simulates HTTP requests without starting a server, enabling fast controller testing.',
          codeExample: `@DataJpaTest
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
}

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
}`
        },
        {
          name: 'TestContainers & TestRestTemplate',
          explanation: 'Testcontainers provide real database instances in Docker containers for realistic integration tests. Use @Container to define containers and @DynamicPropertySource to configure Spring properties from container details. TestRestTemplate makes real HTTP calls to a running server, enabling end-to-end API testing within integration tests.',
          codeExample: `@SpringBootTest
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
}`
        }
      ]
    },
    {
      id: 'tdd',
      name: 'Test-Driven Development',
      icon: '🔴🟢',
      color: '#8b5cf6',
      description: 'Red-Green-Refactor cycle - write tests first, minimal code to pass, then improve quality',
      diagram: TDDCycleDiagram,
      details: [
        {
          name: 'TDD Workflow',
          diagram: TDDCycleDiagram,
          explanation: 'Test-Driven Development follows the Red-Green-Refactor cycle. First, write a failing test that defines desired behavior (Red). Then write minimal code to make the test pass (Green). Finally, improve code quality while keeping tests green (Refactor). This cycle drives better design, ensures testable code, and provides living documentation. Start with the simplest test case and incrementally add complexity.',
          codeExample: `// Step 1: RED - Write failing test
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
// Test fails - push() doesn't exist`
        },
        {
          name: 'Incremental Implementation',
          explanation: 'TDD encourages incremental development. Each new test drives the next piece of functionality. Write only enough code to pass the current test, then refactor. This prevents over-engineering and keeps the codebase focused on actual requirements. The tests serve as specifications and safety net for changes.',
          codeExample: `// Step 4: GREEN - Implement push
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
// Test fails - pop() doesn't exist`
        },
        {
          name: 'Refactor & Complete',
          explanation: 'After tests pass, refactor to improve design, add error handling, and enhance maintainability. Keep all tests green during refactoring. Add edge cases and validation. The final implementation emerges from iterative test-driven development, with comprehensive test coverage built in from the start.',
          codeExample: `// Step 6: GREEN & REFACTOR - Complete implementation
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
}`
        }
      ]
    },
    {
      id: 'bdd',
      name: 'BDD with Cucumber',
      icon: '📝',
      color: '#ec4899',
      description: 'Behavior-Driven Development - Given-When-Then scenarios with Cucumber and step definitions',
      details: [
        {
          name: 'Gherkin Feature Files',
          explanation: 'Behavior-Driven Development uses natural language to describe application behavior. Cucumber interprets Gherkin syntax feature files with Given-When-Then structure. Given sets the context, When describes the action, and Then specifies the expected outcome. Feature files serve as executable specifications and living documentation that bridges communication between developers, testers, and stakeholders.',
          codeExample: `Feature: User Registration
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
      | test@test.com   | short     | Password too short       |`
        },
        {
          name: 'Step Definitions',
          explanation: 'Step definitions map Gherkin steps to Java code using annotations like @Given, @When, @Then. Parameters in steps (strings in quotes, numbers) are captured and passed to methods. Step definitions interact with the application to perform actions and verify outcomes. Reusable steps reduce duplication across scenarios.',
          codeExample: `import io.cucumber.java.en.*;
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

  @Then("I should see a success message")
  public void verifySuccessMessage() {
    assertTrue(registrationPage.hasSuccessMessage());
  }

  @Then("I should see an error {string}")
  public void verifyError(String expectedError) {
    String actualError = registrationPage.getErrorMessage();
    assertEquals(expectedError, actualError);
  }
}`
        },
        {
          name: 'Hooks & Data Tables',
          explanation: 'Cucumber hooks manage test lifecycle with @Before and @After annotations. Tagged hooks (@Before("@integration")) run only for scenarios with specific tags. Data tables pass structured data to step definitions, enabling complex test scenarios. The CucumberTest runner configures Cucumber execution and reporting.',
          codeExample: `import io.cucumber.java.*;

public class Hooks {

  @Before
  public void setUp() {
    System.out.println("Setting up test environment");
    DatabaseHelper.cleanDatabase();
  }

  @After
  public void tearDown() {
    DatabaseHelper.cleanDatabase();
  }

  @Before("@integration")
  public void setUpIntegration() {
    TestContainer.start();
  }
}

// Data Tables example
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

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
public class CucumberTest {}`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Testing',
      icon: '⚡',
      color: '#06b6d4',
      description: 'Load and performance testing with JMeter, Gatling, and JMH microbenchmarking',
      details: [
        {
          name: 'Load Testing Types',
          explanation: 'Performance testing validates system behavior under load. Load testing simulates expected user load to verify performance meets requirements. Stress testing finds system breaking points by gradually increasing load. Spike testing validates sudden load increase handling. Endurance/soak testing checks long-term stability. Key metrics include throughput (requests/second), latency percentiles (p50, p95, p99), and error rate.',
          codeExample: `// JMeter Test Plan concept
/*
Thread Group:
  - Number of Threads: 100
  - Ramp-Up Period: 10 seconds
  - Loop Count: 10

HTTP Request:
  - Method: POST
  - Path: /api/users
  - Body: {"email": "user\${__threadNum}@test.com"}

Assertions:
  - Response Code: 201
  - Response Time: < 500ms

Listeners:
  - Aggregate Report
  - Response Time Graph
*/

@Test
@Timeout(value = 5, unit = TimeUnit.SECONDS)
void testPerformance() {
  long start = System.currentTimeMillis();

  for (int i = 0; i < 10000; i++) {
    userService.findById((long) i);
  }

  long duration = System.currentTimeMillis() - start;
  assertTrue(duration < 3000, "Should complete in under 3 seconds");
}`
        },
        {
          name: 'Gatling Performance Tests',
          explanation: 'Gatling provides code-based performance testing with a Java API. Define HTTP protocol configuration, scenario with request patterns, and injection profiles (ramp users, constant load). Gatling generates detailed reports with response time percentiles, throughput graphs, and error analysis. Assertions verify performance requirements.',
          codeExample: `import io.gatling.javaapi.core.*;
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
        .body(StringBody("{\\"email\\":\\"user@test.com\\"}"))
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
        rampUsers(100).during(30),
        constantUsersPerSec(10).during(60)
      )
    ).protocols(httpProtocol)
     .assertions(
       global().responseTime().max().lt(1000),
       global().successfulRequests().percent().gt(95.0)
     );
  }
}`
        },
        {
          name: 'JMH Microbenchmarking',
          explanation: 'JMH (Java Microbenchmark Harness) provides accurate microbenchmarking for Java code. Annotations configure benchmark mode (throughput, average time, etc.), warmup iterations, measurement iterations, and parameters. JMH handles JVM warmup, prevents dead code elimination, and produces statistically significant results for performance comparisons.',
          codeExample: `import org.openjdk.jmh.annotations.*;
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

// Run: mvn jmh:run`
        }
      ]
    },
    {
      id: 'contract',
      name: 'Contract Testing',
      icon: '🤝',
      color: '#84cc16',
      description: 'API contract verification with Pact and Spring Cloud Contract for microservices',
      details: [
        {
          name: 'Consumer-Driven Contracts (Pact)',
          explanation: 'Contract testing validates API contracts between services. Consumer-driven contracts let consumers define expectations, then verify providers meet them. Pact generates provider verification tests from consumer tests. Contracts serve as API documentation and prevent breaking changes. Tests run independently without requiring running services.',
          codeExample: `import au.com.dius.pact.consumer.*;
import au.com.dius.pact.consumer.dsl.*;

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
  }
}`
        },
        {
          name: 'Provider Verification',
          explanation: 'Pact provider tests verify the provider implementation matches consumer contracts. The @Provider annotation identifies the provider being tested. @State annotations set up test data for specific contract scenarios. PactVerificationContext runs interactions against the real provider implementation, ensuring contract compatibility.',
          codeExample: `@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
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
}`
        },
        {
          name: 'Spring Cloud Contract',
          explanation: 'Spring Cloud Contract uses Groovy DSL or YAML to define contracts. Contracts specify request patterns and expected responses. The framework generates tests for both provider and consumer sides. Contracts live with the provider code and are published as test stubs. This ensures API compatibility across microservices.',
          codeExample: `// Contract (Groovy DSL)
/*
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
}`
        }
      ]
    },
    {
      id: 'cicd',
      name: 'Test Automation & CI/CD',
      icon: '🤖',
      color: '#ef4444',
      description: 'Automated testing in pipelines - Maven plugins, parallel execution, coverage, and quality gates',
      diagram: CICDIntegrationDiagram,
      details: [
        {
          name: 'Maven Surefire & Failsafe',
          diagram: CICDIntegrationDiagram,
          explanation: 'Maven Surefire runs unit tests during the test phase, while Failsafe runs integration tests during verify phase. Configure parallel execution to speed up test suites. Use includes/excludes patterns to control which tests run. Tag-based execution with JUnit @Tag allows selective test runs (smoke tests, integration tests, slow tests).',
          codeExample: `<!-- pom.xml Maven configuration -->
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
  </plugins>
</build>`
        },
        {
          name: 'Code Coverage & Quality',
          explanation: 'JaCoCo measures code coverage and enforces minimum thresholds. Coverage reports show line, branch, and method coverage. Aim for 80%+ coverage on critical code paths. Mutation testing with PIT validates test effectiveness by mutating code and verifying tests fail. Quality gates in CI/CD prevent merging code that fails coverage or quality requirements.',
          codeExample: `<!-- JaCoCo Coverage -->
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

@Test
@Tag("unit")
void fastUnitTest() {
  assertEquals(2, 1 + 1);
}

@Test
@Tag("integration")
@Tag("slow")
void slowIntegrationTest() {
  // Integration test
}`
        },
        {
          name: 'CI/CD Pipeline Integration',
          explanation: 'CI/CD pipelines automate test execution on every commit. Configure GitHub Actions, Jenkins, or GitLab CI to run unit tests, integration tests, and generate coverage reports. Parallel test execution reduces pipeline duration. Publish test results and coverage to dashboards. Fail builds on test failures or coverage drops. The testing pyramid guides test distribution: many fast unit tests, fewer integration tests, minimal E2E tests.',
          codeExample: `# GitHub Actions CI Pipeline
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
        reporter: java-junit`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

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
      { name: 'Testing', icon: '🧪', page: 'Testing' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #0ea5e9, #0c4a6e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(12, 74, 110, 0.2)',
    border: '1px solid rgba(12, 74, 110, 0.3)',
    borderRadius: '0.5rem',
    color: '#0ea5e9',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>🧪 Testing</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(12, 74, 110, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(12, 74, 110, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TESTING_COLORS}
        />
      </div>

      {/* Overview Diagram */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(12, 74, 110, 0.3)'
      }}>
        <TestingPyramidDiagram />
        <div style={{ marginTop: '1rem' }}>
          <TestTypesDiagram />
        </div>
      </div>

      {/* Concept Cards */}
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

      {/* Modal */}
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={TESTING_COLORS}
            />

            {/* Modal Header */}
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

            {/* Tabs */}
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

            {/* Content */}
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

export default Testing

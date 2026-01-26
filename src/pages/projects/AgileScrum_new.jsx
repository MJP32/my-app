import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const AGILE_COLORS = {
  primary: '#0891b2',
  primaryHover: '#06b6d4',
  bg: 'rgba(8, 145, 178, 0.1)',
  border: 'rgba(8, 145, 178, 0.3)',
  arrow: '#06b6d4',
  hoverBg: 'rgba(8, 145, 178, 0.2)',
  topicBg: 'rgba(8, 145, 178, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// Agile Principles Diagram - Agile Manifesto visualization
const AgilePrinciplesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="agile-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Agile Manifesto Values</text>

    {/* Value 1 */}
    <rect x="30" y="50" width="160" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
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
    <text x="510" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Responding</text>
    <text x="510" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">to Change</text>
    <text x="615" y="145" textAnchor="middle" fill="#64748b" fontSize="11">over</text>
    <rect x="640" y="120" width="130" height="50" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2"/>
    <text x="705" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">Following</text>
    <text x="705" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">a Plan</text>

    {/* Iterative cycle */}
    <circle cx="200" cy="230" r="30" fill="none" stroke="#3b82f6" strokeWidth="3"/>
    <text x="200" y="235" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Plan</text>
    <circle cx="320" cy="230" r="30" fill="none" stroke="#10b981" strokeWidth="3"/>
    <text x="320" y="235" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Build</text>
    <circle cx="440" cy="230" r="30" fill="none" stroke="#f59e0b" strokeWidth="3"/>
    <text x="440" y="235" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Test</text>
    <circle cx="560" cy="230" r="30" fill="none" stroke="#8b5cf6" strokeWidth="3"/>
    <text x="560" y="235" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Review</text>

    <line x1="230" y1="230" x2="285" y2="230" stroke="#4ade80" strokeWidth="2" markerEnd="url(#agile-arrow)"/>
    <line x1="350" y1="230" x2="405" y2="230" stroke="#4ade80" strokeWidth="2" markerEnd="url(#agile-arrow)"/>
    <line x1="470" y1="230" x2="525" y2="230" stroke="#4ade80" strokeWidth="2" markerEnd="url(#agile-arrow)"/>
    <path d="M 560 200 Q 560 180, 400 180 Q 200 180, 200 200" fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="195" textAnchor="middle" fill="#64748b" fontSize="9">Iterate</text>
  </svg>
)

// Scrum Framework Diagram
const ScrumFrameworkDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="scrum-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Scrum Framework Overview</text>

    {/* Roles */}
    <rect x="30" y="50" width="200" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="70" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Scrum Roles</text>
    <text x="130" y="90" textAnchor="middle" fill="#9ca3af" fontSize="10">Product Owner</text>
    <text x="130" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">Scrum Master</text>
    <text x="130" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">Development Team</text>

    {/* Artifacts */}
    <rect x="300" y="50" width="200" height="80" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Artifacts</text>
    <text x="400" y="90" textAnchor="middle" fill="#9ca3af" fontSize="10">Product Backlog</text>
    <text x="400" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">Sprint Backlog</text>
    <text x="400" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">Increment</text>

    {/* Events */}
    <rect x="570" y="50" width="200" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="670" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Events</text>
    <text x="670" y="90" textAnchor="middle" fill="#9ca3af" fontSize="10">Sprint Planning • Daily Scrum</text>
    <text x="670" y="105" textAnchor="middle" fill="#9ca3af" fontSize="10">Sprint Review</text>
    <text x="670" y="120" textAnchor="middle" fill="#9ca3af" fontSize="10">Retrospective</text>

    {/* Sprint Cycle */}
    <rect x="150" y="160" width="500" height="130" rx="12" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="180" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Sprint (1-4 weeks)</text>

    <rect x="180" y="200" width="100" height="60" rx="6" fill="#3b82f6"/>
    <text x="230" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sprint</text>
    <text x="230" y="240" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Planning</text>

    <rect x="310" y="200" width="80" height="60" rx="6" fill="#10b981"/>
    <text x="350" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Daily</text>
    <text x="350" y="240" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Scrum</text>

    <rect x="420" y="200" width="80" height="60" rx="6" fill="#f59e0b"/>
    <text x="460" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sprint</text>
    <text x="460" y="240" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Review</text>

    <rect x="530" y="200" width="100" height="60" rx="6" fill="#8b5cf6"/>
    <text x="580" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Retro-</text>
    <text x="580" y="240" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">spective</text>

    {/* Arrows */}
    <line x1="280" y1="230" x2="305" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#scrum-arrow)"/>
    <line x1="390" y1="230" x2="415" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#scrum-arrow)"/>
    <line x1="500" y1="230" x2="525" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#scrum-arrow)"/>

    {/* Increment output */}
    <rect x="680" y="200" width="80" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="720" y="225" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Shippable</text>
    <text x="720" y="240" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Increment</text>
    <line x1="630" y1="230" x2="675" y2="230" stroke="#22c55e" strokeWidth="2" markerEnd="url(#scrum-arrow)"/>
  </svg>
)

// Sprint Planning Diagram
const SprintPlanningDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="sprint-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Sprint Planning Process</text>

    {/* Input */}
    <rect x="30" y="60" width="120" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Product</text>
    <text x="90" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Backlog</text>
    <text x="90" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="9">(Prioritized)</text>

    {/* Part 1 */}
    <rect x="190" y="50" width="180" height="100" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="280" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Part 1: WHAT</text>
    <text x="280" y="95" textAnchor="middle" fill="#9ca3af" fontSize="9">• PO presents priorities</text>
    <text x="280" y="110" textAnchor="middle" fill="#9ca3af" fontSize="9">• Team asks questions</text>
    <text x="280" y="125" textAnchor="middle" fill="#9ca3af" fontSize="9">• Define Sprint Goal</text>
    <text x="280" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">• Select stories</text>

    {/* Part 2 */}
    <rect x="410" y="50" width="180" height="100" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Part 2: HOW</text>
    <text x="500" y="95" textAnchor="middle" fill="#9ca3af" fontSize="9">• Break into tasks</text>
    <text x="500" y="110" textAnchor="middle" fill="#9ca3af" fontSize="9">• Estimate effort</text>
    <text x="500" y="125" textAnchor="middle" fill="#9ca3af" fontSize="9">• Identify dependencies</text>
    <text x="500" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">• Plan capacity</text>

    {/* Output */}
    <rect x="630" y="60" width="140" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="700" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sprint</text>
    <text x="700" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Backlog</text>
    <text x="700" y="120" textAnchor="middle" fill="#bbf7d0" fontSize="9">+ Sprint Goal</text>

    {/* Arrows */}
    <line x1="150" y1="100" x2="185" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>
    <line x1="370" y1="100" x2="405" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>
    <line x1="590" y1="100" x2="625" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#sprint-arrow)"/>

    {/* Capacity box */}
    <rect x="220" y="180" width="360" height="60" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="200" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Capacity Planning</text>
    <text x="400" y="220" textAnchor="middle" fill="#9ca3af" fontSize="10">Team Hours - Meetings - PTO - Buffer = Available Capacity</text>
    <text x="400" y="235" textAnchor="middle" fill="#9ca3af" fontSize="9">Don't overcommit! Leave buffer for unexpected issues</text>
  </svg>
)

// User Stories Diagram
const UserStoriesDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="story-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">User Story Structure</text>

    {/* Story Card */}
    <rect x="50" y="50" width="300" height="140" rx="12" fill="#1f2937" stroke="#ec4899" strokeWidth="3"/>
    <text x="200" y="75" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">User Story Card</text>

    <text x="70" y="100" fill="#60a5fa" fontSize="11" fontWeight="bold">As a</text>
    <text x="110" y="100" fill="#9ca3af" fontSize="11">[user type]</text>

    <text x="70" y="125" fill="#34d399" fontSize="11" fontWeight="bold">I want</text>
    <text x="120" y="125" fill="#9ca3af" fontSize="11">[feature/action]</text>

    <text x="70" y="150" fill="#fbbf24" fontSize="11" fontWeight="bold">So that</text>
    <text x="125" y="150" fill="#9ca3af" fontSize="11">[benefit/value]</text>

    <text x="70" y="175" fill="#a78bfa" fontSize="10" fontWeight="bold">Story Points:</text>
    <text x="155" y="175" fill="#9ca3af" fontSize="10">5</text>

    {/* INVEST Criteria */}
    <rect x="400" y="50" width="180" height="140" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="490" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">INVEST Criteria</text>
    <text x="420" y="100" fill="#9ca3af" fontSize="10"><tspan fill="#8b5cf6" fontWeight="bold">I</tspan>ndependent</text>
    <text x="420" y="118" fill="#9ca3af" fontSize="10"><tspan fill="#8b5cf6" fontWeight="bold">N</tspan>egotiable</text>
    <text x="420" y="136" fill="#9ca3af" fontSize="10"><tspan fill="#8b5cf6" fontWeight="bold">V</tspan>aluable</text>
    <text x="420" y="154" fill="#9ca3af" fontSize="10"><tspan fill="#8b5cf6" fontWeight="bold">E</tspan>stimable</text>
    <text x="420" y="172" fill="#9ca3af" fontSize="10"><tspan fill="#8b5cf6" fontWeight="bold">S</tspan>mall</text>
    <text x="420" y="190" fill="#9ca3af" fontSize="10"><tspan fill="#8b5cf6" fontWeight="bold">T</tspan>estable</text>

    {/* Acceptance Criteria */}
    <rect x="620" y="50" width="150" height="140" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="695" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Acceptance</text>
    <text x="695" y="90" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Criteria</text>
    <text x="640" y="115" fill="#9ca3af" fontSize="9">✓ Given [context]</text>
    <text x="640" y="135" fill="#9ca3af" fontSize="9">✓ When [action]</text>
    <text x="640" y="155" fill="#9ca3af" fontSize="9">✓ Then [result]</text>
    <text x="640" y="180" fill="#64748b" fontSize="8">Clear, testable conditions</text>

    {/* Story breakdown */}
    <rect x="100" y="210" width="600" height="55" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="230" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Story Breakdown: Epic → Feature → User Story → Task</text>
    <text x="400" y="250" textAnchor="middle" fill="#9ca3af" fontSize="10">Large initiatives are split into smaller, deliverable pieces</text>
  </svg>
)

// Scrum Ceremonies Diagram
const ScrumCeremoniesDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="ceremony-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Scrum Ceremonies Timeline</text>

    {/* Sprint timeline */}
    <line x1="50" y1="80" x2="750" y2="80" stroke="#4b5563" strokeWidth="3"/>
    <text x="50" y="70" fill="#64748b" fontSize="10">Day 1</text>
    <text x="380" y="70" fill="#64748b" fontSize="10">Days 2-9</text>
    <text x="750" y="70" fill="#64748b" fontSize="10" textAnchor="end">Day 10</text>

    {/* Sprint Planning */}
    <rect x="30" y="100" width="140" height="90" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Sprint Planning</text>
    <text x="100" y="145" textAnchor="middle" fill="#bfdbfe" fontSize="9">4-8 hours</text>
    <text x="100" y="165" textAnchor="middle" fill="#bfdbfe" fontSize="8">Define Sprint Goal</text>
    <text x="100" y="180" textAnchor="middle" fill="#bfdbfe" fontSize="8">{`Select & plan work`}</text>
    <circle cx="100" cy="80" r="6" fill="#3b82f6"/>

    {/* Daily Scrum */}
    <rect x="220" y="100" width="140" height="90" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="290" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Daily Scrum</text>
    <text x="290" y="145" textAnchor="middle" fill="#a7f3d0" fontSize="9">15 minutes</text>
    <text x="290" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="8">Sync progress</text>
    <text x="290" y="180" textAnchor="middle" fill="#a7f3d0" fontSize="8">Identify blockers</text>
    <circle cx="290" cy="80" r="6" fill="#10b981"/>
    <text x="290" y="95" textAnchor="middle" fill="#64748b" fontSize="8">(Daily)</text>

    {/* Development Work */}
    <rect x="400" y="100" width="120" height="90" rx="8" fill="#64748b" stroke="#9ca3af" strokeWidth="2"/>
    <text x="460" y="130" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Development</text>
    <text x="460" y="150" textAnchor="middle" fill="#d1d5db" fontSize="9">Work</text>
    <text x="460" y="175" textAnchor="middle" fill="#d1d5db" fontSize="8">Build increment</text>

    {/* Sprint Review */}
    <rect x="560" y="100" width="110" height="90" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="615" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Sprint Review</text>
    <text x="615" y="145" textAnchor="middle" fill="#fef3c7" fontSize="9">2-4 hours</text>
    <text x="615" y="165" textAnchor="middle" fill="#fef3c7" fontSize="8">Demo to</text>
    <text x="615" y="180" textAnchor="middle" fill="#fef3c7" fontSize="8">stakeholders</text>
    <circle cx="660" cy="80" r="6" fill="#f59e0b"/>

    {/* Retrospective */}
    <rect x="690" y="100" width="90" height="90" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="735" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Retro</text>
    <text x="735" y="145" textAnchor="middle" fill="#ddd6fe" fontSize="9">1.5-3 hrs</text>
    <text x="735" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="8">Improve</text>
    <text x="735" y="180" textAnchor="middle" fill="#ddd6fe" fontSize="8">process</text>
    <circle cx="735" cy="80" r="6" fill="#8b5cf6"/>

    {/* Three Pillars */}
    <rect x="150" y="220" width="500" height="60" rx="8" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="400" y="245" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">Three Pillars of Scrum</text>
    <text x="250" y="265" textAnchor="middle" fill="#9ca3af" fontSize="10">Transparency</text>
    <text x="400" y="265" textAnchor="middle" fill="#9ca3af" fontSize="10">Inspection</text>
    <text x="550" y="265" textAnchor="middle" fill="#9ca3af" fontSize="10">Adaptation</text>
  </svg>
)

// Agile Estimation Diagram
const AgileEstimationDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <marker id="est-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Agile Estimation Techniques</text>

    {/* Fibonacci */}
    <rect x="30" y="50" width="220" height="100" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Fibonacci Scale</text>
    <text x="140" y="95" textAnchor="middle" fill="#9ca3af" fontSize="10">Story Points</text>
    <g transform="translate(50, 110)">
      <rect x="0" y="0" width="25" height="25" rx="4" fill="#3b82f6"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="10">1</text>
      <rect x="30" y="0" width="25" height="25" rx="4" fill="#3b82f6"/><text x="42" y="17" textAnchor="middle" fill="white" fontSize="10">2</text>
      <rect x="60" y="0" width="25" height="25" rx="4" fill="#10b981"/><text x="72" y="17" textAnchor="middle" fill="white" fontSize="10">3</text>
      <rect x="90" y="0" width="25" height="25" rx="4" fill="#10b981"/><text x="102" y="17" textAnchor="middle" fill="white" fontSize="10">5</text>
      <rect x="120" y="0" width="25" height="25" rx="4" fill="#f59e0b"/><text x="132" y="17" textAnchor="middle" fill="white" fontSize="10">8</text>
      <rect x="150" y="0" width="25" height="25" rx="4" fill="#ef4444"/><text x="162" y="17" textAnchor="middle" fill="white" fontSize="9">13</text>
    </g>

    {/* Planning Poker */}
    <rect x="280" y="50" width="220" height="100" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Planning Poker</text>
    <text x="390" y="100" textAnchor="middle" fill="#9ca3af" fontSize="9">1. PO reads story</text>
    <text x="390" y="115" textAnchor="middle" fill="#9ca3af" fontSize="9">2. Team discusses</text>
    <text x="390" y="130" textAnchor="middle" fill="#9ca3af" fontSize="9">3. Everyone votes simultaneously</text>
    <text x="390" y="145" textAnchor="middle" fill="#9ca3af" fontSize="9">4. Discuss outliers, re-vote</text>

    {/* T-Shirt Sizing */}
    <rect x="530" y="50" width="240" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">T-Shirt Sizing</text>
    <g transform="translate(550, 90)">
      <rect x="0" y="0" width="35" height="30" rx="4" fill="#22c55e"/><text x="17" y="20" textAnchor="middle" fill="white" fontSize="10">XS</text>
      <rect x="45" y="0" width="35" height="30" rx="4" fill="#3b82f6"/><text x="62" y="20" textAnchor="middle" fill="white" fontSize="10">S</text>
      <rect x="90" y="0" width="35" height="30" rx="4" fill="#f59e0b"/><text x="107" y="20" textAnchor="middle" fill="white" fontSize="10">M</text>
      <rect x="135" y="0" width="35" height="30" rx="4" fill="#ef4444"/><text x="152" y="20" textAnchor="middle" fill="white" fontSize="10">L</text>
      <rect x="180" y="0" width="35" height="30" rx="4" fill="#8b5cf6"/><text x="197" y="20" textAnchor="middle" fill="white" fontSize="10">XL</text>
    </g>

    {/* Velocity */}
    <rect x="100" y="170" width="280" height="90" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="240" y="195" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Velocity Tracking</text>
    <text x="240" y="215" textAnchor="middle" fill="#9ca3af" fontSize="10">Sprint 1: 18 pts | Sprint 2: 22 pts | Sprint 3: 20 pts</text>
    <text x="240" y="235" textAnchor="middle" fill="#9ca3af" fontSize="10">Average Velocity: 20 points/sprint</text>
    <text x="240" y="250" textAnchor="middle" fill="#64748b" fontSize="9">Use for future sprint planning</text>

    {/* Burndown */}
    <rect x="420" y="170" width="280" height="90" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="195" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Sprint Burndown</text>
    <text x="560" y="215" textAnchor="middle" fill="#9ca3af" fontSize="10">Track remaining work daily</text>
    <text x="560" y="235" textAnchor="middle" fill="#9ca3af" fontSize="10">Ideal line vs Actual progress</text>
    <text x="560" y="250" textAnchor="middle" fill="#64748b" fontSize="9">Early warning for scope issues</text>
  </svg>
)

// Agile Best Practices Diagram
const AgileBestPracticesDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Agile Best Practices</text>

    {/* Center - Continuous Improvement */}
    <circle cx="400" cy="160" r="60" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="3"/>
    <text x="400" y="155" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Continuous</text>
    <text x="400" y="172" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Improvement</text>

    {/* Surrounding practices */}
    <rect x="50" y="50" width="130" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="115" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CI/CD</text>
    <text x="115" y="98" textAnchor="middle" fill="#bfdbfe" fontSize="8">Automate delivery</text>
    <text x="115" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="8">pipeline</text>
    <line x1="180" y1="100" x2="340" y2="140" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="230" y="50" width="130" height="70" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="295" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TDD</text>
    <text x="295" y="98" textAnchor="middle" fill="#a7f3d0" fontSize="8">Test-driven</text>
    <text x="295" y="110" textAnchor="middle" fill="#a7f3d0" fontSize="8">development</text>
    <line x1="295" y1="120" x2="370" y2="140" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="440" y="50" width="130" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="505" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Code Reviews</text>
    <text x="505" y="98" textAnchor="middle" fill="#fef3c7" fontSize="8">Peer collaboration</text>
    <text x="505" y="110" textAnchor="middle" fill="#fef3c7" fontSize="8">quality gates</text>
    <line x1="505" y1="120" x2="430" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="620" y="50" width="130" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="685" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pair Programming</text>
    <text x="685" y="98" textAnchor="middle" fill="#ddd6fe" fontSize="8">Knowledge sharing</text>
    <text x="685" y="110" textAnchor="middle" fill="#ddd6fe" fontSize="8">real-time review</text>
    <line x1="620" y1="100" x2="460" y2="140" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="50" y="200" width="130" height="70" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="115" y="230" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Refactoring</text>
    <text x="115" y="248" textAnchor="middle" fill="#fbcfe8" fontSize="8">Clean code</text>
    <text x="115" y="260" textAnchor="middle" fill="#fbcfe8" fontSize="8">reduce tech debt</text>
    <line x1="180" y1="230" x2="340" y2="180" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="230" y="200" width="130" height="70" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="295" y="230" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Definition of Done</text>
    <text x="295" y="248" textAnchor="middle" fill="#a5f3fc" fontSize="8">Clear completion</text>
    <text x="295" y="260" textAnchor="middle" fill="#a5f3fc" fontSize="8">criteria</text>
    <line x1="295" y1="200" x2="370" y2="180" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="440" y="200" width="130" height="70" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="505" y="230" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sustainable Pace</text>
    <text x="505" y="248" textAnchor="middle" fill="#fecaca" fontSize="8">No burnout</text>
    <text x="505" y="260" textAnchor="middle" fill="#fecaca" fontSize="8">40-hour weeks</text>
    <line x1="505" y1="200" x2="430" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"/>

    <rect x="620" y="200" width="130" height="70" rx="8" fill="#84cc16" stroke="#a3e635" strokeWidth="2"/>
    <text x="685" y="230" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Retrospectives</text>
    <text x="685" y="248" textAnchor="middle" fill="#d9f99d" fontSize="8">{`Learn & adapt`}</text>
    <text x="685" y="260" textAnchor="middle" fill="#d9f99d" fontSize="8">every sprint</text>
    <line x1="620" y1="230" x2="460" y2="180" stroke="#84cc16" strokeWidth="2" strokeDasharray="4,4"/>
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
      id: 'agile-principles',
      name: 'Agile Principles',
      icon: '📜',
      color: '#3b82f6',
      description: 'Agile Manifesto and 12 principles for iterative development',
      diagram: AgilePrinciplesDiagram,
      details: [
        {
          name: 'Manifesto Values',
          diagram: AgilePrinciplesDiagram,
          explanation: 'The Agile Manifesto defines four core values: Individuals and interactions over processes and tools, Working software over comprehensive documentation, Customer collaboration over contract negotiation, and Responding to change over following a plan. These values emphasize flexibility, collaboration, and customer feedback over rigid processes.',
          codeExample: `// Agile Manifesto in Practice

// 1. Individuals & Interactions - Team collaboration
public class AgileTeam {
  // Daily standup - face-to-face communication
  public void dailyStandup() {
    // 15 minutes, same time/place
    // Each person: Yesterday, Today, Blockers
  }

  // Pair programming - knowledge sharing
  public void pairProgram(Developer dev1, Developer dev2) {
    // Two developers, one computer
    // Driver writes code, Navigator reviews
    // Switch roles every 30 minutes
  }
}

// 2. Working Software - Deliver frequently
public class SprintCycle {
  // 2-week sprint produces shippable increment
  public void deliverWorkingSoftware() {
    // Sprint 1: User login (working feature)
    // Sprint 2: Add shopping cart (working feature)
    // Sprint 3: Add checkout (working feature)
    // Each sprint delivers value
  }
}

// 3. Customer Collaboration - Regular feedback
public class CustomerFeedback {
  public void sprintReview() {
    // Demo working software to stakeholders
    // Gather feedback
    // Adjust priorities
    // Adapt to changing needs
  }
}

// 4. Responding to Change - Flexible architecture
public interface PaymentProcessor {
  void processPayment(Payment payment);
}

// Easy to swap implementations
public class StripeProcessor implements PaymentProcessor {
  public void processPayment(Payment payment) {
    // Stripe implementation
  }
}

public class PayPalProcessor implements PaymentProcessor {
  public void processPayment(Payment payment) {
    // Added in Sprint 3 based on customer feedback
  }
}`
        },
        {
          name: '12 Principles',
          explanation: 'The 12 Agile principles guide teams: Deliver working software frequently, welcome changing requirements, business and developers work together daily, build projects around motivated individuals, face-to-face conversation is best, working software is primary measure of progress, sustainable development pace, continuous attention to technical excellence, simplicity, self-organizing teams, and regular team reflection.',
          codeExample: `// Key Agile Principles

// Principle 1: Customer satisfaction through early delivery
/*
Sprint 1 (2 weeks): Core login feature -> DEPLOY
Sprint 2 (2 weeks): Shopping cart -> DEPLOY
Sprint 3 (2 weeks): Checkout -> DEPLOY
Total: 6 weeks with 3 deployments

vs Waterfall: 6 months -> 1 deployment
*/

// Principle 3: Deliver frequently (weeks not months)
public class ContinuousDelivery {
  // Automated deployment pipeline
  public void deployToProduction() {
    runTests();
    if (allTestsPass()) {
      deployToStaging();
      runSmokeTests();
      deployToProduction();
    }
  }
}

// Principle 7: Working software = progress
public class Definition

OfDone {
  public boolean isFeatureDone() {
    return codeComplete() &&
           testsPass() &&
           codeReviewed() &&
           documentationUpdated() &&
           deployedToStaging() &&
           productOwnerAccepted();
  }
}

// Principle 8: Sustainable pace
/*
Avoid burnout:
- 40-hour work weeks
- No mandatory overtime
- Realistic sprint commitments
- Team velocity tracking
- Buffer time for unexpected issues
*/

// Principle 9: Technical excellence
public class QualityPractices {
  // Write clean, maintainable code
  public void developFeature() {
    writeTests();        // TDD
    implementFeature();
    refactorCode();      // Continuous improvement
    codeReview();        // Peer review
    integrate();         // CI/CD
  }
}

// Principle 12: Regular reflection
/*
Sprint Retrospective (end of each sprint):
1. What went well?
2. What didn't go well?
3. What will we improve?

Action items with owners and deadlines
*/`
        },
        {
          name: 'Agile vs Waterfall',
          explanation: 'Waterfall follows sequential phases (requirements, design, implementation, testing, deployment) with late delivery and inflexibility. Agile uses iterative development with frequent releases, early feedback, and ability to adapt. Agile reduces risk, delivers value faster, and increases customer satisfaction through continuous collaboration and working software.',
          codeExample: `// Agile vs Waterfall Comparison

/*
WATERFALL APPROACH (Sequential)
═══════════════════════════════════════════════════════
Requirements Gathering    → 2 months
System Design            → 2 months
Implementation           → 4 months
Testing                  → 2 months
Deployment               → 1 month
Total: 11 months to first release

Problems:
- Changes are expensive
- Late discovery of issues
- No early feedback
- High risk
- Customer sees product at end
*/

/*
AGILE APPROACH (Iterative)
═══════════════════════════════════════════════════════
Sprint 1 (2 weeks): User Authentication
  - Requirements → Design → Build → Test → Deploy
  - Customer feedback

Sprint 2 (2 weeks): Product Catalog
  - Requirements → Design → Build → Test → Deploy
  - Customer feedback

Sprint 3 (2 weeks): Shopping Cart
  - Requirements → Design → Build → Test → Deploy
  - Customer feedback

Total: 2 weeks to first release, continuous delivery

Benefits:
- Early & frequent feedback
- Lower risk (incremental)
- Adapt to changing needs
- Working software from day 1
- Customer involvement throughout
*/

// Agile Project Example
public class AgileProject {

  // Sprint 1: Minimum Viable Product (MVP)
  public void sprint1_MVP() {
    // Core feature only
    UserAuthentication auth = new UserAuthentication();
    auth.login();
    auth.register();
    // DEPLOY TO PRODUCTION
    // Gather real user feedback
  }

  // Sprint 2: Enhanced based on feedback
  public void sprint2_Enhancement() {
    // Add features based on Sprint 1 feedback
    auth.passwordReset();
    auth.emailVerification();
    // DEPLOY TO PRODUCTION
  }

  // Sprint 3: Additional features
  public void sprint3_Additional() {
    // Continue building based on feedback
    auth.twoFactorAuthentication();
    auth.socialLogin();
    // DEPLOY TO PRODUCTION
  }
}

// Key Differences
/*
┌────────────────┬─────────────────┬──────────────────┐
│   Aspect       │   Waterfall     │      Agile       │
├────────────────┼─────────────────┼──────────────────┤
│ Requirements   │ Fixed upfront   │ Evolve over time │
│ Delivery       │ One big release │ Frequent releases│
│ Changes        │ Expensive       │ Welcome          │
│ Testing        │ At the end      │ Continuous       │
│ Customer       │ At beginning    │ Throughout       │
│   Involvement  │ and end         │                  │
│ Risk           │ High            │ Low              │
│ Adaptability   │ Low             │ High             │
└────────────────┴─────────────────┴──────────────────┘
*/`
        }
      ]
    },

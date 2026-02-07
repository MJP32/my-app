/**
 * AWS - Amazon Web Services
 * Comprehensive cloud platform with 200+ services
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const AWS_COLORS = {
  primary: '#FF9900',           // AWS Orange
  primaryHover: '#FFB84D',      // Lighter orange hover
  bg: 'rgba(255, 153, 0, 0.1)', // Background with transparency
  border: 'rgba(255, 153, 0, 0.3)', // Border color
  arrow: '#FF9900',             // Arrow/indicator color
  hoverBg: 'rgba(255, 153, 0, 0.2)', // Hover background
  topicBg: 'rgba(255, 153, 0, 0.2)'  // Topic card background
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

const VPCArchitectureDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="vpc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      VPC Architecture with Public & Private Subnets
    `}</text>

    {/* VPC Container */}
    <rect x="50" y="50" width="700" height="210" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="60" y="70" fill="#22c55e" fontSize="11" fontWeight="bold">VPC (10.0.0.0/16)</text>

    {/* Public Subnet */}
    <rect x="70" y="90" width="300" height="150" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="110" fill="#3b82f6" fontSize="10" fontWeight="bold">Public Subnet (10.0.1.0/24)</text>

    {/* NAT Gateway */}
    <rect x="90" y="125" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NAT Gateway</text>

    {/* Internet Gateway */}
    <rect x="220" y="125" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="270" y="143" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Internet</text>
    <text x="270" y="157" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Gateway</text>

    {/* Private Subnet */}
    <rect x="430" y="90" width="300" height="150" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="440" y="110" fill="#8b5cf6" fontSize="10" fontWeight="bold">Private Subnet (10.0.2.0/24)</text>

    {/* EC2 in Private */}
    <rect x="460" y="125" width="80" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="500" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EC2</text>

    {/* RDS in Private */}
    <rect x="570" y="125" width="80" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="610" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">RDS</text>

    {/* Arrows */}
    <line x1="190" y1="145" x2="215" y2="145" stroke="#FF9900" strokeWidth="2" markerEnd="url(#vpc-arrow)"/>
    <line x1="320" y1="145" x2="350" y2="145" stroke="#FF9900" strokeWidth="2" markerEnd="url(#vpc-arrow)"/>
    <line x1="370" y1="145" x2="455" y2="145" stroke="#FF9900" strokeWidth="2" markerEnd="url(#vpc-arrow)"/>

    {/* Labels */}
    <text x="270" y="185" textAnchor="middle" fill="#60a5fa" fontSize="8">Public Access</text>
    <text x="580" y="185" textAnchor="middle" fill="#a78bfa" fontSize="8">Private Resources</text>
  </svg>
)

const LambdaFlowDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="lambda-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      AWS Lambda Event-Driven Architecture
    </text>

    {/* Event Source */}
    <rect x="50" y="80" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Event Source</text>
    <text x="110" y="115" textAnchor="middle" fill="white" fontSize="8">(S3, API Gateway,</text>
    <text x="110" y="125" textAnchor="middle" fill="white" fontSize="8">DynamoDB, etc.)</text>

    {/* Lambda Function */}
    <rect x="250" y="80" width="120" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="310" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Lambda</text>
    <text x="310" y="115" textAnchor="middle" fill="white" fontSize="9">Function</text>

    {/* Processing */}
    <rect x="450" y="80" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="510" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`Process &`}</text>
    <text x="510" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Execute</text>

    {/* Destination */}
    <rect x="650" y="80" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="710" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Destination</text>
    <text x="710" y="115" textAnchor="middle" fill="white" fontSize="8">(S3, DynamoDB,</text>
    <text x="710" y="125" textAnchor="middle" fill="white" fontSize="8">SNS, SQS)</text>

    {/* Arrows */}
    <line x1="170" y1="105" x2="245" y2="105" stroke="#FF9900" strokeWidth="2" markerEnd="url(#lambda-arrow)"/>
    <line x1="370" y1="105" x2="445" y2="105" stroke="#FF9900" strokeWidth="2" markerEnd="url(#lambda-arrow)"/>
    <line x1="570" y1="105" x2="645" y2="105" stroke="#FF9900" strokeWidth="2" markerEnd="url(#lambda-arrow)"/>

    {/* Labels */}
    <text x="207" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Trigger</text>
    <text x="407" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Execute</text>
    <text x="607" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Store/Notify</text>

    {/* Auto-scaling note */}
    <text x="310" y="160" textAnchor="middle" fill="#FF9900" fontSize="9" fontWeight="bold">
      Auto-scales based on requests
    </text>
  </svg>
)

const S3StorageDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="s3-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      S3 Storage Classes & Lifecycle
    `}</text>

    {/* S3 Standard */}
    <rect x="50" y="60" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3 Standard</text>
    <text x="120" y="95" textAnchor="middle" fill="white" fontSize="8">Frequently accessed</text>
    <text x="120" y="105" textAnchor="middle" fill="#4ade80" fontSize="8">$0.023/GB</text>

    {/* S3 Intelligent-Tiering */}
    <rect x="240" y="60" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S3 Intelligent-</text>
    <text x="310" y="87" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tiering</text>
    <text x="310" y="100" textAnchor="middle" fill="white" fontSize="8">Auto-optimization</text>

    {/* S3 Infrequent Access */}
    <rect x="430" y="60" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">S3 Standard-IA</text>
    <text x="500" y="90" textAnchor="middle" fill="white" fontSize="8">Infrequent access</text>
    <text x="500" y="100" textAnchor="middle" fill="#fbbf24" fontSize="8">$0.0125/GB</text>

    {/* S3 Glacier */}
    <rect x="620" y="60" width="140" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="690" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3 Glacier</text>
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="8">Long-term archive</text>
    <text x="690" y="105" textAnchor="middle" fill="#a78bfa" fontSize="8">$0.004/GB</text>

    {/* Lifecycle arrows */}
    <line x1="190" y1="85" x2="235" y2="85" stroke="#FF9900" strokeWidth="2" markerEnd="url(#s3-arrow)"/>
    <line x1="380" y1="85" x2="425" y2="85" stroke="#FF9900" strokeWidth="2" markerEnd="url(#s3-arrow)"/>
    <line x1="570" y1="85" x2="615" y2="85" stroke="#FF9900" strokeWidth="2" markerEnd="url(#s3-arrow)"/>

    {/* Lifecycle labels */}
    <text x="212" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">30 days</text>
    <text x="402" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">90 days</text>
    <text x="592" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">365 days</text>

    {/* Features */}
    <rect x="50" y="140" width="710" height="80" rx="8" fill="rgba(255, 153, 0, 0.1)" stroke="#FF9900" strokeWidth="1"/>
    <text x="60" y="160" fill="#FF9900" fontSize="10" fontWeight="bold">Key Features:</text>
    <text x="70" y="180" fill="#94a3b8" fontSize="9">• 99.999999999% (11 9's) durability</text>
    <text x="70" y="195" fill="#94a3b8" fontSize="9">{`• Versioning & MFA Delete`}</text>
    <text x="70" y="210" fill="#94a3b8" fontSize="9">• Cross-Region Replication</text>

    <text x="320" y="180" fill="#94a3b8" fontSize="9">• Server-side encryption</text>
    <text x="320" y="195" fill="#94a3b8" fontSize="9">• Lifecycle policies</text>
    <text x="320" y="210" fill="#94a3b8" fontSize="9">• Event notifications</text>

    <text x="570" y="180" fill="#94a3b8" fontSize="9">• Static website hosting</text>
    <text x="570" y="195" fill="#94a3b8" fontSize="9">• Pre-signed URLs</text>
    <text x="570" y="210" fill="#94a3b8" fontSize="9">• Access logs</text>
  </svg>
)

const EC2ArchitectureDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="ec2-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      EC2 with Auto Scaling & Load Balancing
    `}</text>

    {/* Load Balancer */}
    <rect x="50" y="80" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Elastic Load</text>
    <text x="110" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Balancer</text>

    {/* Auto Scaling Group Container */}
    <rect x="220" y="50" width="450" height="140" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="230" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">Auto Scaling Group</text>

    {/* EC2 Instance 1 */}
    <rect x="250" y="90" width="100" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="300" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EC2</text>
    <text x="300" y="125" textAnchor="middle" fill="white" fontSize="8">Instance 1</text>

    {/* EC2 Instance 2 */}
    <rect x="380" y="90" width="100" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="430" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EC2</text>
    <text x="430" y="125" textAnchor="middle" fill="white" fontSize="8">Instance 2</text>

    {/* EC2 Instance 3 */}
    <rect x="510" y="90" width="100" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="560" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EC2</text>
    <text x="560" y="125" textAnchor="middle" fill="white" fontSize="8">Instance 3</text>

    {/* Arrows from ELB */}
    <line x1="170" y1="105" x2="245" y2="105" stroke="#FF9900" strokeWidth="2" markerEnd="url(#ec2-arrow)"/>
    <line x1="170" y1="110" x2="375" y2="115" stroke="#FF9900" strokeWidth="2" markerEnd="url(#ec2-arrow)"/>
    <line x1="170" y1="115" x2="505" y2="115" stroke="#FF9900" strokeWidth="2" markerEnd="url(#ec2-arrow)"/>

    {/* CloudWatch */}
    <rect x="700" y="80" width="80" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="740" y="100" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cloud-</text>
    <text x="740" y="113" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Watch</text>

    {/* Monitoring arrow */}
    <line x1="610" y1="105" x2="695" y2="105" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3,3"/>
    <text x="652" y="95" textAnchor="middle" fill="#8b5cf6" fontSize="8">monitor</text>

    {/* Scale indicator */}
    <text x="440" y="175" textAnchor="middle" fill="#22c55e" fontSize="9">Scales based on CPU, memory, or custom metrics</text>
  </svg>
)

const RDSArchitectureDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="rds-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      RDS Multi-AZ Deployment with Read Replicas
    </text>

    {/* Primary DB */}
    <rect x="100" y="70" width="150" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="175" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Primary RDS</text>
    <text x="175" y="110" textAnchor="middle" fill="white" fontSize="9">Availability Zone A</text>

    {/* Standby DB */}
    <rect x="100" y="160" width="150" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="175" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Standby RDS</text>
    <text x="175" y="200" textAnchor="middle" fill="white" fontSize="9">Availability Zone B</text>

    {/* Sync Replication */}
    <line x1="175" y1="130" x2="175" y2="155" stroke="#FF9900" strokeWidth="2" strokeDasharray="3,3"/>
    <text x="185" y="145" fill="#FF9900" fontSize="8" fontWeight="bold">Sync</text>

    {/* Read Replica 1 */}
    <rect x="350" y="70" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="420" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Read Replica 1</text>
    <text x="420" y="110" textAnchor="middle" fill="white" fontSize="9">us-east-1</text>

    {/* Read Replica 2 */}
    <rect x="350" y="160" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="420" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Read Replica 2</text>
    <text x="420" y="200" textAnchor="middle" fill="white" fontSize="9">eu-west-1</text>

    {/* Async Replication to replicas */}
    <line x1="250" y1="90" x2="345" y2="90" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#rds-arrow)"/>
    <line x1="250" y1="110" x2="300" y2="150" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3"/>
    <line x1="300" y1="150" x2="345" y2="180" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#rds-arrow)"/>

    {/* Application */}
    <rect x="550" y="90" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="610" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Application</text>
    <text x="610" y="125" textAnchor="middle" fill="white" fontSize="8">(EC2/Lambda)</text>

    {/* Arrows */}
    <line x1="545" y1="115" x2="495" y2="100" stroke="#FF9900" strokeWidth="2"/>
    <text x="520" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">read</text>
    <line x1="545" y1="115" x2="255" y2="100" stroke="#FF9900" strokeWidth="2" markerEnd="url(#rds-arrow)"/>
    <text x="400" y="55" textAnchor="middle" fill="#94a3b8" fontSize="8">write</text>

    <text x="300" y="100" textAnchor="middle" fill="#22c55e" fontSize="8">Async</text>
  </svg>
)

const MessagingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="msg-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      SNS Fan-Out to SQS Queues
    </text>

    {/* Publisher */}
    <rect x="50" y="80" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Publisher</text>
    <text x="100" y="115" textAnchor="middle" fill="white" fontSize="8">(EC2/Lambda)</text>

    {/* SNS Topic */}
    <rect x="220" y="80" width="120" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="280" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SNS Topic</text>
    <text x="280" y="115" textAnchor="middle" fill="white" fontSize="9">Fan-out</text>

    {/* SQS Queue 1 */}
    <rect x="450" y="50" width="100" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="500" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SQS Queue 1</text>
    <text x="500" y="82" textAnchor="middle" fill="white" fontSize="7">Email Service</text>

    {/* SQS Queue 2 */}
    <rect x="450" y="105" width="100" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="500" y="125" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SQS Queue 2</text>
    <text x="500" y="137" textAnchor="middle" fill="white" fontSize="7">SMS Service</text>

    {/* SQS Queue 3 */}
    <rect x="450" y="160" width="100" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="500" y="180" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SQS Queue 3</text>
    <text x="500" y="192" textAnchor="middle" fill="white" fontSize="7">Analytics</text>

    {/* Consumers */}
    <rect x="630" y="80" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="680" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Consumers</text>
    <text x="680" y="115" textAnchor="middle" fill="white" fontSize="8">(Workers)</text>

    {/* Arrows */}
    <line x1="150" y1="105" x2="215" y2="105" stroke="#FF9900" strokeWidth="2" markerEnd="url(#msg-arrow)"/>
    <line x1="340" y1="90" x2="445" y2="70" stroke="#FF9900" strokeWidth="2" markerEnd="url(#msg-arrow)"/>
    <line x1="340" y1="105" x2="445" y2="125" stroke="#FF9900" strokeWidth="2" markerEnd="url(#msg-arrow)"/>
    <line x1="340" y1="115" x2="445" y2="180" stroke="#FF9900" strokeWidth="2" markerEnd="url(#msg-arrow)"/>
    <line x1="550" y1="105" x2="625" y2="105" stroke="#FF9900" strokeWidth="2" markerEnd="url(#msg-arrow)"/>

    {/* Labels */}
    <text x="182" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">publish</text>
    <text x="587" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">poll</text>
  </svg>
)

const ContainersDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="container-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#FF9900" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ECS/EKS Container Orchestration
    </text>

    {/* Control Plane */}
    <rect x="50" y="60" width="200" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="150" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Control Plane</text>
    <text x="150" y="100" textAnchor="middle" fill="white" fontSize="9">(ECS/EKS Managed)</text>

    {/* Cluster Container */}
    <rect x="300" y="50" width="450" height="150" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="310" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">Container Cluster</text>

    {/* Task/Pod 1 */}
    <rect x="320" y="85" width="120" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="380" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Task/Pod 1</text>
    <text x="380" y="120" textAnchor="middle" fill="white" fontSize="8">Container(s)</text>

    {/* Task/Pod 2 */}
    <rect x="460" y="85" width="120" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="520" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Task/Pod 2</text>
    <text x="520" y="120" textAnchor="middle" fill="white" fontSize="8">Container(s)</text>

    {/* Task/Pod 3 */}
    <rect x="600" y="85" width="120" height="50" rx="8" fill="#FF9900" stroke="#FFB84D" strokeWidth="2"/>
    <text x="660" y="105" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Task/Pod 3</text>
    <text x="660" y="120" textAnchor="middle" fill="white" fontSize="8">Container(s)</text>

    {/* ECR */}
    <rect x="320" y="155" width="130" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="385" y="178" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ECR (Image Registry)</text>

    {/* Fargate/EC2 */}
    <rect x="470" y="155" width="130" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="535" y="178" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Fargate / EC2</text>

    {/* Arrows */}
    <line x1="250" y1="90" x2="315" y2="100" stroke="#FF9900" strokeWidth="2" markerEnd="url(#container-arrow)"/>
    <text x="280" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">schedule</text>

    <line x1="385" y1="150" x2="385" y2="135" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3,3"/>
    <text x="395" y="145" fill="#8b5cf6" fontSize="7">pull images</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function AWS({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'compute',
      name: 'Compute Services',
      icon: '🖥️',
      color: '#FF9900',
      description: 'Virtual servers, serverless functions, and container orchestration for running applications.',
      diagram: EC2ArchitectureDiagram,
      details: [
        {
          name: 'EC2 (Elastic Compute Cloud)',
          diagram: EC2ArchitectureDiagram,
          explanation: 'Amazon EC2 provides secure, resizable compute capacity in the cloud. Launch virtual machines with Linux or Windows, scale up or down automatically with Auto Scaling Groups, and pay only for what you use. Choose from 500+ instance types optimized for compute, memory, storage, or GPU workloads. Integrates with Elastic Load Balancing for high availability.',
          codeExample: `# Launch EC2 instance with AWS CLI
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t3.micro \\
  --key-name MyKeyPair \\
  --security-group-ids sg-0123456789abcdef0 \\
  --subnet-id subnet-0bb1c79de3EXAMPLE \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyInstance}]'

# Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name my-asg \\
  --launch-configuration-name my-launch-config \\
  --min-size 1 \\
  --max-size 5 \\
  --desired-capacity 2 \\
  --availability-zones us-east-1a us-east-1b`
        },
        {
          name: 'Lambda (Serverless Functions)',
          diagram: LambdaFlowDiagram,
          explanation: 'AWS Lambda lets you run code without provisioning or managing servers. Automatically scales from a few requests per day to thousands per second. Supports Node.js, Python, Java, Go, Ruby, .NET, and custom runtimes. Pay only for compute time consumed (GB-seconds). Integrates with 200+ AWS services as event sources including S3, DynamoDB, API Gateway, and more.',
          codeExample: `// Node.js Lambda function example
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Process S3 event
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\\+/g, ' '));

  console.log(\`Processing file: \${bucket}/\${key}\`);

  // Your business logic here
  const result = await processFile(bucket, key);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success', result })
  };
};`
        },
        {
          name: 'ECS & EKS (Containers)',
          diagram: ContainersDiagram,
          explanation: 'Amazon ECS (Elastic Container Service) is a fully managed container orchestration service for Docker containers. Choose EC2 launch type for control or Fargate for serverless. Amazon EKS (Elastic Kubernetes Service) runs the Kubernetes control plane across multiple availability zones. Both integrate with ECR (Elastic Container Registry) for container images, ELB for load balancing, and CloudWatch for monitoring.',
          codeExample: `# ECS Task Definition (JSON)
{
  "family": "my-app",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest",
      "cpu": 256,
      "memory": 512,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "environment": [
        { "name": "ENV", "value": "production" }
      ]
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "256",
  "memory": "512"
}`
        }
      ]
    },
    {
      id: 'storage',
      name: 'Storage Services',
      icon: '📦',
      color: '#3b82f6',
      description: 'Object storage, block storage, and file systems for storing and retrieving data at any scale.',
      diagram: S3StorageDiagram,
      details: [
        {
          name: 'S3 (Simple Storage Service)',
          diagram: S3StorageDiagram,
          explanation: 'Amazon S3 offers 99.999999999% (11 9s) durability and stores data for millions of applications. Store unlimited data with automatic encryption, versioning, and lifecycle management. Multiple storage classes: S3 Standard for frequent access ($0.023/GB), S3 Intelligent-Tiering for auto-optimization, S3 Standard-IA for infrequent access ($0.0125/GB), and S3 Glacier for long-term archive ($0.004/GB). Integrates with Lambda for event-driven processing.',
          codeExample: `// Upload file to S3 with AWS SDK (JavaScript)
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');

// Upload object
const uploadParams = {
  Bucket: 'my-bucket',
  Key: 'uploads/document.pdf',
  Body: fs.createReadStream('document.pdf'),
  ServerSideEncryption: 'AES256',
  Metadata: {
    'uploaded-by': 'user123',
    'upload-date': new Date().toISOString()
  }
};

s3.upload(uploadParams, (err, data) => {
  if (err) console.error('Error:', err);
  else console.log('Uploaded:', data.Location);
});

// Set lifecycle policy
const lifecycleParams = {
  Bucket: 'my-bucket',
  LifecycleConfiguration: {
    Rules: [{
      Id: 'Archive old files',
      Status: 'Enabled',
      Transitions: [
        { Days: 30, StorageClass: 'STANDARD_IA' },
        { Days: 90, StorageClass: 'GLACIER' }
      ]
    }]
  }
};

s3.putBucketLifecycleConfiguration(lifecycleParams).promise();`
        },
        {
          name: 'EBS (Elastic Block Store)',
          explanation: 'Amazon EBS provides persistent block storage volumes for use with EC2 instances. Choose from SSD-backed volumes (gp3, io2) for transactional workloads or HDD-backed volumes (st1, sc1) for throughput-intensive workloads. Create point-in-time snapshots stored in S3. Volumes automatically replicate within their availability zone. Supports encryption at rest and in transit.',
          codeExample: `# Create EBS volume
aws ec2 create-volume \\
  --availability-zone us-east-1a \\
  --size 100 \\
  --volume-type gp3 \\
  --iops 3000 \\
  --throughput 125 \\
  --encrypted \\
  --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=MyVolume}]'

# Attach volume to EC2 instance
aws ec2 attach-volume \\
  --volume-id vol-0123456789abcdef0 \\
  --instance-id i-0123456789abcdef0 \\
  --device /dev/sdf

# Create snapshot
aws ec2 create-snapshot \\
  --volume-id vol-0123456789abcdef0 \\
  --description "Backup on $(date +%Y-%m-%d)"`
        },
        {
          name: 'EFS (Elastic File System)',
          explanation: 'Amazon EFS provides a scalable, elastic file system for use with AWS Cloud services and on-premises resources. Automatically grows and shrinks as you add and remove files. Supports NFSv4 protocol. Provides multiple storage classes: Standard for frequently accessed files and Infrequent Access (IA) for cost savings. Supports encryption at rest and in transit. Can be mounted to multiple EC2 instances simultaneously across multiple availability zones.',
          codeExample: `# Create EFS file system
aws efs create-file-system \\
  --performance-mode generalPurpose \\
  --throughput-mode bursting \\
  --encrypted \\
  --tags Key=Name,Value=MyFileSystem

# Create mount target
aws efs create-mount-target \\
  --file-system-id fs-0123456789abcdef0 \\
  --subnet-id subnet-0bb1c79de3EXAMPLE \\
  --security-groups sg-0123456789abcdef0

# Mount on EC2 instance (Linux)
sudo mkdir /mnt/efs
sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 \\
  fs-0123456789abcdef0.efs.us-east-1.amazonaws.com:/ /mnt/efs`
        }
      ]
    },
    {
      id: 'database',
      name: 'Database Services',
      icon: '🗄️',
      color: '#22c55e',
      description: 'Managed relational, NoSQL, in-memory, and graph databases for all application needs.',
      diagram: RDSArchitectureDiagram,
      details: [
        {
          name: 'RDS (Relational Database)',
          diagram: RDSArchitectureDiagram,
          explanation: 'Amazon RDS makes it easy to set up, operate, and scale relational databases. Supports MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server. Automated backups, software patching, monitoring, and hardware provisioning. Multi-AZ deployments provide high availability with synchronous replication and automatic failover. Create read replicas for read-heavy workloads with asynchronous replication. Supports encryption at rest and in transit.',
          codeExample: `# Create RDS MySQL instance with Multi-AZ
aws rds create-db-instance \\
  --db-instance-identifier mydb \\
  --db-instance-class db.t3.medium \\
  --engine mysql \\
  --engine-version 8.0.35 \\
  --master-username admin \\
  --master-user-password MyPassword123! \\
  --allocated-storage 100 \\
  --storage-type gp3 \\
  --multi-az \\
  --vpc-security-group-ids sg-0123456789abcdef0 \\
  --db-subnet-group-name my-db-subnet-group \\
  --backup-retention-period 7 \\
  --storage-encrypted

# Create read replica
aws rds create-db-instance-read-replica \\
  --db-instance-identifier mydb-replica \\
  --source-db-instance-identifier mydb \\
  --db-instance-class db.t3.medium`
        },
        {
          name: 'DynamoDB (NoSQL)',
          explanation: 'Amazon DynamoDB is a fully managed NoSQL database with single-digit millisecond performance at any scale. Key-value and document data models. Built-in security, backup and restore, and in-memory caching with DAX. Serverless with automatic scaling based on traffic. Global tables enable multi-region, multi-active replication. DynamoDB Streams capture changes for event-driven architectures. Pay per request or provisioned capacity.',
          codeExample: `// DynamoDB operations with AWS SDK (JavaScript)
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Put item
await dynamodb.put({
  TableName: 'Users',
  Item: {
    userId: 'user123',
    email: 'user@example.com',
    name: 'John Doe',
    createdAt: new Date().toISOString(),
    score: 1500
  }
}).promise();

// Query with secondary index
const result = await dynamodb.query({
  TableName: 'Users',
  IndexName: 'ScoreIndex',
  KeyConditionExpression: 'score > :minScore',
  ExpressionAttributeValues: {
    ':minScore': 1000
  },
  ScanIndexForward: false,  // descending order
  Limit: 10
}).promise();

// Update with conditional expression
await dynamodb.update({
  TableName: 'Users',
  Key: { userId: 'user123' },
  UpdateExpression: 'SET score = score + :increment',
  ConditionExpression: 'attribute_exists(userId)',
  ExpressionAttributeValues: { ':increment': 10 }
}).promise();`
        },
        {
          name: 'Aurora (Cloud-Native DB)',
          explanation: 'Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud. Up to 5x performance of MySQL and 3x performance of PostgreSQL. Auto-scaling storage up to 128TB in 10GB increments. Up to 15 read replicas with sub-10ms replication lag. Aurora Serverless v2 provides instant, fine-grained scaling. Global Database enables cross-region replication with sub-second latency. Automated backups, snapshots, and point-in-time recovery.',
          codeExample: `# Create Aurora Serverless v2 cluster
aws rds create-db-cluster \\
  --db-cluster-identifier aurora-serverless-cluster \\
  --engine aurora-postgresql \\
  --engine-version 15.2 \\
  --master-username postgres \\
  --master-user-password MyPassword123! \\
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=16 \\
  --vpc-security-group-ids sg-0123456789abcdef0 \\
  --db-subnet-group-name my-db-subnet-group \\
  --storage-encrypted

# Create instance in cluster
aws rds create-db-instance \\
  --db-instance-identifier aurora-instance-1 \\
  --db-cluster-identifier aurora-serverless-cluster \\
  --db-instance-class db.serverless \\
  --engine aurora-postgresql`
        },
        {
          name: 'ElastiCache (In-Memory)',
          explanation: 'Amazon ElastiCache offers fully managed Redis and Memcached for microsecond latency and high throughput. Redis supports data structures (strings, hashes, lists, sets, sorted sets), pub/sub, Lua scripting, and transactions. Automatic failover with Multi-AZ. Backup and restore for Redis. Cross-region replication with Global Datastore. Memcached for simple caching use cases with multi-threading. Common use cases include session management, database caching, and real-time leaderboards.',
          codeExample: `# Create Redis cluster with replication
aws elasticache create-replication-group \\
  --replication-group-id my-redis-cluster \\
  --replication-group-description "Redis cluster for caching" \\
  --engine redis \\
  --engine-version 7.0 \\
  --cache-node-type cache.r6g.large \\
  --num-cache-clusters 3 \\
  --automatic-failover-enabled \\
  --multi-az-enabled \\
  --cache-subnet-group-name my-cache-subnet \\
  --security-group-ids sg-0123456789abcdef0 \\
  --at-rest-encryption-enabled \\
  --transit-encryption-enabled

# Connect with Redis client (Python)
import redis

r = redis.Redis(
  host='my-redis-cluster.abc123.ng.0001.use1.cache.amazonaws.com',
  port=6379,
  ssl=True,
  decode_responses=True
)

# Set with expiration
r.setex('session:user123', 3600, 'session-data')

# Get value
value = r.get('session:user123')`
        }
      ]
    },
    {
      id: 'networking',
      name: 'Networking & Content Delivery',
      icon: '🌐',
      color: '#8b5cf6',
      description: 'Virtual private clouds, load balancing, CDN, and DNS services for global infrastructure.',
      diagram: VPCArchitectureDiagram,
      details: [
        {
          name: 'VPC (Virtual Private Cloud)',
          diagram: VPCArchitectureDiagram,
          explanation: 'Amazon VPC lets you provision a logically isolated section of AWS Cloud. Define your own IP address range (CIDR blocks), create subnets across availability zones, configure route tables, and network gateways. Public subnets have internet access via Internet Gateway. Private subnets access internet via NAT Gateway. Security groups provide instance-level firewalls. Network ACLs provide subnet-level firewalls. Connect to on-premises networks via VPN or Direct Connect.',
          codeExample: `# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create public subnet
aws ec2 create-subnet \\
  --vpc-id vpc-0123456789abcdef0 \\
  --cidr-block 10.0.1.0/24 \\
  --availability-zone us-east-1a

# Create private subnet
aws ec2 create-subnet \\
  --vpc-id vpc-0123456789abcdef0 \\
  --cidr-block 10.0.2.0/24 \\
  --availability-zone us-east-1b

# Create Internet Gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway \\
  --vpc-id vpc-0123456789abcdef0 \\
  --internet-gateway-id igw-0123456789abcdef0

# Create NAT Gateway
aws ec2 create-nat-gateway \\
  --subnet-id subnet-0bb1c79de3EXAMPLE \\
  --allocation-id eipalloc-0123456789abcdef0`
        },
        {
          name: 'ELB (Elastic Load Balancing)',
          explanation: 'Elastic Load Balancing automatically distributes incoming traffic across multiple targets. Application Load Balancer (ALB) for HTTP/HTTPS with path-based routing and host-based routing. Network Load Balancer (NLB) for TCP/UDP with ultra-low latency. Gateway Load Balancer (GWLB) for third-party virtual appliances. Classic Load Balancer for EC2-Classic. Health checks ensure traffic only goes to healthy targets. Integrates with Auto Scaling, ECS, EKS, and Lambda.',
          codeExample: `# Create Application Load Balancer
aws elbv2 create-load-balancer \\
  --name my-alb \\
  --subnets subnet-0bb1c79de3EXAMPLE subnet-0bb1c79de3EXAMPLE2 \\
  --security-groups sg-0123456789abcdef0 \\
  --scheme internet-facing \\
  --type application \\
  --ip-address-type ipv4

# Create target group
aws elbv2 create-target-group \\
  --name my-targets \\
  --protocol HTTP \\
  --port 80 \\
  --vpc-id vpc-0123456789abcdef0 \\
  --health-check-path /health \\
  --health-check-interval-seconds 30

# Create listener with path-based routing
aws elbv2 create-listener \\
  --load-balancer-arn arn:aws:elasticloadbalancing:... \\
  --protocol HTTP \\
  --port 80 \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...`
        },
        {
          name: 'CloudFront (CDN)',
          explanation: 'Amazon CloudFront is a content delivery network (CDN) with 450+ edge locations worldwide. Delivers data, videos, applications, and APIs with low latency. Integrates with S3, EC2, ELB, and custom origins. Supports HTTPS with SNI and dedicated IP. Origin Shield provides additional caching layer. Lambda@Edge runs code at edge locations. Field-level encryption for sensitive data. Real-time metrics and logging. Protects against DDoS attacks with AWS Shield.',
          codeExample: `# Create CloudFront distribution for S3 bucket
aws cloudfront create-distribution --distribution-config '{
  "CallerReference": "unique-string",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3-my-bucket",
      "DomainName": "my-bucket.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": "origin-access-identity/cloudfront/E123ABC"
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-my-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "Compress": true,
    "MinTTL": 0,
    "DefaultTTL": 86400
  },
  "Enabled": true,
  "Comment": "CDN for static assets"
}'`
        },
        {
          name: 'Route 53 (DNS)',
          explanation: 'Amazon Route 53 is a scalable DNS and domain registration service. Supports all DNS record types (A, AAAA, CNAME, MX, TXT, etc.). Routing policies: Simple, Weighted, Latency-based, Failover, Geolocation, Geoproximity, and Multi-value. Health checks monitor endpoint availability. Traffic flow provides visual editor for complex routing. DNSSEC for domain security. Integrates with CloudFront, ELB, S3, and other AWS services. 100% SLA for DNS queries.',
          codeExample: `# Create hosted zone
aws route53 create-hosted-zone \\
  --name example.com \\
  --caller-reference $(date +%s)

# Create A record with failover routing
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z123ABC \\
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.example.com",
        "Type": "A",
        "SetIdentifier": "Primary",
        "Failover": "PRIMARY",
        "TTL": 60,
        "ResourceRecords": [{"Value": "192.0.2.1"}],
        "HealthCheckId": "abc123-health-check"
      }
    }]
  }'

# Create health check
aws route53 create-health-check --health-check-config '{
  "Type": "HTTPS",
  "ResourcePath": "/health",
  "FullyQualifiedDomainName": "www.example.com",
  "Port": 443,
  "RequestInterval": 30,
  "FailureThreshold": 3
}'`
        }
      ]
    },
    {
      id: 'messaging',
      name: 'Messaging & Integration',
      icon: '📨',
      color: '#f59e0b',
      description: 'Message queues, pub/sub messaging, and application integration services.',
      diagram: MessagingDiagram,
      details: [
        {
          name: 'SNS (Simple Notification Service)',
          diagram: MessagingDiagram,
          explanation: 'Amazon SNS enables application-to-application (A2A) and application-to-person (A2P) messaging. Pub/sub pattern with topics and subscriptions. Fan-out messages to multiple subscribers including SQS queues, Lambda functions, HTTP endpoints, email, SMS, and mobile push notifications. Message filtering with subscription filter policies. Message attributes for metadata. FIFO topics for ordering and deduplication. Delivery retries and dead-letter queues. Supports up to 12.5M subscriptions per topic.',
          codeExample: `// Publish to SNS topic with AWS SDK (Node.js)
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

// Publish message
await sns.publish({
  TopicArn: 'arn:aws:sns:us-east-1:123456789:MyTopic',
  Message: JSON.stringify({
    orderId: 'order-123',
    amount: 99.99,
    status: 'completed'
  }),
  Subject: 'Order Completed',
  MessageAttributes: {
    orderType: {
      DataType: 'String',
      StringValue: 'premium'
    },
    priority: {
      DataType: 'Number',
      StringValue: '1'
    }
  }
}).promise();

// Subscribe SQS queue to SNS topic
await sns.subscribe({
  Protocol: 'sqs',
  TopicArn: 'arn:aws:sns:us-east-1:123456789:MyTopic',
  Endpoint: 'arn:aws:sqs:us-east-1:123456789:MyQueue',
  Attributes: {
    FilterPolicy: JSON.stringify({
      orderType: ['premium', 'enterprise']
    })
  }
}).promise();`
        },
        {
          name: 'SQS (Simple Queue Service)',
          explanation: 'Amazon SQS offers fully managed message queuing for decoupling microservices. Standard queues provide at-least-once delivery with best-effort ordering and unlimited throughput. FIFO queues ensure exactly-once processing with strict ordering (300 TPS with batching, 3000 with high throughput). Long polling reduces empty receives and costs. Dead-letter queues for failed messages. Message retention up to 14 days. Visibility timeout prevents duplicate processing. Message size up to 256KB.',
          codeExample: `// Send and receive SQS messages (Node.js)
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/123456789/MyQueue';

// Send message
await sqs.sendMessage({
  QueueUrl: queueUrl,
  MessageBody: JSON.stringify({ task: 'process-order', orderId: 'order-123' }),
  MessageAttributes: {
    Priority: {
      DataType: 'Number',
      StringValue: '1'
    }
  },
  DelaySeconds: 0
}).promise();

// Receive messages (long polling)
const result = await sqs.receiveMessage({
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 10,
  WaitTimeSeconds: 20,  // long polling
  VisibilityTimeout: 30,
  MessageAttributeNames: ['All']
}).promise();

// Process and delete message
for (const message of result.Messages || []) {
  await processMessage(message);
  await sqs.deleteMessage({
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle
  }).promise();
}`
        },
        {
          name: 'EventBridge (Event Bus)',
          explanation: 'Amazon EventBridge is a serverless event bus for building event-driven applications. Routes events from AWS services, SaaS applications, and custom applications to targets like Lambda, Step Functions, SNS, SQS, and more. Event patterns filter events based on content. Schema registry discovers and stores event schemas. Archive and replay events for debugging and recovery. Supports cross-account and cross-region event routing. 20+ AWS service integrations as event sources.',
          codeExample: `// Put custom events to EventBridge
const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();

await eventbridge.putEvents({
  Entries: [{
    Source: 'com.myapp.orders',
    DetailType: 'Order Placed',
    Detail: JSON.stringify({
      orderId: 'order-123',
      customerId: 'customer-456',
      amount: 149.99,
      items: ['item-1', 'item-2']
    }),
    EventBusName: 'default',
    Time: new Date()
  }]
}).promise();

// Create rule with event pattern (CLI)
aws events put-rule \\
  --name OrderProcessingRule \\
  --event-pattern '{
    "source": ["com.myapp.orders"],
    "detail-type": ["Order Placed"],
    "detail": {
      "amount": [{"numeric": [">=", 100]}]
    }
  }'

// Add Lambda target to rule
aws events put-targets \\
  --rule OrderProcessingRule \\
  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:123456789:function:ProcessOrder"`
        },
        {
          name: 'Step Functions (Workflows)',
          explanation: 'AWS Step Functions coordinates multiple AWS services into serverless workflows. Visual workflow designer with state machines defined in JSON (Amazon States Language). Standard workflows for long-running processes (up to 1 year), Express workflows for high-volume short duration (up to 5 minutes). Built-in error handling, retry logic, and parallel execution. Integrates with 220+ AWS services including Lambda, ECS, SNS, SQS, DynamoDB, and more. Pay per state transition.',
          codeExample: `// Step Functions state machine definition
{
  "Comment": "Order Processing Workflow",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:ValidateOrder",
      "Next": "CheckInventory",
      "Catch": [{
        "ErrorEquals": ["ValidationError"],
        "Next": "OrderFailed"
      }]
    },
    "CheckInventory": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:CheckInventory",
      "Next": "ProcessPayment"
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:ProcessPayment",
      "Retry": [{
        "ErrorEquals": ["PaymentTimeout"],
        "IntervalSeconds": 2,
        "MaxAttempts": 3,
        "BackoffRate": 2
      }],
      "Next": "FulfillOrder"
    },
    "FulfillOrder": {
      "Type": "Parallel",
      "Branches": [
        {
          "StartAt": "ShipOrder",
          "States": {
            "ShipOrder": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:us-east-1:123456789:function:ShipOrder",
              "End": true
            }
          }
        },
        {
          "StartAt": "SendConfirmation",
          "States": {
            "SendConfirmation": {
              "Type": "Task",
              "Resource": "arn:aws:sns:us-east-1:123456789:OrderConfirmation",
              "End": true
            }
          }
        }
      ],
      "Next": "OrderComplete"
    },
    "OrderComplete": {
      "Type": "Succeed"
    },
    "OrderFailed": {
      "Type": "Fail",
      "Error": "OrderProcessingFailed"
    }
  }
}`
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Observability',
      icon: '📊',
      color: '#ec4899',
      description: 'Monitoring, logging, tracing, and alerting services for operational visibility.',
      details: [
        {
          name: 'CloudWatch (Monitoring)',
          explanation: 'Amazon CloudWatch collects and tracks metrics, monitors log files, sets alarms, and automatically reacts to changes. Get system-wide visibility with unified view of AWS resources, applications, and services. Custom metrics with PutMetricData API. Alarms trigger actions in SNS, Auto Scaling, EC2, or Lambda. Dashboards visualize metrics. Anomaly detection with machine learning. Contributor Insights analyzes log data. ServiceLens for distributed tracing with X-Ray integration.',
          codeExample: `// Put custom metrics to CloudWatch
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch();

await cloudwatch.putMetricData({
  Namespace: 'MyApp/Orders',
  MetricData: [{
    MetricName: 'OrdersProcessed',
    Value: 1,
    Unit: 'Count',
    Timestamp: new Date(),
    Dimensions: [
      { Name: 'Environment', Value: 'Production' },
      { Name: 'Region', Value: 'us-east-1' }
    ]
  }]
}).promise();

// Create alarm
await cloudwatch.putMetricAlarm({
  AlarmName: 'HighCPUUtilization',
  ComparisonOperator: 'GreaterThanThreshold',
  EvaluationPeriods: 2,
  MetricName: 'CPUUtilization',
  Namespace: 'AWS/EC2',
  Period: 300,
  Statistic: 'Average',
  Threshold: 80,
  ActionsEnabled: true,
  AlarmActions: ['arn:aws:sns:us-east-1:123456789:AlertTopic'],
  Dimensions: [{ Name: 'InstanceId', Value: 'i-0123456789abcdef0' }]
}).promise();

# Query CloudWatch Logs Insights (CLI)
aws logs start-query \\
  --log-group-name /aws/lambda/MyFunction \\
  --start-time $(date -d '1 hour ago' +%s) \\
  --end-time $(date +%s) \\
  --query-string 'fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 20'`
        },
        {
          name: 'X-Ray (Distributed Tracing)',
          explanation: 'AWS X-Ray helps analyze and debug distributed applications. Trace requests across microservices, Lambda, API Gateway, and more. Service map visualizes application architecture and identifies bottlenecks. Trace details show request flow, response times, and errors. Annotations and metadata add custom data. Sampling rules control trace collection. Integrates with CloudWatch ServiceLens. Supports Java, Node.js, Python, .NET, Go, and Ruby with SDKs.',
          codeExample: `// Instrument Lambda function with X-Ray (Node.js)
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

exports.handler = async (event) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('ProcessOrder');

  try {
    subsegment.addAnnotation('orderId', event.orderId);
    subsegment.addMetadata('orderDetails', event);

    // Call DynamoDB
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.get({
      TableName: 'Orders',
      Key: { orderId: event.orderId }
    }).promise();

    subsegment.close();
    return result.Item;
  } catch (error) {
    subsegment.addError(error);
    subsegment.close();
    throw error;
  }
};`
        },
        {
          name: 'CloudTrail (Audit Logs)',
          explanation: 'AWS CloudTrail records AWS API calls and delivers log files for auditing and compliance. Track user activity and API usage across AWS accounts. Events include management events (control plane operations) and data events (data plane operations like S3 object access). Insights detects unusual activity with machine learning. Log file integrity validation with digest files. Supports multi-region and organization-wide trails. Integrates with CloudWatch Logs and S3.',
          codeExample: `# Create CloudTrail trail
aws cloudtrail create-trail \\
  --name my-trail \\
  --s3-bucket-name my-cloudtrail-bucket \\
  --is-multi-region-trail \\
  --enable-log-file-validation \\
  --include-global-service-events

# Start logging
aws cloudtrail start-logging --name my-trail

# Configure event selectors for data events
aws cloudtrail put-event-selectors \\
  --trail-name my-trail \\
  --event-selectors '[{
    "ReadWriteType": "All",
    "IncludeManagementEvents": true,
    "DataResources": [{
      "Type": "AWS::S3::Object",
      "Values": ["arn:aws:s3:::my-bucket/*"]
    }]
  }]'

# Lookup recent events
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=CreateBucket \\
  --max-results 10`
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Identity',
      icon: '🔐',
      color: '#ef4444',
      description: 'Identity management, access control, encryption, and security monitoring services.',
      details: [
        {
          name: 'IAM (Identity & Access Management)',
          explanation: 'AWS IAM enables secure control over access to AWS resources. Create and manage users, groups, and roles with fine-grained permissions using JSON policies. Enable MFA (multi-factor authentication) for additional security. Temporary security credentials with STS (Security Token Service). Identity federation with SAML 2.0 and OIDC for SSO. Service-linked roles for AWS services. Permission boundaries limit maximum permissions. Access Analyzer identifies resources shared externally.',
          codeExample: `# Create IAM user
aws iam create-user --user-name developer

# Create IAM policy (S3 read-only)
aws iam create-policy --policy-name S3ReadOnly --policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:ListBucket"
    ],
    "Resource": [
      "arn:aws:s3:::my-bucket",
      "arn:aws:s3:::my-bucket/*"
    ]
  }]
}'

# Create IAM role for Lambda
aws iam create-role --role-name LambdaExecutionRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "lambda.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}'

# Attach policy to role
aws iam attach-role-policy \\
  --role-name LambdaExecutionRole \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole`
        },
        {
          name: 'Cognito (User Authentication)',
          explanation: 'Amazon Cognito provides authentication, authorization, and user management for web and mobile apps. User pools handle sign-up, sign-in, and account recovery with built-in UI. Identity pools provide temporary AWS credentials for accessing AWS services. Support for social identity providers (Google, Facebook, Amazon, Apple) and enterprise identity via SAML/OIDC. Advanced security features include adaptive authentication, compromised credentials checking, and MFA. Customizable email/SMS messages and Lambda triggers for workflows.',
          codeExample: `// Sign up user with Cognito (JavaScript)
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

// Sign up
await cognito.signUp({
  ClientId: 'your-app-client-id',
  Username: 'user@example.com',
  Password: 'SecurePassword123!',
  UserAttributes: [
    { Name: 'email', Value: 'user@example.com' },
    { Name: 'name', Value: 'John Doe' }
  ]
}).promise();

// Confirm sign up with code
await cognito.confirmSignUp({
  ClientId: 'your-app-client-id',
  Username: 'user@example.com',
  ConfirmationCode: '123456'
}).promise();

// Initiate auth
const authResult = await cognito.initiateAuth({
  AuthFlow: 'USER_PASSWORD_AUTH',
  ClientId: 'your-app-client-id',
  AuthParameters: {
    USERNAME: 'user@example.com',
    PASSWORD: 'SecurePassword123!'
  }
}).promise();

// Access token for API calls
const accessToken = authResult.AuthenticationResult.AccessToken;`
        },
        {
          name: 'KMS (Key Management Service)',
          explanation: 'AWS KMS creates and manages cryptographic keys for encrypting data. Customer master keys (CMKs) can be AWS managed or customer managed. Automatic key rotation for customer managed CMKs. Audit key usage with CloudTrail. Grant-based access control for temporary permissions. Multi-region keys for global applications. Integrates with 100+ AWS services for encryption at rest. Supports symmetric and asymmetric keys. Custom key stores with CloudHSM for dedicated hardware.',
          codeExample: `# Create KMS key
aws kms create-key \\
  --description "Application encryption key" \\
  --key-usage ENCRYPT_DECRYPT \\
  --origin AWS_KMS

# Create alias
aws kms create-alias \\
  --alias-name alias/my-app-key \\
  --target-key-id 1234abcd-12ab-34cd-56ef-1234567890ab

# Encrypt data
aws kms encrypt \\
  --key-id alias/my-app-key \\
  --plaintext "sensitive data" \\
  --output text \\
  --query CiphertextBlob

# Decrypt data
aws kms decrypt \\
  --ciphertext-blob fileb://encrypted.dat \\
  --output text \\
  --query Plaintext | base64 --decode

# Enable automatic key rotation
aws kms enable-key-rotation \\
  --key-id 1234abcd-12ab-34cd-56ef-1234567890ab`
        },
        {
          name: 'Secrets Manager',
          explanation: 'AWS Secrets Manager helps protect access to applications, services, and IT resources without upfront investment or ongoing maintenance costs. Rotate secrets automatically with Lambda rotation functions. Built-in rotation for RDS, Redshift, and DocumentDB. Fine-grained IAM policies control access. Audit secret usage with CloudTrail. Replicate secrets across multiple regions. Version secrets for rollback. Encrypt secrets at rest with KMS. Integrates with RDS, ECS, Lambda, and other services.',
          codeExample: `# Create secret
aws secretsmanager create-secret \\
  --name prod/database/credentials \\
  --description "Production database credentials" \\
  --secret-string '{
    "username": "admin",
    "password": "MySecurePassword123!",
    "host": "mydb.us-east-1.rds.amazonaws.com",
    "port": 5432,
    "database": "myapp"
  }'

# Retrieve secret (Node.js)
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager();

const result = await secretsmanager.getSecretValue({
  SecretId: 'prod/database/credentials'
}).promise();

const secret = JSON.parse(result.SecretString);
const connection = await createConnection({
  host: secret.host,
  user: secret.username,
  password: secret.password,
  database: secret.database
});

# Enable automatic rotation
aws secretsmanager rotate-secret \\
  --secret-id prod/database/credentials \\
  --rotation-lambda-arn arn:aws:lambda:us-east-1:123456789:function:RotateSecret \\
  --rotation-rules AutomaticallyAfterDays=30`
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Data',
      icon: '🔍',
      color: '#06b6d4',
      description: 'Real-time streaming, data lakes, and query services for big data analytics.',
      details: [
        {
          name: 'Kinesis (Streaming Data)',
          explanation: 'Amazon Kinesis makes it easy to collect, process, and analyze streaming data in real-time. Kinesis Data Streams for custom applications with shards for parallel processing. Kinesis Data Firehose for loading into S3, Redshift, Elasticsearch, and Splunk. Kinesis Data Analytics for SQL queries on streams. Kinesis Video Streams for video processing. Enhanced fan-out enables multiple consumers. Replay capability with 24-hour to 365-day retention. Automatic scaling with on-demand mode.',
          codeExample: `// Put records to Kinesis Data Stream
const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();

// Put single record
await kinesis.putRecord({
  StreamName: 'my-stream',
  PartitionKey: 'user-123',
  Data: JSON.stringify({
    userId: 'user-123',
    action: 'page_view',
    page: '/products',
    timestamp: new Date().toISOString()
  })
}).promise();

// Put batch of records
await kinesis.putRecords({
  StreamName: 'my-stream',
  Records: [
    {
      PartitionKey: 'user-123',
      Data: JSON.stringify({ event: 'click', target: 'button-1' })
    },
    {
      PartitionKey: 'user-456',
      Data: JSON.stringify({ event: 'scroll', position: 500 })
    }
  ]
}).promise();

// Consume with Lambda
exports.handler = async (event) => {
  for (const record of event.Records) {
    const payload = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString());
    await processEvent(payload);
  }
};`
        },
        {
          name: 'Athena (Serverless SQL)',
          explanation: 'Amazon Athena is an interactive query service that makes it easy to analyze data directly in S3 using standard SQL. No infrastructure to manage, pay only per query ($5 per TB scanned). Supports CSV, JSON, Parquet, ORC, and Avro formats. ANSI SQL with built-in functions. Partition projection reduces scan costs. Federated queries connect to relational, NoSQL, and custom data sources. Integrates with QuickSight for visualization. Query results stored in S3. ACID transactions with Apache Iceberg.',
          codeExample: `-- Create external table in Athena
CREATE EXTERNAL TABLE IF NOT EXISTS logs (
  timestamp STRING,
  user_id STRING,
  action STRING,
  ip_address STRING,
  user_agent STRING
)
PARTITIONED BY (year INT, month INT, day INT)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
WITH SERDEPROPERTIES ('field.delim' = ',')
LOCATION 's3://my-bucket/logs/';

-- Add partitions
MSCK REPAIR TABLE logs;

-- Query with partition pruning
SELECT action, COUNT(*) as count
FROM logs
WHERE year = 2024 AND month = 1 AND day = 25
GROUP BY action
ORDER BY count DESC
LIMIT 10;

-- Create view
CREATE VIEW active_users AS
SELECT user_id, COUNT(DISTINCT DATE(timestamp)) as active_days
FROM logs
WHERE timestamp > DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY user_id
HAVING active_days >= 5;`
        },
        {
          name: 'Glue (ETL Service)',
          explanation: 'AWS Glue is a serverless data integration service for ETL workloads. Glue Data Catalog is a central metadata repository with automatic schema discovery by crawlers. Glue ETL jobs transform data with Apache Spark or Python shell. Visual ETL designer for no-code transformations. Glue DataBrew for data cleaning with visual interface. Workflow orchestration with triggers and schedulers. Glue Streaming for real-time ETL from Kinesis or Kafka. Development endpoints for testing. Job bookmarks track processed data.',
          codeExample: `# Create Glue crawler
aws glue create-crawler \\
  --name my-s3-crawler \\
  --role AWSGlueServiceRole \\
  --database-name my_database \\
  --targets '{
    "S3Targets": [
      {"Path": "s3://my-bucket/data/"}
    ]
  }' \\
  --schedule "cron(0 1 * * ? *)"

# Glue ETL job script (PySpark)
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read from Glue Data Catalog
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="my_database",
    table_name="raw_data"
)

# Transform
transformed = ApplyMapping.apply(
    frame=datasource,
    mappings=[
        ("user_id", "string", "user_id", "string"),
        ("timestamp", "string", "event_time", "timestamp"),
        ("amount", "double", "amount", "decimal(10,2)")
    ]
)

# Write to S3 in Parquet format
glueContext.write_dynamic_frame.from_options(
    frame=transformed,
    connection_type="s3",
    connection_options={"path": "s3://my-bucket/processed/"},
    format="parquet"
)

job.commit()`
        },
        {
          name: 'EMR (Big Data Processing)',
          explanation: 'Amazon EMR is a cloud big data platform for processing vast amounts of data using open-source tools. Supports Apache Spark, Hadoop, Hive, HBase, Presto, Flink, and more. EMR Serverless for automatic scaling without managing clusters. EMR on EKS runs Spark on Kubernetes. EMR Notebooks for interactive data science. Instance fleets mix instance types for cost optimization. Spot instances reduce costs up to 90%. S3 as persistent storage with EMRFS. Integration with Glue Data Catalog for metadata.',
          codeExample: `# Create EMR cluster
aws emr create-cluster \\
  --name "Spark Cluster" \\
  --release-label emr-6.10.0 \\
  --applications Name=Spark Name=Hive \\
  --instance-type m5.xlarge \\
  --instance-count 3 \\
  --use-default-roles \\
  --ec2-attributes KeyName=my-key,SubnetId=subnet-12345 \\
  --log-uri s3://my-bucket/emr-logs/

# Submit Spark job
aws emr add-steps \\
  --cluster-id j-XXXXXXXXXXXXX \\
  --steps Type=Spark,Name="Process Data",ActionOnFailure=CONTINUE,Args=[--deploy-mode,cluster,--master,yarn,--conf,spark.dynamicAllocation.enabled=true,s3://my-bucket/scripts/process.py,--input,s3://my-bucket/input/,--output,s3://my-bucket/output/]

# PySpark job example
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("DataProcessing").getOrCreate()

# Read from S3
df = spark.read.parquet("s3://my-bucket/input/")

# Transform
result = df.filter(df.amount > 100) \\
           .groupBy("category") \\
           .agg({"amount": "sum", "user_id": "count"})

# Write to S3
result.write.mode("overwrite").parquet("s3://my-bucket/output/")`
        }
      ]
    },
    {
      id: 'api',
      name: 'API & Application Services',
      icon: '🚪',
      color: '#14b8a6',
      description: 'API management, GraphQL, and application integration services.',
      details: [
        {
          name: 'API Gateway',
          explanation: 'Amazon API Gateway handles all tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls. Create RESTful APIs and WebSocket APIs. Traffic management with throttling and quotas. API keys for third-party developers. Request/response validation and transformation. Caching to reduce backend load. Canary deployments for safe releases. Custom domain names with SSL/TLS certificates. Integrates with Lambda, HTTP backends, AWS services, and VPC resources. Pay per million API calls.',
          codeExample: `# Create REST API
aws apigateway create-rest-api \\
  --name "My API" \\
  --description "Production API" \\
  --endpoint-configuration types=REGIONAL

# Create resource and method
aws apigateway create-resource \\
  --rest-api-id abc123 \\
  --parent-id xyz789 \\
  --path-part users

aws apigateway put-method \\
  --rest-api-id abc123 \\
  --resource-id resource123 \\
  --http-method GET \\
  --authorization-type AWS_IAM \\
  --request-parameters method.request.querystring.limit=false

# Integrate with Lambda
aws apigateway put-integration \\
  --rest-api-id abc123 \\
  --resource-id resource123 \\
  --http-method GET \\
  --type AWS_PROXY \\
  --integration-http-method POST \\
  --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789:function:GetUsers/invocations

# Lambda function for API Gateway
exports.handler = async (event) => {
  const { queryStringParameters, pathParameters, body } = event;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ message: 'Success', data: [] })
  };
};`
        },
        {
          name: 'AppSync (GraphQL)',
          explanation: 'AWS AppSync creates serverless GraphQL and Pub/Sub APIs that simplify application development. Auto-generated APIs from data sources (DynamoDB, Lambda, RDS, HTTP). Real-time subscriptions over WebSocket. Offline sync for mobile apps. Fine-grained access control with IAM, Cognito, API keys, or OIDC. Request/response mapping with VTL or JavaScript. Caching with TTL. Built-in monitoring with CloudWatch. Pipeline resolvers for complex operations. DataSource batching reduces backend calls.',
          codeExample: `# GraphQL schema
type Query {
  getUser(id: ID!): User
  listUsers(limit: Int, nextToken: String): UserConnection
}

type Mutation {
  createUser(input: CreateUserInput!): User
  updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): User
}

type Subscription {
  onCreateUser: User
    @aws_subscribe(mutations: ["createUser"])
}

type User {
  id: ID!
  email: String!
  name: String!
  posts: [Post] @connection(keyName: "byUser", fields: ["id"])
  createdAt: AWSDateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  userId: ID! @index(name: "byUser")
  user: User @connection(fields: ["userId"])
}

input CreateUserInput {
  email: String!
  name: String!
}

# Resolver mapping template (VTL)
{
  "version": "2018-05-29",
  "operation": "GetItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.id)
  }
}`
        },
        {
          name: 'App Runner',
          explanation: 'AWS App Runner is a fully managed service that makes it easy to deploy containerized web applications and APIs at scale. Automatic load balancing, scaling, encryption, and health monitoring. Deploy from source code (Node.js, Python, Java, .NET, Go, Ruby) or container images. Auto-scaling based on concurrency or requests. Private services in VPC. Custom domains with SSL/TLS certificates. Observability with logs, metrics, and X-Ray tracing. Pay per vCPU and memory used.',
          codeExample: `# Create App Runner service from source code
aws apprunner create-service \\
  --service-name my-web-app \\
  --source-configuration '{
    "CodeRepository": {
      "RepositoryUrl": "https://github.com/myuser/myapp",
      "SourceCodeVersion": {
        "Type": "BRANCH",
        "Value": "main"
      },
      "CodeConfiguration": {
        "ConfigurationSource": "API",
        "CodeConfigurationValues": {
          "Runtime": "NODEJS_16",
          "BuildCommand": "npm install && npm run build",
          "StartCommand": "npm start",
          "Port": "3000",
          "RuntimeEnvironmentVariables": {
            "NODE_ENV": "production"
          }
        }
      }
    },
    "AutoDeploymentsEnabled": true
  }' \\
  --instance-configuration '{
    "Cpu": "1 vCPU",
    "Memory": "2 GB"
  }' \\
  --auto-scaling-configuration-arn arn:aws:apprunner:us-east-1:123456789:autoscalingconfiguration/my-asc

# Node.js application
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`
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
      { name: 'Cloud', icon: '☁️', page: 'Cloud' },
      { name: 'AWS', icon: '🟠', page: 'AWS' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #FF9900 1%, #0f172a 50%, #FF9900 99%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #FFB84D, #FF9900)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(255, 153, 0, 0.2)',
    border: '1px solid rgba(255, 153, 0, 0.3)',
    borderRadius: '0.5rem',
    color: '#FF9900',
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
        <h1 style={titleStyle}>Amazon Web Services (AWS)</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 153, 0, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 153, 0, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Cloud
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={AWS_COLORS}
        />
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
        primaryColor={AWS_COLORS.primary}
      />


      {/* Concept Cards Grid */}
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
              {concept.details.length} services • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
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
              colors={AWS_COLORS}
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

            {/* Subtopic Tabs */}
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

            {/* Selected Detail Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
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

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
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

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="javascript"
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

export default AWS

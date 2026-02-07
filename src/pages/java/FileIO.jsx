/**
 * File I/O - Java File Operations and NIO
 *
 * This page covers Java file I/O operations including traditional streams,
 * BufferedReader/Writer, NIO Files API, serialization, and directory traversal.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const FILEIO_COLORS = {
  primary: '#f59e0b',           // Amber - main accent color
  primaryHover: '#fbbf24',      // Lighter amber for hover
  bg: 'rgba(245, 158, 11, 0.1)', // Background with transparency
  border: 'rgba(245, 158, 11, 0.3)', // Border color
  arrow: '#f59e0b',             // Arrow/indicator color
  hoverBg: 'rgba(245, 158, 11, 0.2)', // Hover background
  topicBg: 'rgba(245, 158, 11, 0.2)'  // Topic card background
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

/**
 * IO Streams Hierarchy Diagram
 * Shows the relationship between InputStream, OutputStream, Reader, Writer
 */
const IOStreamsHierarchyDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowIO" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java I/O Streams Hierarchy
    </text>

    {/* Byte Streams - Left Side */}
    <text x="200" y="55" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">
      Byte Streams (Binary Data)
    </text>

    <rect x="80" y="70" width="110" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="135" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">InputStream</text>

    <rect x="210" y="70" width="110" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="265" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">OutputStream</text>

    {/* Byte Stream Implementations */}
    <rect x="40" y="140" width="90" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
    <text x="85" y="162" textAnchor="middle" fill="#93c5fd" fontSize="9">FileInputStream</text>

    <rect x="140" y="140" width="90" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
    <text x="185" y="162" textAnchor="middle" fill="#93c5fd" fontSize="9">BufferedInput</text>

    <rect x="240" y="140" width="90" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
    <text x="285" y="162" textAnchor="middle" fill="#93c5fd" fontSize="9">FileOutputStream</text>

    {/* Lines from InputStream */}
    <line x1="135" y1="110" x2="85" y2="140" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="135" y1="110" x2="185" y2="140" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="265" y1="110" x2="285" y2="140" stroke="#60a5fa" strokeWidth="1"/>

    {/* Character Streams - Right Side */}
    <text x="600" y="55" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
      Character Streams (Text Data)
    </text>

    <rect x="490" y="70" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="540" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Reader</text>

    <rect x="610" y="70" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Writer</text>

    {/* Character Stream Implementations */}
    <rect x="440" y="140" width="90" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="485" y="162" textAnchor="middle" fill="#86efac" fontSize="9">FileReader</text>

    <rect x="540" y="140" width="100" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="590" y="162" textAnchor="middle" fill="#86efac" fontSize="9">BufferedReader</text>

    <rect x="650" y="140" width="100" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="700" y="162" textAnchor="middle" fill="#86efac" fontSize="9">BufferedWriter</text>

    {/* Lines from Reader/Writer */}
    <line x1="540" y1="110" x2="485" y2="140" stroke="#4ade80" strokeWidth="1"/>
    <line x1="540" y1="110" x2="590" y2="140" stroke="#4ade80" strokeWidth="1"/>
    <line x1="660" y1="110" x2="700" y2="140" stroke="#4ade80" strokeWidth="1"/>

    {/* Decorator Pattern */}
    <rect x="250" y="220" width="300" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="245" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Decorator Pattern</text>
    <text x="400" y="265" textAnchor="middle" fill="#fcd34d" fontSize="10">new BufferedReader(new FileReader("file.txt"))</text>
    <text x="400" y="280" textAnchor="middle" fill="#94a3b8" fontSize="9">Wrap streams to add buffering functionality</text>
  </svg>
)

/**
 * BufferedReader Flow Diagram
 */
const BufferedReaderDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      BufferedReader - Efficient File Reading
    </text>

    {/* File */}
    <rect x="50" y="70" width="100" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">File</text>
    <text x="100" y="115" textAnchor="middle" fill="#c7d2fe" fontSize="9">file.txt</text>

    {/* FileReader */}
    <rect x="200" y="70" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="260" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FileReader</text>
    <text x="260" y="115" textAnchor="middle" fill="#93c5fd" fontSize="9">char by char</text>

    {/* BufferedReader */}
    <rect x="370" y="70" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="440" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BufferedReader</text>
    <text x="440" y="115" textAnchor="middle" fill="#86efac" fontSize="9">8KB buffer</text>

    {/* Application */}
    <rect x="560" y="70" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="620" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Application</text>
    <text x="620" y="115" textAnchor="middle" fill="#fef3c7" fontSize="9">readLine()</text>

    {/* Arrows */}
    <line x1="150" y1="100" x2="195" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBR)"/>
    <line x1="320" y1="100" x2="365" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBR)"/>
    <line x1="510" y1="100" x2="555" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBR)"/>

    {/* Labels */}
    <text x="172" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">bytes</text>
    <text x="342" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">chars</text>
    <text x="532" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">lines</text>

    {/* Performance Note */}
    <rect x="200" y="150" width="400" height="35" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#4ade80" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#86efac" fontSize="10">Buffering reduces I/O operations - reads 8KB chunks instead of char by char</text>
  </svg>
)

/**
 * BufferedWriter Flow Diagram
 */
const BufferedWriterDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBW" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      BufferedWriter - Efficient File Writing
    </text>

    {/* Application */}
    <rect x="50" y="70" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="110" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Application</text>
    <text x="110" y="115" textAnchor="middle" fill="#fef3c7" fontSize="9">write() + newLine()</text>

    {/* BufferedWriter */}
    <rect x="220" y="70" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="290" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BufferedWriter</text>
    <text x="290" y="115" textAnchor="middle" fill="#86efac" fontSize="9">8KB buffer</text>

    {/* FileWriter */}
    <rect x="410" y="70" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="470" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FileWriter</text>
    <text x="470" y="115" textAnchor="middle" fill="#93c5fd" fontSize="9">char by char</text>

    {/* File */}
    <rect x="580" y="70" width="100" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="630" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">File</text>
    <text x="630" y="115" textAnchor="middle" fill="#c7d2fe" fontSize="9">output.txt</text>

    {/* Arrows */}
    <line x1="170" y1="100" x2="215" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBW)"/>
    <line x1="360" y1="100" x2="405" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBW)"/>
    <line x1="530" y1="100" x2="575" y2="100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBW)"/>

    {/* Labels */}
    <text x="192" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">lines</text>
    <text x="382" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">flush</text>
    <text x="552" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">bytes</text>

    {/* Flush Note */}
    <rect x="150" y="150" width="500" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#fcd34d" fontSize="10">Use newLine() for platform-independent line separators. close() calls flush() automatically.</text>
  </svg>
)

/**
 * NIO Files API Diagram
 */
const NIOFilesAPIDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowNIO" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java NIO.2 Files API (java.nio.file)
    </text>

    {/* Path */}
    <rect x="50" y="60" width="140" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="120" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Path</text>
    <text x="120" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="9">Paths.get("file.txt")</text>

    {/* Files class - central */}
    <rect x="270" y="50" width="260" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Files (Static Methods)</text>
    <text x="400" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">copy() | move() | delete() | readAllLines() | write()</text>
    <text x="400" y="110" textAnchor="middle" fill="#fef3c7" fontSize="9">exists() | size() | walk() | createDirectory()</text>

    {/* Arrow from Path to Files */}
    <line x1="190" y1="85" x2="265" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowNIO)"/>

    {/* Operations */}
    <rect x="50" y="160" width="130" height="45" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
    <text x="115" y="180" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">Files.copy()</text>
    <text x="115" y="195" textAnchor="middle" fill="#60a5fa" fontSize="8">REPLACE_EXISTING</text>

    <rect x="200" y="160" width="130" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="265" y="180" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Files.readAllLines()</text>
    <text x="265" y="195" textAnchor="middle" fill="#4ade80" fontSize="8">{`Returns List&lt;String&gt;`}</text>

    <rect x="350" y="160" width="130" height="45" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="415" y="180" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Files.write()</text>
    <text x="415" y="195" textAnchor="middle" fill="#ec4899" fontSize="8">Creates if not exists</text>

    <rect x="500" y="160" width="130" height="45" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="565" y="180" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold">Files.walk()</text>
    <text x="565" y="195" textAnchor="middle" fill="#06b6d4" fontSize="8">{`Stream&lt;Path&gt;`}</text>

    <rect x="650" y="160" width="110" height="45" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="705" y="180" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Files.move()</text>
    <text x="705" y="195" textAnchor="middle" fill="#8b5cf6" fontSize="8">ATOMIC_MOVE</text>

    {/* Connecting lines */}
    <line x1="400" y1="120" x2="115" y2="155" stroke="#334155" strokeWidth="1"/>
    <line x1="400" y1="120" x2="265" y2="155" stroke="#334155" strokeWidth="1"/>
    <line x1="400" y1="120" x2="415" y2="155" stroke="#334155" strokeWidth="1"/>
    <line x1="400" y1="120" x2="565" y2="155" stroke="#334155" strokeWidth="1"/>
    <line x1="400" y1="120" x2="705" y2="155" stroke="#334155" strokeWidth="1"/>

    {/* Benefits */}
    <rect x="150" y="225" width="500" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="245" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Benefits: Cleaner API, atomic operations, better error handling, Stream support</text>
    <text x="400" y="258" textAnchor="middle" fill="#94a3b8" fontSize="9">Replaces java.io.File for modern Java development (Java 7+)</text>
  </svg>
)

/**
 * Serialization Diagram
 */
const SerializationDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowSer" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java Object Serialization
    </text>

    {/* Object */}
    <rect x="50" y="60" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">User Object</text>
    <text x="125" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="9">name: "John"</text>
    <text x="125" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="9">email: "john@..."</text>
    <text x="125" y="135" textAnchor="middle" fill="#ef4444" fontSize="9">password: "secret"</text>

    {/* ObjectOutputStream */}
    <rect x="270" y="60" width="160" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ObjectOutputStream</text>
    <text x="350" y="110" textAnchor="middle" fill="#86efac" fontSize="9">writeObject()</text>
    <text x="350" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">Skips transient fields</text>

    {/* Binary File */}
    <rect x="500" y="60" width="130" height="80" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="565" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">user.ser</text>
    <text x="565" y="110" textAnchor="middle" fill="#c7d2fe" fontSize="9">Binary Data</text>
    <text x="565" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">serialVersionUID</text>

    {/* Arrows - Serialize */}
    <line x1="200" y1="100" x2="265" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSer)"/>
    <line x1="430" y1="100" x2="495" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSer)"/>

    <text x="232" y="90" textAnchor="middle" fill="#4ade80" fontSize="9">Serialize</text>

    {/* Deserialize path */}
    <rect x="500" y="160" width="130" height="50" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="565" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">user.ser</text>
    <text x="565" y="200" textAnchor="middle" fill="#c7d2fe" fontSize="8">Read bytes</text>

    <rect x="270" y="160" width="160" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ObjectInputStream</text>
    <text x="350" y="200" textAnchor="middle" fill="#93c5fd" fontSize="8">readObject()</text>

    <rect x="50" y="160" width="150" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="125" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User Object</text>
    <text x="125" y="195" textAnchor="middle" fill="#ef4444" fontSize="9">password: null</text>
    <text x="125" y="208" textAnchor="middle" fill="#94a3b8" fontSize="8">(transient = null)</text>

    {/* Arrows - Deserialize */}
    <line x1="495" y1="185" x2="435" y2="185" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowSer)"/>
    <line x1="265" y1="185" x2="205" y2="185" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowSer)"/>

    <text x="450" y="175" textAnchor="middle" fill="#60a5fa" fontSize="9">Deserialize</text>
  </svg>
)

/**
 * Directory Traversal with Files.walk() Diagram
 */
const FilesWalkDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowWalk" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Files.walk() - Directory Tree Traversal
    </text>

    {/* Root directory */}
    <rect x="320" y="50" width="160" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">project/</text>

    {/* Level 1 */}
    <rect x="100" y="120" width="120" height="35" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="160" y="142" textAnchor="middle" fill="white" fontSize="10">src/</text>

    <rect x="340" y="120" width="120" height="35" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="400" y="142" textAnchor="middle" fill="white" fontSize="10">test/</text>

    <rect x="580" y="120" width="120" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="640" y="142" textAnchor="middle" fill="white" fontSize="10">README.md</text>

    {/* Level 2 */}
    <rect x="50" y="185" width="100" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="100" y="204" textAnchor="middle" fill="white" fontSize="9">Main.java</text>

    <rect x="170" y="185" width="100" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="220" y="204" textAnchor="middle" fill="white" fontSize="9">Utils.java</text>

    <rect x="350" y="185" width="100" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="400" y="204" textAnchor="middle" fill="white" fontSize="9">Test.java</text>

    {/* Lines */}
    <line x1="400" y1="90" x2="160" y2="115" stroke="#475569" strokeWidth="1"/>
    <line x1="400" y1="90" x2="400" y2="115" stroke="#475569" strokeWidth="1"/>
    <line x1="400" y1="90" x2="640" y2="115" stroke="#475569" strokeWidth="1"/>

    <line x1="160" y1="155" x2="100" y2="180" stroke="#475569" strokeWidth="1"/>
    <line x1="160" y1="155" x2="220" y2="180" stroke="#475569" strokeWidth="1"/>
    <line x1="400" y1="155" x2="400" y2="180" stroke="#475569" strokeWidth="1"/>

    {/* Stream Pipeline */}
    <rect x="100" y="245" width="600" height="60" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="268" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">{`
      Files.walk(path).filter(Files::isRegularFile).filter(p -&gt; p.endsWith(".java")).collect(toList())
    `}</text>
    <text x="400" y="290" textAnchor="middle" fill="#94a3b8" fontSize="10">{`
      Returns Stream&lt;Path&gt; for functional processing | Use try-with-resources to close
    `}</text>
  </svg>
)

/**
 * Try-With-Resources Diagram
 */
const TryWithResourcesDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTWR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Try-With-Resources - Automatic Resource Management
    </text>

    {/* Try block */}
    <rect x="50" y="50" width="180" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">try ( ... )</text>
    <text x="140" y="95" textAnchor="middle" fill="#86efac" fontSize="9">Open resource</text>
    <text x="140" y="110" textAnchor="middle" fill="#86efac" fontSize="8">AutoCloseable</text>

    {/* Use */}
    <rect x="280" y="50" width="180" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="370" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`{ ... }`}</text>
    <text x="370" y="95" textAnchor="middle" fill="#93c5fd" fontSize="9">Use resource</text>
    <text x="370" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Read/Write</text>

    {/* Auto-close */}
    <rect x="510" y="50" width="180" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`} // end`}</text>
    <text x="600" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="9">Auto-close()</text>
    <text x="600" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Even on exception</text>

    {/* Arrows */}
    <line x1="230" y1="85" x2="275" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowTWR)"/>
    <line x1="460" y1="85" x2="505" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowTWR)"/>

    {/* Benefits */}
    <rect x="100" y="145" width="600" height="55" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#4ade80" strokeWidth="1"/>
    <text x="400" y="168" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Benefits: No resource leaks, cleaner code, handles exceptions properly</text>
    <text x="400" y="188" textAnchor="middle" fill="#94a3b8" fontSize="9">Works with any class implementing AutoCloseable: Streams, Readers, Writers, Connections, etc.</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function FileIO({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'Read File with NIO', difficulty: 'Easy', description: 'Read all lines from a file using Files.readAllLines() and process them.', example: 'Files.readAllLines(Path.of("data.txt"))',
      instructions: `Read a file using NIO.

**Requirements:**
1. Use Files.readAllLines()
2. Process each line
3. Handle IOException`,
      starterCode: `import java.nio.file.*;
import java.util.*;

public class FileReader {
    public static void main(String[] args) {
        // TODO: Read all lines from "data.txt"
        // Print each line with line number
    }
}`,
      solution: `import java.nio.file.*;
import java.util.*;
import java.io.*;

public class FileReader {
    public static void main(String[] args) {
        try {
            List<String> lines = Files.readAllLines(Path.of("data.txt"));
            for (int i = 0; i < lines.size(); i++) {
                System.out.println((i + 1) + ": " + lines.get(i));
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}`
    },
    { id: 2, title: 'Write with BufferedWriter', difficulty: 'Easy', description: 'Write data to a file efficiently using BufferedWriter with try-with-resources.', example: 'BufferedWriter with automatic flush and close',
      instructions: `Write to file with BufferedWriter.

**Requirements:**
1. Use try-with-resources
2. Write multiple lines
3. Auto-flush and close`,
      starterCode: `import java.io.*;
import java.nio.file.*;

public class FileWriter {
    public static void main(String[] args) {
        String[] data = {"Line 1", "Line 2", "Line 3"};
        // TODO: Write data to "output.txt" using BufferedWriter
    }
}`,
      solution: `import java.io.*;
import java.nio.file.*;

public class FileWriter {
    public static void main(String[] args) {
        String[] data = {"Line 1", "Line 2", "Line 3"};
        
        try (BufferedWriter writer = Files.newBufferedWriter(Path.of("output.txt"))) {
            for (String line : data) {
                writer.write(line);
                writer.newLine();
            }
            System.out.println("File written successfully!");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`
    },
    { id: 3, title: 'Directory Traversal', difficulty: 'Medium', description: 'Walk a directory tree and find all files matching a pattern using Files.walk().', example: 'Find all .java files in a project',
      instructions: `Walk directory and find files.

**Requirements:**
1. Use Files.walk()
2. Filter by extension
3. Print matching files`,
      starterCode: `import java.nio.file.*;
import java.io.*;

public class FileFinder {
    public static void main(String[] args) {
        Path startDir = Path.of(".");
        // TODO: Find all .java files in startDir
    }
}`,
      solution: `import java.nio.file.*;
import java.io.*;
import java.util.stream.*;

public class FileFinder {
    public static void main(String[] args) {
        Path startDir = Path.of(".");
        
        try (Stream<Path> paths = Files.walk(startDir)) {
            paths.filter(Files::isRegularFile)
                 .filter(p -> p.toString().endsWith(".java"))
                 .forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`
    },
    { id: 4, title: 'Object Serialization', difficulty: 'Medium', description: 'Serialize and deserialize objects using ObjectOutputStream/ObjectInputStream.', example: 'Save and load User object to file',
      instructions: `Serialize and deserialize objects.

**Requirements:**
1. Implement Serializable
2. Write object to file
3. Read object back`,
      starterCode: `import java.io.*;

class User implements Serializable {
    String name;
    int age;
    
    User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        User user = new User("John", 25);
        // TODO: Save user to "user.dat"
        // TODO: Load user from "user.dat"
    }
}`,
      solution: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;
    
    User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        User user = new User("John", 25);
        
        // Save
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.dat"))) {
            oos.writeObject(user);
            System.out.println("Saved!");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Load
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("user.dat"))) {
            User loaded = (User) ois.readObject();
            System.out.println("Loaded: " + loaded.name + ", " + loaded.age);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}`
    },
    { id: 5, title: 'Watch Service', difficulty: 'Hard', description: 'Monitor a directory for file changes using WatchService.', example: 'Detect when files are created/modified/deleted',
      instructions: `Monitor directory for changes.

**Requirements:**
1. Create WatchService
2. Register for events
3. Process events in loop`,
      starterCode: `import java.nio.file.*;

public class DirectoryWatcher {
    public static void main(String[] args) {
        Path dir = Path.of(".");
        // TODO: Watch directory for CREATE, MODIFY, DELETE events
    }
}`,
      solution: `import java.nio.file.*;
import java.io.*;

public class DirectoryWatcher {
    public static void main(String[] args) throws IOException, InterruptedException {
        Path dir = Path.of(".");
        WatchService watcher = FileSystems.getDefault().newWatchService();
        
        dir.register(watcher,
            StandardWatchEventKinds.ENTRY_CREATE,
            StandardWatchEventKinds.ENTRY_MODIFY,
            StandardWatchEventKinds.ENTRY_DELETE);
        
        System.out.println("Watching " + dir + "...");
        
        while (true) {
            WatchKey key = watcher.take();
            for (WatchEvent<?> event : key.pollEvents()) {
                System.out.println(event.kind() + ": " + event.context());
            }
            key.reset();
        }
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'io-streams',
      name: 'I/O Streams Overview',
      icon: '📊',
      color: '#3b82f6',
      description: 'Understanding Java\'s stream hierarchy for byte and character I/O operations.',
      diagram: IOStreamsHierarchyDiagram,
      details: [
        {
          name: 'Stream Hierarchy',
          diagram: IOStreamsHierarchyDiagram,
          explanation: 'Java I/O is built on two parallel hierarchies: Byte streams (InputStream/OutputStream) for binary data like images and files, and Character streams (Reader/Writer) for text data with proper encoding. Byte streams work with raw bytes, while character streams handle Unicode automatically. Use byte streams for binary files and character streams for text files.',
          codeExample: `// Byte Streams - for binary data (images, files)
InputStream in = new FileInputStream("image.png");
OutputStream out = new FileOutputStream("copy.png");

// Character Streams - for text data
Reader reader = new FileReader("text.txt");
Writer writer = new FileWriter("output.txt");

// Always close streams or use try-with-resources
try (InputStream is = new FileInputStream("file.bin")) {
    // Read bytes
    int byteData;
    while ((byteData = is.read()) != -1) {
        // Process byte
    }
} // Automatically closed`
        },
        {
          name: 'Decorator Pattern',
          explanation: 'Java I/O uses the Decorator Pattern extensively. You wrap streams to add functionality like buffering, compression, or encryption. The wrapped stream delegates to the inner stream while adding its own behavior. This allows flexible composition of I/O capabilities without creating a combinatorial explosion of classes.',
          codeExample: `// Decorator Pattern in action
// Base: FileInputStream reads raw bytes from file
// Decorator 1: BufferedInputStream adds buffering
// Decorator 2: DataInputStream adds typed data methods

try (DataInputStream dis = new DataInputStream(
        new BufferedInputStream(
            new FileInputStream("data.bin")))) {
    int intVal = dis.readInt();      // Read 4-byte int
    double dblVal = dis.readDouble(); // Read 8-byte double
    String str = dis.readUTF();       // Read UTF string
}

// Similarly for character streams
try (BufferedReader br = new BufferedReader(
        new FileReader("text.txt"))) {
    String line = br.readLine();  // Buffered line reading
}`
        },
        {
          name: 'Try-With-Resources',
          diagram: TryWithResourcesDiagram,
          explanation: 'Try-with-resources (Java 7+) automatically closes resources that implement AutoCloseable. This prevents resource leaks and makes code cleaner. Resources are closed in reverse order of declaration, and close() is called even if an exception occurs. Multiple resources can be declared, separated by semicolons.',
          codeExample: `// Before Java 7 - manual cleanup required
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("file.txt"));
    String line = reader.readLine();
} finally {
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            // Swallowed exception
        }
    }
}

// Java 7+ - automatic resource management
try (BufferedReader reader = new BufferedReader(
        new FileReader("file.txt"))) {
    String line = reader.readLine();
    // reader.close() called automatically
}

// Multiple resources
try (FileInputStream fis = new FileInputStream("in.txt");
     FileOutputStream fos = new FileOutputStream("out.txt")) {
    // Both closed automatically, fos first, then fis
}`
        }
      ]
    },
    {
      id: 'buffered-reader',
      name: 'BufferedReader',
      icon: '📖',
      color: '#22c55e',
      description: 'Efficient file reading with buffering and line-by-line processing.',
      diagram: BufferedReaderDiagram,
      details: [
        {
          name: 'Basic Usage',
          diagram: BufferedReaderDiagram,
          explanation: 'BufferedReader wraps a Reader (typically FileReader) to provide buffering. It reads chunks of data (default 8KB) into an internal buffer, reducing I/O operations. The readLine() method returns each line without the line terminator, or null at end of file. This is much more efficient than reading character by character.',
          codeExample: `import java.io.*;

public class BufferedReaderExample {
    public static int readFile(String filename) throws IOException {
        int lineCount = 0;

        // Try-with-resources: automatically closes BufferedReader
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename))) {
            String line;
            // readLine() returns null at end of file
            while ((line = reader.readLine()) != null) {
                lineCount++;
                System.out.println("Line " + lineCount + ": " + line);
            }
        }

        return lineCount;
    }

    public static void main(String[] args) {
        try {
            int lines = readFile("data.txt");
            System.out.println("Total lines: " + lines);
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}`
        },
        {
          name: 'With Streams API',
          explanation: 'BufferedReader.lines() returns a Stream<String> for functional-style processing. This enables filtering, mapping, and collecting lines using the Streams API. Remember to use try-with-resources since the stream should be closed. This approach is elegant for processing large files with transformations.',
          codeExample: `import java.io.*;
import java.util.*;
import java.util.stream.*;

public class StreamProcessing {
    public static List<String> findLongLines(String filename, int minLength)
            throws IOException {
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename))) {
            return reader.lines()                      // Stream<String>
                .filter(line -> line.length() > minLength)
                .map(String::trim)
                .collect(Collectors.toList());
        }
    }

    public static Map<String, Long> wordFrequency(String filename)
            throws IOException {
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename))) {
            return reader.lines()
                .flatMap(line -> Arrays.stream(line.split("\\\\s+")))
                .filter(word -> !word.isEmpty())
                .collect(Collectors.groupingBy(
                    String::toLowerCase,
                    Collectors.counting()));
        }
    }

    // Count lines matching a pattern
    public static long countMatches(String filename, String pattern)
            throws IOException {
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename))) {
            return reader.lines()
                .filter(line -> line.contains(pattern))
                .count();
        }
    }
}`
        },
        {
          name: 'Custom Buffer Size',
          explanation: 'The default buffer size is 8192 characters (8KB). For very large files or specific performance requirements, you can specify a custom buffer size. Larger buffers reduce I/O operations but use more memory. Smaller buffers are useful for memory-constrained environments or when reading small amounts of data.',
          codeExample: `import java.io.*;

public class CustomBufferExample {
    // Default buffer size is 8192 chars
    public static void readWithDefaultBuffer(String filename)
            throws IOException {
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename))) {
            // Uses 8KB buffer
            String line;
            while ((line = reader.readLine()) != null) {
                process(line);
            }
        }
    }

    // Custom buffer size for large files
    public static void readWithLargeBuffer(String filename)
            throws IOException {
        int bufferSize = 64 * 1024;  // 64KB buffer
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename), bufferSize)) {
            String line;
            while ((line = reader.readLine()) != null) {
                process(line);
            }
        }
    }

    // Small buffer for memory-constrained environment
    public static void readWithSmallBuffer(String filename)
            throws IOException {
        int bufferSize = 1024;  // 1KB buffer
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename), bufferSize)) {
            String line;
            while ((line = reader.readLine()) != null) {
                process(line);
            }
        }
    }

    private static void process(String line) {
        // Process line
    }
}`
        }
      ]
    },
    {
      id: 'buffered-writer',
      name: 'BufferedWriter',
      icon: '📝',
      color: '#f59e0b',
      description: 'Efficient file writing with buffering and platform-independent line separators.',
      diagram: BufferedWriterDiagram,
      details: [
        {
          name: 'Basic Usage',
          diagram: BufferedWriterDiagram,
          explanation: 'BufferedWriter wraps a Writer (typically FileWriter) to provide buffering. It collects written data in a buffer and writes to the underlying stream in larger chunks, improving performance. Use write() for text and newLine() for platform-independent line separators. The buffer is flushed automatically on close().',
          codeExample: `import java.io.*;
import java.util.*;

public class BufferedWriterExample {
    public static void writeLines(String filename, List<String> lines)
            throws IOException {
        // Try-with-resources: automatically closes and flushes
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename))) {
            for (String line : lines) {
                writer.write(line);
                writer.newLine();  // Platform-independent line separator
            }
            // writer.flush() called automatically on close
        }
    }

    public static void main(String[] args) {
        try {
            List<String> lines = Arrays.asList(
                "First line",
                "Second line",
                "Third line"
            );
            writeLines("output.txt", lines);
            System.out.println("Wrote " + lines.size() + " lines");
        } catch (IOException e) {
            System.err.println("Error writing file: " + e.getMessage());
        }
    }
}`
        },
        {
          name: 'Append Mode',
          explanation: 'By default, FileWriter overwrites existing files. To append to a file, pass true as the second argument to FileWriter. This is useful for log files, data collection, or any scenario where you want to add to existing content rather than replace it.',
          codeExample: `import java.io.*;
import java.time.LocalDateTime;

public class AppendExample {
    // Overwrite mode (default)
    public static void overwriteFile(String filename, String content)
            throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename))) {  // Overwrites existing
            writer.write(content);
        }
    }

    // Append mode
    public static void appendToFile(String filename, String content)
            throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename, true))) {  // Appends to existing
            writer.write(content);
            writer.newLine();
        }
    }

    // Log file example
    public static void log(String filename, String message)
            throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename, true))) {
            writer.write("[" + LocalDateTime.now() + "] " + message);
            writer.newLine();
        }
    }

    public static void main(String[] args) throws IOException {
        // Create new file
        overwriteFile("log.txt", "Log started");

        // Append entries
        log("log.txt", "User logged in");
        log("log.txt", "Processing data");
        log("log.txt", "Task completed");
    }
}`
        },
        {
          name: 'Manual Flush',
          explanation: 'The buffer is automatically flushed when full or on close(). However, for real-time logging or when you need immediate writes, use flush() manually. Be aware that frequent flushing negates the performance benefit of buffering. Use autoFlush with PrintWriter for automatic flushing after each println().',
          codeExample: `import java.io.*;

public class FlushExample {
    // Manual flush for real-time logging
    public static void realTimeLog(String filename) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename, true))) {

            for (int i = 0; i < 10; i++) {
                writer.write("Event " + i + " at " + System.currentTimeMillis());
                writer.newLine();
                writer.flush();  // Immediate write to disk

                Thread.sleep(1000);  // Simulate work
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // PrintWriter with auto-flush
    public static void autoFlushLog(String filename) throws IOException {
        try (PrintWriter writer = new PrintWriter(
                new BufferedWriter(new FileWriter(filename, true)),
                true)) {  // true = autoFlush on println

            writer.println("This is immediately flushed");
            // No manual flush needed after println()
        }
    }

    // Batch writes with periodic flush
    public static void batchWrite(String filename, List<String> data)
            throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename))) {

            int count = 0;
            for (String line : data) {
                writer.write(line);
                writer.newLine();
                count++;

                // Flush every 1000 lines
                if (count % 1000 == 0) {
                    writer.flush();
                }
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'nio-files',
      name: 'NIO Files API',
      icon: '⚡',
      color: '#8b5cf6',
      description: 'Modern file operations using java.nio.file.Files (Java 7+) for cleaner, more efficient code.',
      diagram: NIOFilesAPIDiagram,
      details: [
        {
          name: 'Path and Files',
          diagram: NIOFilesAPIDiagram,
          explanation: 'Java NIO.2 (Java 7+) provides the Path interface and Files utility class for modern file operations. Path represents file paths, and Files provides static methods for common operations. This API is cleaner than java.io.File and offers better error handling, atomic operations, and Stream support.',
          codeExample: `import java.nio.file.*;
import java.util.*;

public class NIOFilesExample {
    public static void main(String[] args) throws Exception {
        // Create Path objects
        Path path = Paths.get("data.txt");
        Path absolute = Paths.get("/home/user/data.txt");
        Path fromParts = Paths.get("home", "user", "data.txt");

        // File existence and properties
        boolean exists = Files.exists(path);
        boolean isFile = Files.isRegularFile(path);
        boolean isDir = Files.isDirectory(path);
        long size = Files.size(path);

        // Read entire file
        List<String> lines = Files.readAllLines(path);
        String content = Files.readString(path);  // Java 11+
        byte[] bytes = Files.readAllBytes(path);

        // Write to file
        Files.write(path, lines);  // Writes list of lines
        Files.writeString(path, "content");  // Java 11+
        Files.write(path, bytes);

        // Create directories
        Files.createDirectory(Paths.get("newdir"));
        Files.createDirectories(Paths.get("parent/child/grandchild"));

        // Delete
        Files.delete(path);  // Throws if not exists
        Files.deleteIfExists(path);  // Returns boolean
    }
}`
        },
        {
          name: 'Copy and Move',
          explanation: 'Files.copy() and Files.move() provide robust file operations with options for handling existing files, preserving attributes, and performing atomic moves. StandardCopyOption enum provides options like REPLACE_EXISTING, COPY_ATTRIBUTES, and ATOMIC_MOVE for fine-grained control.',
          codeExample: `import java.nio.file.*;
import static java.nio.file.StandardCopyOption.*;

public class CopyMoveExample {
    public static void main(String[] args) throws Exception {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("target.txt");

        // Copy file - fails if target exists
        Files.copy(source, target);

        // Copy with options
        Files.copy(source, target,
            REPLACE_EXISTING,      // Overwrite if exists
            COPY_ATTRIBUTES);      // Preserve timestamps, permissions

        // Copy to directory
        Path targetDir = Paths.get("backup");
        Files.copy(source, targetDir.resolve(source.getFileName()),
            REPLACE_EXISTING);

        // Move (rename) file
        Files.move(source, Paths.get("renamed.txt"));

        // Move with options
        Files.move(source, target,
            REPLACE_EXISTING,
            ATOMIC_MOVE);  // Atomic operation - all or nothing

        // Copy from InputStream
        try (var inputStream = getClass().getResourceAsStream("/data.txt")) {
            Files.copy(inputStream, target, REPLACE_EXISTING);
        }

        // Copy to OutputStream
        try (var outputStream = Files.newOutputStream(target)) {
            Files.copy(source, outputStream);
        }
    }
}`
        },
        {
          name: 'ReadAllLines vs BufferedReader',
          explanation: 'Files.readAllLines() reads the entire file into memory as a List<String>, which is convenient for small files but dangerous for large ones. For large files, use Files.lines() which returns a lazy Stream<String>, or BufferedReader for traditional line-by-line processing with minimal memory usage.',
          codeExample: `import java.nio.file.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;

public class ReadingStrategies {
    // Small files - read all at once
    public static List<String> readSmallFile(Path path) throws IOException {
        return Files.readAllLines(path);  // All lines in memory
    }

    // Large files - stream processing (lazy)
    public static long countLargeFile(Path path) throws IOException {
        try (Stream<String> lines = Files.lines(path)) {
            return lines.count();  // Processes one line at a time
        }
    }

    // Large files - buffered reading
    public static void processLargeFile(Path path) throws IOException {
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            String line;
            while ((line = reader.readLine()) != null) {
                process(line);  // One line in memory at a time
            }
        }
    }

    // Memory comparison
    public static void memoryDemo(String filename) throws IOException {
        Path path = Paths.get(filename);

        // BAD for large files - loads entire file
        // List<String> all = Files.readAllLines(path);

        // GOOD for large files - lazy stream
        try (Stream<String> stream = Files.lines(path)) {
            stream.filter(line -> line.contains("ERROR"))
                  .forEach(System.out::println);
        }
    }

    private static void process(String line) {
        // Process each line
    }
}`
        }
      ]
    },
    {
      id: 'serialization',
      name: 'Serialization',
      icon: '💾',
      color: '#ec4899',
      description: 'Convert objects to byte streams for storage or transmission, with transient fields for security.',
      diagram: SerializationDiagram,
      details: [
        {
          name: 'Basic Serialization',
          diagram: SerializationDiagram,
          explanation: 'Serialization converts Java objects to byte streams for storage or network transmission. Classes must implement Serializable interface. Use ObjectOutputStream.writeObject() to serialize and ObjectInputStream.readObject() to deserialize. Always define serialVersionUID for version control of serialized objects.',
          codeExample: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String email;
    private int age;

    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email +
               "', age=" + age + "}";
    }
}

public class SerializationExample {
    public static void main(String[] args) throws Exception {
        User user = new User("John", "john@example.com", 30);

        // Serialize to file
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            out.writeObject(user);
        }

        // Deserialize from file
        User loaded;
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("user.ser"))) {
            loaded = (User) in.readObject();
        }

        System.out.println("Original: " + user);
        System.out.println("Loaded: " + loaded);
    }
}`
        },
        {
          name: 'Transient Fields',
          explanation: 'The transient keyword excludes fields from serialization. Use it for sensitive data (passwords), derived/cached values, or fields that cannot be serialized. Transient fields are set to their default values (null, 0, false) upon deserialization. This is essential for security and proper object lifecycle management.',
          codeExample: `import java.io.*;

class SecureUser implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private String email;

    // Sensitive data - NOT serialized
    private transient String password;

    // Cached/derived data - recalculated on demand
    private transient String displayName;

    // Non-serializable field
    private transient Thread backgroundTask;

    public SecureUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.displayName = username + " <" + email + ">";
    }

    public String getDisplayName() {
        if (displayName == null) {
            displayName = username + " <" + email + ">";
        }
        return displayName;
    }

    @Override
    public String toString() {
        return "SecureUser{username='" + username +
               "', password='" + password + "'}";
    }
}

public class TransientExample {
    public static void main(String[] args) throws Exception {
        SecureUser user = new SecureUser("john", "john@example.com", "secret123");
        System.out.println("Before: " + user);

        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("secure_user.ser"))) {
            out.writeObject(user);
        }

        // Deserialize
        SecureUser loaded;
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("secure_user.ser"))) {
            loaded = (SecureUser) in.readObject();
        }

        // password is null after deserialization
        System.out.println("After: " + loaded);
    }
}`
        },
        {
          name: 'Custom Serialization',
          explanation: 'For fine-grained control, implement writeObject() and readObject() private methods. This allows custom handling during serialization: encrypting sensitive data, compressing content, or managing transient field reconstruction. The methods must follow exact signatures and call defaultWriteObject()/defaultReadObject() first.',
          codeExample: `import java.io.*;
import java.util.Base64;

class CustomUser implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private transient String password;  // Stored encrypted

    public CustomUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Custom serialization
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();  // Write non-transient fields

        // Encrypt and write password
        if (password != null) {
            String encrypted = Base64.getEncoder()
                .encodeToString(password.getBytes());
            out.writeObject(encrypted);
        } else {
            out.writeObject(null);
        }
    }

    // Custom deserialization
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();  // Read non-transient fields

        // Decrypt password
        String encrypted = (String) in.readObject();
        if (encrypted != null) {
            this.password = new String(
                Base64.getDecoder().decode(encrypted));
        }
    }

    @Override
    public String toString() {
        return "CustomUser{username='" + username +
               "', password='" + password + "'}";
    }
}

public class CustomSerializationExample {
    public static void main(String[] args) throws Exception {
        CustomUser user = new CustomUser("john", "secret123");
        System.out.println("Original: " + user);

        // Serialize (password encrypted)
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(baos)) {
            out.writeObject(user);
        }

        // Deserialize (password decrypted)
        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(baos.toByteArray()))) {
            CustomUser loaded = (CustomUser) in.readObject();
            System.out.println("Loaded: " + loaded);
        }
    }
}`
        }
      ]
    },
    {
      id: 'directory-traversal',
      name: 'Directory Traversal',
      icon: '📁',
      color: '#06b6d4',
      description: 'Recursive directory walking with Files.walk() and Stream API for powerful file processing.',
      diagram: FilesWalkDiagram,
      details: [
        {
          name: 'Files.walk()',
          diagram: FilesWalkDiagram,
          explanation: 'Files.walk() returns a Stream<Path> for recursive directory traversal. It visits all files and directories in the tree, depth-first. Use try-with-resources because the stream must be closed. Combine with filter(), map(), and collect() for powerful file processing. Optionally specify maxDepth to limit recursion.',
          codeExample: `import java.nio.file.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;

public class DirectoryWalkExample {
    // Find all files with extension
    public static List<Path> findByExtension(Path dir, String ext)
            throws IOException {
        try (Stream<Path> stream = Files.walk(dir)) {
            return stream
                .filter(Files::isRegularFile)
                .filter(p -> p.toString().endsWith(ext))
                .collect(Collectors.toList());
        }
    }

    // Calculate total size of directory
    public static long calculateSize(Path dir) throws IOException {
        try (Stream<Path> stream = Files.walk(dir)) {
            return stream
                .filter(Files::isRegularFile)
                .mapToLong(p -> {
                    try {
                        return Files.size(p);
                    } catch (IOException e) {
                        return 0;
                    }
                })
                .sum();
        }
    }

    // Find files modified in last N days
    public static List<Path> recentlyModified(Path dir, int days)
            throws IOException {
        long cutoff = System.currentTimeMillis() -
                      (days * 24L * 60 * 60 * 1000);

        try (Stream<Path> stream = Files.walk(dir)) {
            return stream
                .filter(Files::isRegularFile)
                .filter(p -> {
                    try {
                        return Files.getLastModifiedTime(p)
                                    .toMillis() > cutoff;
                    } catch (IOException e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());
        }
    }

    // Limit depth
    public static List<Path> shallowWalk(Path dir, int maxDepth)
            throws IOException {
        try (Stream<Path> stream = Files.walk(dir, maxDepth)) {
            return stream.collect(Collectors.toList());
        }
    }
}`
        },
        {
          name: 'Delete Directory Recursively',
          explanation: 'Deleting a non-empty directory requires deleting all contents first. Files.walk() returns paths depth-first, so reverse the order to delete files before their parent directories. Use sorted(Comparator.reverseOrder()) or walkFileTree() with a FileVisitor for proper deletion order.',
          codeExample: `import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.*;
import java.util.*;

public class DeleteDirectoryExample {
    // Method 1: Using walk() with reverse order
    public static void deleteDirectory(Path dir) throws IOException {
        if (!Files.exists(dir)) return;

        try (Stream<Path> stream = Files.walk(dir)) {
            stream
                .sorted(Comparator.reverseOrder())  // Files before directories
                .forEach(path -> {
                    try {
                        Files.delete(path);
                    } catch (IOException e) {
                        System.err.println("Failed to delete: " + path);
                    }
                });
        }
    }

    // Method 2: Using walkFileTree (more control)
    public static void deleteWithVisitor(Path dir) throws IOException {
        Files.walkFileTree(dir, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file,
                    BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir,
                    IOException exc) throws IOException {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            }
        });
    }

    public static void main(String[] args) throws IOException {
        // Create test structure
        Path testDir = Paths.get("test_delete");
        Files.createDirectories(testDir.resolve("subdir"));
        Files.writeString(testDir.resolve("file1.txt"), "content");
        Files.writeString(testDir.resolve("subdir/file2.txt"), "content");

        // Delete entire directory tree
        deleteDirectory(testDir);

        System.out.println("Deleted: " + !Files.exists(testDir));
    }
}`
        },
        {
          name: 'FileVisitor Pattern',
          explanation: 'FileVisitor provides callbacks for each file and directory during traversal. It offers more control than Files.walk(), including pre/post visit hooks, error handling, and the ability to skip subtrees. Use SimpleFileVisitor as a base class and override only the methods you need.',
          codeExample: `import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.*;

public class FileVisitorExample {
    // Copy entire directory tree
    public static void copyDirectory(Path source, Path target)
            throws IOException {
        Files.walkFileTree(source, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir,
                    BasicFileAttributes attrs) throws IOException {
                Path targetDir = target.resolve(source.relativize(dir));
                Files.createDirectories(targetDir);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path file,
                    BasicFileAttributes attrs) throws IOException {
                Path targetFile = target.resolve(source.relativize(file));
                Files.copy(file, targetFile,
                    StandardCopyOption.REPLACE_EXISTING);
                return FileVisitResult.CONTINUE;
            }
        });
    }

    // Search for file by name
    public static Path findFile(Path start, String fileName)
            throws IOException {
        final Path[] result = { null };

        Files.walkFileTree(start, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file,
                    BasicFileAttributes attrs) {
                if (file.getFileName().toString().equals(fileName)) {
                    result[0] = file;
                    return FileVisitResult.TERMINATE;  // Stop search
                }
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult preVisitDirectory(Path dir,
                    BasicFileAttributes attrs) {
                // Skip hidden directories
                if (dir.getFileName().toString().startsWith(".")) {
                    return FileVisitResult.SKIP_SUBTREE;
                }
                return FileVisitResult.CONTINUE;
            }
        });

        return result[0];
    }
}`
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'File I/O', icon: '📂', page: 'File I/O' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #78350f 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(245, 158, 11, 0.2)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>File I/O</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FILEIO_COLORS}
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
        primaryColor={FILEIO_COLORS.primary}
      />


      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `FileIO-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #f59e0b' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`FileIO-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#f59e0b', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              {concept.details.length} topics - Click to explore
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
              colors={FILEIO_COLORS}
            />

            {/* Modal Header with Navigation */}
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

            {/* Selected Subtopic Content */}
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

export default FileIO

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// SVG Diagram: Python Data Types Overview
const PythonDataTypesDiagram = () => (
  <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="pythonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#306998" />
        <stop offset="100%" stopColor="#4B8BBE" />
      </linearGradient>
      <linearGradient id="pythonYellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD43B" />
        <stop offset="100%" stopColor="#FFE873" />
      </linearGradient>
      <linearGradient id="numericGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#81C784" />
      </linearGradient>
      <linearGradient id="sequenceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2196F3" />
        <stop offset="100%" stopColor="#64B5F6" />
      </linearGradient>
      <linearGradient id="mappingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9C27B0" />
        <stop offset="100%" stopColor="#BA68C8" />
      </linearGradient>
      <linearGradient id="setGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF5722" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="700" height="400" fill="#1a1a2e" rx="10" />

    {/* Title */}
    <text x="350" y="35" textAnchor="middle" fill="url(#pythonYellow)" fontSize="20" fontWeight="bold">
      Python Data Types
    </text>

    {/* Central Python logo placeholder */}
    <circle cx="350" cy="130" r="40" fill="url(#pythonBlue)" filter="url(#shadow)" />
    <text x="350" y="137" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Py</text>

    {/* Numeric Types Box */}
    <g transform="translate(30, 200)">
      <rect width="140" height="150" rx="8" fill="url(#numericGrad)" filter="url(#shadow)" />
      <text x="70" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Numeric</text>
      <rect x="15" y="40" width="110" height="30" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="60" textAnchor="middle" fill="white" fontSize="12">int</text>
      <text x="70" y="75" textAnchor="middle" fill="#E8F5E9" fontSize="9">42, -17, 0</text>
      <rect x="15" y="85" width="110" height="30" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="105" textAnchor="middle" fill="white" fontSize="12">float</text>
      <text x="70" y="120" textAnchor="middle" fill="#E8F5E9" fontSize="9">3.14, -0.5</text>
    </g>

    {/* Sequence Types Box */}
    <g transform="translate(190, 200)">
      <rect width="140" height="150" rx="8" fill="url(#sequenceGrad)" filter="url(#shadow)" />
      <text x="70" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Sequences</text>
      <rect x="15" y="40" width="110" height="25" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="57" textAnchor="middle" fill="white" fontSize="11">str "hello"</text>
      <rect x="15" y="70" width="110" height="25" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="87" textAnchor="middle" fill="white" fontSize="11">list [1, 2, 3]</text>
      <rect x="15" y="100" width="110" height="25" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="117" textAnchor="middle" fill="white" fontSize="11">tuple (1, 2)</text>
    </g>

    {/* Mapping Types Box */}
    <g transform="translate(350, 200)">
      <rect width="140" height="150" rx="8" fill="url(#mappingGrad)" filter="url(#shadow)" />
      <text x="70" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Mapping</text>
      <rect x="15" y="45" width="110" height="50" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="70" textAnchor="middle" fill="white" fontSize="12">dict</text>
      <text x="70" y="85" textAnchor="middle" fill="#F3E5F5" fontSize="9">{"{'key': 'val'}"}</text>
    </g>

    {/* Set Types Box */}
    <g transform="translate(510, 200)">
      <rect width="140" height="150" rx="8" fill="url(#setGrad)" filter="url(#shadow)" />
      <text x="70" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Sets</text>
      <rect x="15" y="45" width="110" height="50" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="70" y="70" textAnchor="middle" fill="white" fontSize="12">set</text>
      <text x="70" y="85" textAnchor="middle" fill="#FBE9E7" fontSize="9">{"{1, 2, 3}"}</text>
    </g>

    {/* Connecting arrows from center */}
    <line x1="310" y1="150" x2="100" y2="200" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="335" y1="165" x2="260" y2="200" stroke="#FFD43B" strokeWidth="2" />
    <line x1="365" y1="165" x2="420" y2="200" stroke="#FFD43B" strokeWidth="2" />
    <line x1="390" y1="150" x2="580" y2="200" stroke="#FFD43B" strokeWidth="2" />

    {/* Legend */}
    <text x="350" y="380" textAnchor="middle" fill="#888" fontSize="11">
      Mutable: list, dict, set | Immutable: int, float, str, tuple
    </text>
  </svg>
)

// SVG Diagram: Python Memory Model (Reference Semantics)
const MemoryModelDiagram = () => (
  <svg viewBox="0 0 650 350" style={{ width: '100%', maxWidth: '650px', height: 'auto' }}>
    <defs>
      <linearGradient id="memVarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3F51B5" />
        <stop offset="100%" stopColor="#5C6BC0" />
      </linearGradient>
      <linearGradient id="memObjGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#009688" />
        <stop offset="100%" stopColor="#4DB6AC" />
      </linearGradient>
      <marker id="arrowMem" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FFD43B" />
      </marker>
      <filter id="memShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="650" height="350" fill="#1a1a2e" rx="10" />

    {/* Title */}
    <text x="325" y="30" textAnchor="middle" fill="#FFD43B" fontSize="18" fontWeight="bold">
      Python Memory Model: Names Point to Objects
    </text>

    {/* Variables Section */}
    <rect x="30" y="55" width="180" height="250" rx="8" fill="#2d2d44" stroke="#3F51B5" strokeWidth="2" />
    <text x="120" y="80" textAnchor="middle" fill="#7986CB" fontSize="14" fontWeight="bold">Names (Variables)</text>

    {/* Variable boxes */}
    <rect x="50" y="100" width="140" height="35" rx="6" fill="url(#memVarGrad)" filter="url(#memShadow)" />
    <text x="120" y="123" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">a</text>

    <rect x="50" y="150" width="140" height="35" rx="6" fill="url(#memVarGrad)" filter="url(#memShadow)" />
    <text x="120" y="173" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">b</text>

    <rect x="50" y="200" width="140" height="35" rx="6" fill="url(#memVarGrad)" filter="url(#memShadow)" />
    <text x="120" y="223" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">my_list</text>

    <rect x="50" y="250" width="140" height="35" rx="6" fill="url(#memVarGrad)" filter="url(#memShadow)" />
    <text x="120" y="273" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">other_list</text>

    {/* Objects Section */}
    <rect x="350" y="55" width="270" height="250" rx="8" fill="#2d2d44" stroke="#009688" strokeWidth="2" />
    <text x="485" y="80" textAnchor="middle" fill="#4DB6AC" fontSize="14" fontWeight="bold">Objects in Memory</text>

    {/* Object boxes */}
    <rect x="370" y="100" width="100" height="50" rx="6" fill="url(#memObjGrad)" filter="url(#memShadow)" />
    <text x="420" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">int</text>
    <text x="420" y="138" textAnchor="middle" fill="#E0F2F1" fontSize="14">42</text>

    <rect x="500" y="100" width="100" height="50" rx="6" fill="url(#memObjGrad)" filter="url(#memShadow)" />
    <text x="550" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">str</text>
    <text x="550" y="138" textAnchor="middle" fill="#E0F2F1" fontSize="14">"hello"</text>

    <rect x="400" y="185" width="180" height="50" rx="6" fill="url(#memObjGrad)" filter="url(#memShadow)" />
    <text x="490" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">list</text>
    <text x="490" y="223" textAnchor="middle" fill="#E0F2F1" fontSize="14">[1, 2, 3]</text>

    {/* Arrows connecting names to objects */}
    <line x1="190" y1="117" x2="365" y2="117" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMem)" />
    <line x1="190" y1="167" x2="350" y2="130" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMem)" />
    <line x1="190" y1="217" x2="395" y2="205" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMem)" />
    <line x1="190" y1="267" x2="395" y2="220" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMem)" />

    {/* Annotations */}
    <text x="290" y="110" textAnchor="middle" fill="#888" fontSize="10">a = 42</text>
    <text x="270" y="145" textAnchor="middle" fill="#888" fontSize="10">b = 42</text>
    <text x="270" y="195" textAnchor="middle" fill="#888" fontSize="10">my_list = [1,2,3]</text>
    <text x="250" y="260" textAnchor="middle" fill="#888" fontSize="10">other_list = my_list</text>

    {/* Note */}
    <text x="325" y="330" textAnchor="middle" fill="#aaa" fontSize="11">
      Multiple names can reference the same object (aliasing)
    </text>
  </svg>
)

// SVG Diagram: Mutable vs Immutable Objects
const MutableImmutableDiagram = () => (
  <svg viewBox="0 0 700 380" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="immutableGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5C6BC0" />
        <stop offset="100%" stopColor="#7986CB" />
      </linearGradient>
      <linearGradient id="mutableGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43A047" />
        <stop offset="100%" stopColor="#66BB6A" />
      </linearGradient>
      <linearGradient id="newObjGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF7043" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
      <marker id="arrowMut" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FFD43B" />
      </marker>
      <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#EF5350" />
      </marker>
      <filter id="mutShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="700" height="380" fill="#1a1a2e" rx="10" />

    {/* Title */}
    <text x="350" y="30" textAnchor="middle" fill="#FFD43B" fontSize="18" fontWeight="bold">
      Mutable vs Immutable Objects
    </text>

    {/* Immutable Section */}
    <rect x="20" y="50" width="320" height="300" rx="8" fill="#252540" stroke="#5C6BC0" strokeWidth="2" />
    <text x="180" y="75" textAnchor="middle" fill="#9FA8DA" fontSize="16" fontWeight="bold">Immutable</text>
    <text x="180" y="95" textAnchor="middle" fill="#888" fontSize="11">int, float, str, tuple, bool</text>

    {/* Immutable example - Before */}
    <text x="100" y="125" textAnchor="middle" fill="#ccc" fontSize="12">x = "hello"</text>
    <rect x="40" y="135" width="60" height="30" rx="5" fill="url(#immutableGrad)" filter="url(#mutShadow)" />
    <text x="70" y="155" textAnchor="middle" fill="white" fontSize="12">x</text>
    <line x1="100" y1="150" x2="140" y2="150" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMut)" />
    <rect x="145" y="135" width="90" height="30" rx="5" fill="url(#immutableGrad)" filter="url(#mutShadow)" />
    <text x="190" y="155" textAnchor="middle" fill="white" fontSize="11">"hello"</text>

    {/* Immutable example - After */}
    <text x="100" y="195" textAnchor="middle" fill="#ccc" fontSize="12">x = x + " world"</text>
    <rect x="40" y="210" width="60" height="30" rx="5" fill="url(#immutableGrad)" filter="url(#mutShadow)" />
    <text x="70" y="230" textAnchor="middle" fill="white" fontSize="12">x</text>

    {/* Old object (grayed out) */}
    <rect x="145" y="210" width="90" height="30" rx="5" fill="#444" filter="url(#mutShadow)" opacity="0.5" />
    <text x="190" y="230" textAnchor="middle" fill="#888" fontSize="11">"hello"</text>
    <line x1="100" y1="225" x2="140" y2="225" stroke="#666" strokeWidth="1" strokeDasharray="4" />

    {/* New object */}
    <rect x="145" y="260" width="120" height="30" rx="5" fill="url(#newObjGrad)" filter="url(#mutShadow)" />
    <text x="205" y="280" textAnchor="middle" fill="white" fontSize="11">"hello world"</text>
    <line x1="100" y1="240" x2="105" y2="275" stroke="#FFD43B" strokeWidth="2" />
    <line x1="105" y1="275" x2="140" y2="275" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMut)" />

    <text x="180" y="320" textAnchor="middle" fill="#aaa" fontSize="10">Creates NEW object</text>

    {/* Mutable Section */}
    <rect x="360" y="50" width="320" height="300" rx="8" fill="#252540" stroke="#43A047" strokeWidth="2" />
    <text x="520" y="75" textAnchor="middle" fill="#81C784" fontSize="16" fontWeight="bold">Mutable</text>
    <text x="520" y="95" textAnchor="middle" fill="#888" fontSize="11">list, dict, set</text>

    {/* Mutable example - Before */}
    <text x="440" y="125" textAnchor="middle" fill="#ccc" fontSize="12">lst = [1, 2, 3]</text>
    <rect x="380" y="135" width="60" height="30" rx="5" fill="url(#mutableGrad)" filter="url(#mutShadow)" />
    <text x="410" y="155" textAnchor="middle" fill="white" fontSize="12">lst</text>
    <line x1="440" y1="150" x2="485" y2="150" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMut)" />
    <rect x="490" y="135" width="110" height="30" rx="5" fill="url(#mutableGrad)" filter="url(#mutShadow)" />
    <text x="545" y="155" textAnchor="middle" fill="white" fontSize="11">[1, 2, 3]</text>

    {/* Mutable example - After */}
    <text x="440" y="195" textAnchor="middle" fill="#ccc" fontSize="12">lst.append(4)</text>
    <rect x="380" y="210" width="60" height="30" rx="5" fill="url(#mutableGrad)" filter="url(#mutShadow)" />
    <text x="410" y="230" textAnchor="middle" fill="white" fontSize="12">lst</text>
    <line x1="440" y1="225" x2="485" y2="225" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowMut)" />

    {/* Same object modified */}
    <rect x="490" y="210" width="140" height="30" rx="5" fill="url(#mutableGrad)" filter="url(#mutShadow)" />
    <text x="560" y="230" textAnchor="middle" fill="white" fontSize="11">[1, 2, 3, 4]</text>

    <text x="520" y="270" textAnchor="middle" fill="#81C784" fontSize="10">Same object, modified in-place</text>

    {/* Aliasing warning */}
    <rect x="380" y="285" width="280" height="50" rx="5" fill="rgba(239, 83, 80, 0.2)" stroke="#EF5350" strokeWidth="1" />
    <text x="520" y="305" textAnchor="middle" fill="#EF5350" fontSize="11" fontWeight="bold">Aliasing Effect:</text>
    <text x="520" y="322" textAnchor="middle" fill="#FFCDD2" fontSize="10">b = lst; b.append(5) also changes lst!</text>
  </svg>
)

// SVG Diagram: Function Call Mechanics
const FunctionCallDiagram = () => (
  <svg viewBox="0 0 700 420" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="funcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B1FA2" />
        <stop offset="100%" stopColor="#AB47BC" />
      </linearGradient>
      <linearGradient id="scopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0277BD" />
        <stop offset="100%" stopColor="#03A9F4" />
      </linearGradient>
      <linearGradient id="globalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#455A64" />
        <stop offset="100%" stopColor="#78909C" />
      </linearGradient>
      <linearGradient id="returnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E65100" />
        <stop offset="100%" stopColor="#FF9800" />
      </linearGradient>
      <marker id="arrowFunc" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FFD43B" />
      </marker>
      <marker id="arrowReturn" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FF9800" />
      </marker>
      <filter id="funcShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="700" height="420" fill="#1a1a2e" rx="10" />

    {/* Title */}
    <text x="350" y="30" textAnchor="middle" fill="#FFD43B" fontSize="18" fontWeight="bold">
      Function Call: Arguments, Local Scope, Return
    </text>

    {/* Global Scope */}
    <rect x="20" y="50" width="200" height="350" rx="8" fill="#252540" stroke="#78909C" strokeWidth="2" />
    <text x="120" y="75" textAnchor="middle" fill="#B0BEC5" fontSize="14" fontWeight="bold">Global Scope</text>

    <rect x="40" y="95" width="160" height="35" rx="5" fill="url(#globalGrad)" filter="url(#funcShadow)" />
    <text x="120" y="117" textAnchor="middle" fill="white" fontSize="12">x = 10</text>

    <rect x="40" y="145" width="160" height="35" rx="5" fill="url(#globalGrad)" filter="url(#funcShadow)" />
    <text x="120" y="167" textAnchor="middle" fill="white" fontSize="12">name = "Alice"</text>

    {/* Function Call */}
    <rect x="40" y="210" width="160" height="50" rx="5" fill="url(#funcGrad)" filter="url(#funcShadow)" />
    <text x="120" y="235" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Calling:</text>
    <text x="120" y="252" textAnchor="middle" fill="#E1BEE7" fontSize="11">result = greet(name)</text>

    {/* Result */}
    <rect x="40" y="300" width="160" height="35" rx="5" fill="url(#returnGrad)" filter="url(#funcShadow)" />
    <text x="120" y="322" textAnchor="middle" fill="white" fontSize="12">result = "Hello, Alice!"</text>

    {/* Arrow from call to function */}
    <path d="M 200 235 Q 280 200 300 180" fill="none" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowFunc)" />
    <text x="260" y="195" fill="#FFD43B" fontSize="10">1. Call</text>

    {/* Function Definition & Local Scope */}
    <rect x="290" y="50" width="280" height="230" rx="8" fill="#252540" stroke="#AB47BC" strokeWidth="2" />
    <text x="430" y="75" textAnchor="middle" fill="#CE93D8" fontSize="14" fontWeight="bold">Function: greet(person)</text>

    {/* Local Scope Box */}
    <rect x="310" y="90" width="240" height="170" rx="6" fill="#1a1a2e" stroke="#03A9F4" strokeWidth="1" strokeDasharray="5" />
    <text x="430" y="110" textAnchor="middle" fill="#4FC3F7" fontSize="12">Local Scope (created on call)</text>

    {/* Parameters */}
    <rect x="330" y="125" width="200" height="30" rx="4" fill="url(#scopeGrad)" filter="url(#funcShadow)" />
    <text x="430" y="145" textAnchor="middle" fill="white" fontSize="11">person = "Alice" (parameter)</text>

    {/* Local variable */}
    <rect x="330" y="165" width="200" height="30" rx="4" fill="url(#scopeGrad)" filter="url(#funcShadow)" />
    <text x="430" y="185" textAnchor="middle" fill="white" fontSize="11">greeting = f"Hello, {'{person}'}!"</text>

    {/* Return statement */}
    <rect x="330" y="210" width="200" height="30" rx="4" fill="url(#returnGrad)" filter="url(#funcShadow)" />
    <text x="430" y="230" textAnchor="middle" fill="white" fontSize="11">return greeting</text>

    {/* Return arrow */}
    <path d="M 310 230 Q 270 270 200 300" fill="none" stroke="#FF9800" strokeWidth="2" markerEnd="url(#arrowReturn)" />
    <text x="240" y="280" fill="#FF9800" fontSize="10">2. Return</text>

    {/* LEGB Rule */}
    <rect x="590" y="50" width="100" height="230" rx="8" fill="#252540" stroke="#FFD43B" strokeWidth="2" />
    <text x="640" y="75" textAnchor="middle" fill="#FFD43B" fontSize="12" fontWeight="bold">LEGB</text>
    <text x="640" y="75" textAnchor="middle" fill="#FFD43B" fontSize="12" fontWeight="bold">LEGB</text>

    <rect x="600" y="95" width="80" height="30" rx="4" fill="#4CAF50" />
    <text x="640" y="115" textAnchor="middle" fill="white" fontSize="10">L - Local</text>

    <rect x="600" y="135" width="80" height="30" rx="4" fill="#2196F3" />
    <text x="640" y="155" textAnchor="middle" fill="white" fontSize="10">E - Enclosing</text>

    <rect x="600" y="175" width="80" height="30" rx="4" fill="#9C27B0" />
    <text x="640" y="195" textAnchor="middle" fill="white" fontSize="10">G - Global</text>

    <rect x="600" y="215" width="80" height="30" rx="4" fill="#FF5722" />
    <text x="640" y="235" textAnchor="middle" fill="white" fontSize="10">B - Built-in</text>

    {/* Scope lookup arrow */}
    <text x="640" y="260" textAnchor="middle" fill="#888" fontSize="9">Search Order</text>
    <line x1="640" y1="100" x2="640" y2="245" stroke="#888" strokeWidth="1" strokeDasharray="3" />

    {/* Notes */}
    <rect x="290" y="300" width="400" height="80" rx="6" fill="#2d2d44" />
    <text x="490" y="325" textAnchor="middle" fill="#aaa" fontSize="11">Key Points:</text>
    <text x="490" y="345" textAnchor="middle" fill="#888" fontSize="10">- Arguments are passed by assignment (reference to object)</text>
    <text x="490" y="362" textAnchor="middle" fill="#888" fontSize="10">- Local scope is created when function is called, destroyed on return</text>
  </svg>
)

// SVG Diagram: Exception Handling Flow
const ExceptionHandlingDiagram = () => (
  <svg viewBox="0 0 700 450" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="tryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1976D2" />
        <stop offset="100%" stopColor="#42A5F5" />
      </linearGradient>
      <linearGradient id="exceptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D32F2F" />
        <stop offset="100%" stopColor="#EF5350" />
      </linearGradient>
      <linearGradient id="elseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#388E3C" />
        <stop offset="100%" stopColor="#66BB6A" />
      </linearGradient>
      <linearGradient id="finallyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B1FA2" />
        <stop offset="100%" stopColor="#AB47BC" />
      </linearGradient>
      <marker id="arrowExc" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#FFD43B" />
      </marker>
      <marker id="arrowErr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#EF5350" />
      </marker>
      <marker id="arrowOk" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#66BB6A" />
      </marker>
      <filter id="excShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="700" height="450" fill="#1a1a2e" rx="10" />

    {/* Title */}
    <text x="350" y="30" textAnchor="middle" fill="#FFD43B" fontSize="18" fontWeight="bold">
      try / except / else / finally Flow
    </text>

    {/* TRY block */}
    <rect x="250" y="55" width="200" height="70" rx="8" fill="url(#tryGrad)" filter="url(#excShadow)" />
    <text x="350" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">try:</text>
    <text x="350" y="110" textAnchor="middle" fill="#BBDEFB" fontSize="11">risky code here</text>

    {/* Decision diamond */}
    <polygon points="350,150 420,190 350,230 280,190" fill="#2d2d44" stroke="#FFD43B" strokeWidth="2" />
    <text x="350" y="195" textAnchor="middle" fill="#FFD43B" fontSize="11">Exception?</text>

    {/* Arrow from try to decision */}
    <line x1="350" y1="125" x2="350" y2="150" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowExc)" />

    {/* EXCEPT branch (Yes - exception occurred) */}
    <line x1="420" y1="190" x2="530" y2="190" stroke="#EF5350" strokeWidth="2" markerEnd="url(#arrowErr)" />
    <text x="475" y="180" fill="#EF5350" fontSize="10">Yes</text>

    <rect x="530" y="155" width="150" height="70" rx="8" fill="url(#exceptGrad)" filter="url(#excShadow)" />
    <text x="605" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">except:</text>
    <text x="605" y="210" textAnchor="middle" fill="#FFCDD2" fontSize="11">handle error</text>

    {/* ELSE branch (No - no exception) */}
    <line x1="280" y1="190" x2="170" y2="190" stroke="#66BB6A" strokeWidth="2" markerEnd="url(#arrowOk)" />
    <text x="225" y="180" fill="#66BB6A" fontSize="10">No</text>

    <rect x="20" y="155" width="150" height="70" rx="8" fill="url(#elseGrad)" filter="url(#excShadow)" />
    <text x="95" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">else:</text>
    <text x="95" y="210" textAnchor="middle" fill="#C8E6C9" fontSize="11">success code</text>

    {/* Both paths lead to FINALLY */}
    <line x1="95" y1="225" x2="95" y2="290" stroke="#FFD43B" strokeWidth="2" />
    <line x1="95" y1="290" x2="280" y2="290" stroke="#FFD43B" strokeWidth="2" />

    <line x1="605" y1="225" x2="605" y2="290" stroke="#FFD43B" strokeWidth="2" />
    <line x1="605" y1="290" x2="420" y2="290" stroke="#FFD43B" strokeWidth="2" />

    <line x1="350" y1="290" x2="350" y2="310" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowExc)" />

    {/* FINALLY block */}
    <rect x="250" y="310" width="200" height="70" rx="8" fill="url(#finallyGrad)" filter="url(#excShadow)" />
    <text x="350" y="340" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">finally:</text>
    <text x="350" y="365" textAnchor="middle" fill="#E1BEE7" fontSize="11">cleanup (always runs)</text>

    {/* Continue execution */}
    <line x1="350" y1="380" x2="350" y2="410" stroke="#FFD43B" strokeWidth="2" markerEnd="url(#arrowExc)" />
    <text x="350" y="435" textAnchor="middle" fill="#aaa" fontSize="12">Continue execution</text>

    {/* Side notes */}
    <rect x="20" y="260" width="150" height="80" rx="6" fill="#2d2d44" />
    <text x="95" y="285" textAnchor="middle" fill="#81C784" fontSize="10" fontWeight="bold">else:</text>
    <text x="95" y="302" textAnchor="middle" fill="#888" fontSize="9">Runs only if</text>
    <text x="95" y="316" textAnchor="middle" fill="#888" fontSize="9">NO exception</text>
    <text x="95" y="330" textAnchor="middle" fill="#888" fontSize="9">in try block</text>

    <rect x="530" y="260" width="150" height="80" rx="6" fill="#2d2d44" />
    <text x="605" y="285" textAnchor="middle" fill="#EF5350" fontSize="10" fontWeight="bold">except:</text>
    <text x="605" y="302" textAnchor="middle" fill="#888" fontSize="9">Can catch specific</text>
    <text x="605" y="316" textAnchor="middle" fill="#888" fontSize="9">exception types:</text>
    <text x="605" y="330" textAnchor="middle" fill="#FFCDD2" fontSize="8">except ValueError as e:</text>
  </svg>
)

const CorePython = ({ onBack, breadcrumb }) => {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Compute extended breadcrumb when a concept is selected
  const activeBreadcrumb = selectedConcept ? {
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => setSelectedConcept(null)
    },
    topic: selectedConcept.name,
    colors: breadcrumb.colors
  } : breadcrumb

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const concepts = [
    {
      name: 'Data Types & Variables',
      icon: '📦',
      diagram: PythonDataTypesDiagram,
      secondaryDiagram: MemoryModelDiagram,
      explanation: `Python's core data types and variable handling:

• **Variables**: Dynamic typing, no declaration needed
  - Assignment: name = value
  - Multiple assignment: a, b = 1, 2
  - Variable naming: snake_case convention

• **Basic Types**:
  - int: Unlimited precision integers
  - float: Floating-point numbers
  - str: Immutable text sequences
  - bool: True/False values

• **Collections**:
  - list: Mutable ordered sequences
  - tuple: Immutable ordered sequences
  - dict: Key-value mappings
  - set: Unordered unique elements

• **Type Conversion**: int(), float(), str(), list(), tuple(), dict(), set()
• **Type Checking**: type(), isinstance()`,
      codeExample: `# Variables and Basic Types
x = 42                    # int
y = 3.14                  # float
name = "Python"           # str
is_active = True          # bool

# Multiple assignment
a, b, c = 1, 2, 3
x = y = z = 0            # Same value

# Type conversion
num_str = "123"
num = int(num_str)       # 123
pi_str = str(3.14159)    # "3.14159"

# Lists - Mutable ordered collections
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")   # Add item
fruits[0] = "mango"      # Modify item
fruits.pop()             # Remove last item
print(fruits)            # ['mango', 'banana', 'cherry']

# Tuples - Immutable ordered collections
coordinates = (10, 20)
point = 5, 10            # Parentheses optional
x, y = coordinates       # Unpacking

# Dictionaries - Key-value pairs
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}
person["age"] = 31       # Update value
person["email"] = "alice@example.com"  # Add new key
name = person.get("name", "Unknown")   # Safe access
print(person.keys())     # dict_keys(['name', 'age', 'city', 'email'])
print(person.values())   # dict_values(['Alice', 31, 'NYC', 'alice@example.com'])

# Sets - Unordered unique elements
numbers = {1, 2, 3, 4, 5}
numbers.add(6)           # Add element
numbers.remove(3)        # Remove element
primes = {2, 3, 5, 7}
print(numbers & primes)  # Intersection: {2, 5, 7}
print(numbers | primes)  # Union: {1, 2, 4, 5, 6, 7}
print(numbers - primes)  # Difference: {1, 4, 6}

# Type checking
print(type(42))          # <class 'int'>
print(isinstance(3.14, float))  # True
print(isinstance("hi", (str, int)))  # True (checks multiple types)`
    },
    {
      name: 'Control Flow',
      icon: '🔀',
      diagram: MutableImmutableDiagram,
      explanation: `Control structures for program flow:

• **Conditional Statements**:
  - if/elif/else for branching logic
  - Inline if: value_if_true if condition else value_if_false
  - Truthy/Falsy values: 0, None, "", [], {} are False

• **Loops**:
  - for loop: Iterate over sequences (range, lists, strings)
  - while loop: Continue while condition is True
  - break: Exit loop early
  - continue: Skip to next iteration
  - else clause: Executes if loop completes normally

• **Range Function**:
  - range(stop): 0 to stop-1
  - range(start, stop): start to stop-1
  - range(start, stop, step): with step increment

• **Iteration Tools**:
  - enumerate(): Get index and value
  - zip(): Iterate multiple sequences together
  - reversed(): Iterate in reverse`,
      codeExample: `# If/Elif/Else
age = 25
if age < 18:
    status = "minor"
elif age < 65:
    status = "adult"
else:
    status = "senior"
print(status)  # "adult"

# Inline if (ternary operator)
min_value = a if a < b else b
parity = "even" if num % 2 == 0 else "odd"

# Truthy/Falsy
values = [0, "", None, [], {}, False]
if not values:  # Empty list is falsy
    print("List is empty")

# For loops with range
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4

for i in range(2, 10, 2):  # start, stop, step
    print(i, end=" ")      # 2 4 6 8

# For loops with collections
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

# Enumerate for index + value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Zip for parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i, end=" ")  # 0 1 2 4 5 6

# For-else (else runs if no break)
for num in range(2, 10):
    for divisor in range(2, num):
        if num % divisor == 0:
            print(f"{num} = {divisor} * {num//divisor}")
            break
    else:
        print(f"{num} is prime")

# Match-Case (Python 3.10+)
def http_status(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500 | 503:  # Multiple patterns
            return "Server Error"
        case _:  # Default
            return "Unknown"`
    },
    {
      name: 'Functions & Scope',
      icon: '⚡',
      diagram: FunctionCallDiagram,
      explanation: `Functions and variable scope in Python:

• **Function Definition**:
  - def keyword to define functions
  - Parameters: positional, keyword, default values
  - return statement (returns None if omitted)
  - Docstrings for documentation

• **Parameter Types**:
  - Positional: Required in order
  - Keyword: Named arguments
  - Default: Parameters with default values
  - *args: Variable positional arguments (tuple)
  - **kwargs: Variable keyword arguments (dict)

• **Scope Rules (LEGB)**:
  - L: Local (function)
  - E: Enclosing (nested functions)
  - G: Global (module level)
  - B: Built-in (Python's built-in namespace)

• **Special Features**:
  - First-class functions (assign to variables)
  - Nested functions (closures)
  - global/nonlocal keywords for scope modification`,
      codeExample: `# Basic function
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

message = greet("Alice")  # "Hello, Alice!"

# Default parameters
def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25 (uses default exponent=2)
print(power(5, 3))   # 125

# Keyword arguments
def describe_person(name, age, city):
    return f"{name} is {age} years old and lives in {city}"

# Can call with keywords in any order
print(describe_person(age=30, city="NYC", name="Bob"))

# *args - Variable positional arguments
def sum_all(*numbers):
    """Sum any number of arguments."""
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))        # 6
print(sum_all(10, 20, 30, 40)) # 100

# **kwargs - Variable keyword arguments
def create_profile(**info):
    """Create a profile from keyword arguments."""
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

user = create_profile(name="Alice", age=25, city="Boston")
print(user)  # {'name': 'Alice', 'age': 25, 'city': 'Boston'}

# Combining all parameter types
def complex_function(pos1, pos2, *args, default="value", **kwargs):
    print(f"Positional: {pos1}, {pos2}")
    print(f"Extra positional: {args}")
    print(f"Default: {default}")
    print(f"Keyword args: {kwargs}")

complex_function(1, 2, 3, 4, default="custom", key1="a", key2="b")

# Scope - LEGB Rule
x = "global"  # Global scope

def outer():
    x = "enclosing"  # Enclosing scope

    def inner():
        x = "local"  # Local scope
        print(f"Local: {x}")

    inner()
    print(f"Enclosing: {x}")

outer()
print(f"Global: {x}")

# Global and nonlocal keywords
counter = 0  # Global variable

def increment_global():
    global counter
    counter += 1

increment_global()
print(counter)  # 1

def outer_func():
    count = 0

    def inner_func():
        nonlocal count  # Modify enclosing scope
        count += 1
        return count

    return inner_func

counter_func = outer_func()
print(counter_func())  # 1
print(counter_func())  # 2

# First-class functions
def square(x):
    return x * x

def cube(x):
    return x * x * x

# Assign function to variable
operation = square
print(operation(5))  # 25

# Pass function as argument
def apply_operation(func, value):
    return func(value)

print(apply_operation(cube, 3))  # 27`
    },
    {
      name: 'Classes & OOP',
      icon: '🏗️',
      explanation: `Object-Oriented Programming in Python:

• **Class Basics**:
  - class keyword to define classes
  - __init__() constructor method
  - self parameter references instance
  - Instance attributes vs class attributes

• **Methods**:
  - Instance methods: Take self as first parameter
  - Class methods: Use @classmethod, take cls parameter
  - Static methods: Use @staticmethod, no special first parameter
  - Special methods: __str__, __repr__, __len__, etc.

• **Inheritance**:
  - Single inheritance: class Child(Parent)
  - Multiple inheritance: class Child(Parent1, Parent2)
  - super() to call parent methods
  - Method overriding

• **Encapsulation**:
  - Public: name
  - Protected: _name (convention)
  - Private: __name (name mangling)
  - Properties: @property decorator`,
      codeExample: `# Basic class definition
class Dog:
    """A simple Dog class."""

    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    def __init__(self, name, age):
        """Initialize dog with name and age."""
        self.name = name  # Instance attribute
        self.age = age

    def bark(self):
        """Make the dog bark."""
        return f"{self.name} says Woof!"

    def description(self):
        """Return description of the dog."""
        return f"{self.name} is {self.age} years old"

# Create instances
buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)

print(buddy.bark())          # "Buddy says Woof!"
print(buddy.description())   # "Buddy is 3 years old"
print(Dog.species)           # "Canis familiaris"

# Special methods (magic methods)
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        """String representation for users."""
        return f"{self.title} by {self.author}"

    def __repr__(self):
        """String representation for developers."""
        return f"Book('{self.title}', '{self.author}', {self.pages})"

    def __len__(self):
        """Return number of pages."""
        return self.pages

    def __eq__(self, other):
        """Check equality based on title and author."""
        return self.title == other.title and self.author == other.author

book1 = Book("Python Basics", "John Doe", 250)
print(str(book1))   # "Python Basics by John Doe"
print(len(book1))   # 250

# Inheritance
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement speak()")

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Duck(Animal):
    def speak(self):
        return f"{self.name} says Quack!"

# Using inheritance
animals = [Cat("Whiskers"), Duck("Donald")]
for animal in animals:
    print(animal.speak())

# Using super() for parent methods
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_details(self):
        return f"{self.name}: ${self.salary}"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)  # Call parent constructor
        self.department = department

    def get_details(self):
        parent_details = super().get_details()
        return f"{parent_details} (Dept: {self.department})"

mgr = Manager("Alice", 80000, "Engineering")
print(mgr.get_details())  # "Alice: $80000 (Dept: Engineering)"

# Class methods and static methods
class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients

    @classmethod
    def margherita(cls):
        """Factory method for margherita pizza."""
        return cls(["mozzarella", "tomatoes", "basil"])

    @classmethod
    def pepperoni(cls):
        """Factory method for pepperoni pizza."""
        return cls(["mozzarella", "tomatoes", "pepperoni"])

    @staticmethod
    def mix_ingredients(ingredients):
        """Static helper method."""
        return ", ".join(ingredients)

    def __str__(self):
        return f"Pizza with {Pizza.mix_ingredients(self.ingredients)}"

# Use class methods as factory methods
pizza1 = Pizza.margherita()
pizza2 = Pizza.pepperoni()
print(pizza1)  # "Pizza with mozzarella, tomatoes, basil"

# Properties and encapsulation
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius  # Protected attribute

    @property
    def celsius(self):
        """Get temperature in Celsius."""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """Set temperature in Celsius with validation."""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit."""
        return (self._celsius * 9/5) + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set temperature using Fahrenheit."""
        self.celsius = (value - 32) * 5/9

temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0
temp.fahrenheit = 100
print(temp.celsius)      # 37.77...`
    },
    {
      name: 'Exception Handling',
      icon: '⚠️',
      diagram: ExceptionHandlingDiagram,
      explanation: `Error handling with exceptions:

• **Try-Except-Finally**:
  - try: Code that might raise exceptions
  - except: Handle specific or general exceptions
  - else: Runs if no exception occurred
  - finally: Always runs (cleanup code)

• **Common Exception Types**:
  - ValueError: Invalid value
  - TypeError: Wrong type
  - KeyError: Missing dictionary key
  - IndexError: Invalid list index
  - FileNotFoundError: File doesn't exist
  - ZeroDivisionError: Division by zero

• **Raising Exceptions**:
  - raise keyword to throw exceptions
  - Custom exception classes (inherit from Exception)
  - Exception chaining with from

• **Best Practices**:
  - Catch specific exceptions, not all
  - Use finally for cleanup (files, connections)
  - Provide meaningful error messages
  - Don't catch exceptions you can't handle`,
      codeExample: `# Basic try-except
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    else:
        print("Division successful")
        return result
    finally:
        print("Division operation completed")

print(divide(10, 2))  # Division successful, then "completed", then 5.0
print(divide(10, 0))  # Error message, then "completed", then None

# Multiple exception types
def process_data(data, index):
    try:
        value = int(data[index])
        return 100 / value
    except IndexError:
        print("Error: Index out of range")
    except ValueError:
        print("Error: Cannot convert to integer")
    except ZeroDivisionError:
        print("Error: Value is zero")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Catching multiple exceptions together
def safe_convert(value):
    try:
        return int(value)
    except (ValueError, TypeError) as e:
        print(f"Conversion failed: {e}")
        return None

# Exception information
try:
    x = int("not a number")
except ValueError as e:
    print(f"Error type: {type(e).__name__}")
    print(f"Error message: {e}")
    print(f"Error args: {e.args}")

# Raising exceptions
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")

# Custom exception classes
class InsufficientFundsError(Exception):
    """Raised when account has insufficient funds."""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Insufficient funds: \${balance} available, \${amount} required"
        )

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Available: \${e.balance}")
    print(f"Requested: \${e.amount}")

# Exception chaining (preserving original exception)
def process_file(filename):
    try:
        with open(filename, 'r') as f:
            data = f.read()
            return int(data)
    except FileNotFoundError as e:
        raise ValueError(f"Configuration file missing: {filename}") from e
    except ValueError as e:
        raise ValueError(f"Invalid data in {filename}") from e

# Using else clause
def read_config(filename):
    try:
        with open(filename, 'r') as f:
            config = f.read()
    except FileNotFoundError:
        print("Config file not found, using defaults")
        config = "default_config"
    else:
        print("Config file loaded successfully")
    finally:
        print("Config loading completed")

    return config

# Context managers automatically handle cleanup
try:
    with open('data.txt', 'r') as f:
        content = f.read()
    # File is automatically closed even if exception occurs
except FileNotFoundError:
    print("File not found")

# Assert for debugging (raises AssertionError)
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    assert all(isinstance(n, (int, float)) for n in numbers), "All items must be numbers"
    return sum(numbers) / len(numbers)

try:
    calculate_average([])
except AssertionError as e:
    print(f"Assertion failed: {e}")`
    },
    {
      name: 'File I/O & Modules',
      icon: '📁',
      explanation: `File operations and module system:

• **File Operations**:
  - open() function: Opens files
  - Modes: 'r' (read), 'w' (write), 'a' (append), 'b' (binary)
  - Methods: read(), readline(), readlines(), write()
  - with statement: Automatic file closing (context manager)

• **File Paths**:
  - Relative paths: './file.txt', '../parent/file.txt'
  - Absolute paths: '/home/user/file.txt', 'C:\\\\Users\\\\file.txt'
  - pathlib module for path operations

• **Module System**:
  - import: Import entire module
  - from module import name: Import specific items
  - import module as alias: Create alias
  - __name__ == '__main__': Check if script is main

• **Module Types**:
  - Standard library: Built-in modules (os, sys, json, etc.)
  - Third-party: Installed via pip (requests, numpy, etc.)
  - Custom: Your own .py files

• **Packages**:
  - Directory with __init__.py file
  - Organize related modules
  - Import with dot notation: from package.module import function`,
      codeExample: `# Writing to a file
with open('output.txt', 'w') as f:
    f.write("Hello, World!\\n")
    f.write("Python File I/O\\n")
# File automatically closed after with block

# Reading entire file
with open('output.txt', 'r') as f:
    content = f.read()
    print(content)

# Reading line by line
with open('output.txt', 'r') as f:
    for line in f:
        print(line.strip())  # strip() removes newline

# Reading all lines into a list
with open('output.txt', 'r') as f:
    lines = f.readlines()
    print(lines)  # ['Hello, World!\\n', 'Python File I/O\\n']

# Appending to a file
with open('output.txt', 'a') as f:
    f.write("Appended line\\n")

# Binary file operations
data = b"\\x00\\x01\\x02\\x03"
with open('binary.dat', 'wb') as f:
    f.write(data)

with open('binary.dat', 'rb') as f:
    binary_data = f.read()
    print(binary_data)  # b'\\x00\\x01\\x02\\x03'

# Working with JSON
import json

# Write JSON to file
data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "JavaScript", "SQL"]
}

with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

# Read JSON from file
with open('data.json', 'r') as f:
    loaded_data = json.load(f)
    print(loaded_data['name'])  # "Alice"

# File path operations with pathlib
from pathlib import Path

# Create Path object
file_path = Path('data') / 'config.txt'
print(file_path)  # data/config.txt

# Check if file exists
if file_path.exists():
    print("File exists")

# Get file info
print(file_path.name)       # 'config.txt'
print(file_path.suffix)     # '.txt'
print(file_path.parent)     # 'data'

# Create directory
Path('logs').mkdir(exist_ok=True)

# List files in directory
for file in Path('.').glob('*.py'):
    print(file)

# Module imports - Different styles
import math
print(math.sqrt(16))  # 4.0

from math import pi, sqrt
print(pi)             # 3.14159...
print(sqrt(25))       # 5.0

from math import *    # Import all (not recommended)
print(cos(0))         # 1.0

import math as m      # Create alias
print(m.ceil(4.2))    # 5

# Importing from standard library
import os
import sys
from datetime import datetime, timedelta

# Get current directory
current_dir = os.getcwd()
print(f"Current directory: {current_dir}")

# Environment variables
home_dir = os.environ.get('HOME', '/default/path')

# System information
print(f"Python version: {sys.version}")
print(f"Platform: {sys.platform}")

# Date and time
now = datetime.now()
tomorrow = now + timedelta(days=1)
print(f"Now: {now}")
print(f"Tomorrow: {tomorrow}")

# Creating a module (save as mymodule.py)
# mymodule.py content:
# def greet(name):
#     return f"Hello, {name}!"
#
# PI = 3.14159
#
# class Calculator:
#     @staticmethod
#     def add(a, b):
#         return a + b

# Using custom module
# import mymodule
# print(mymodule.greet("Alice"))
# print(mymodule.PI)
# calc = mymodule.Calculator()
# print(calc.add(5, 3))

# Main guard pattern
def main():
    """Main function of the script."""
    print("Running as main program")
    # Your code here

if __name__ == '__main__':
    # This only runs when script is executed directly
    # Not when imported as a module
    main()

# Package structure example:
# mypackage/
#   __init__.py
#   module1.py
#   module2.py
#   subpackage/
#     __init__.py
#     module3.py

# Importing from packages
# from mypackage import module1
# from mypackage.subpackage import module3
# from mypackage.module1 import some_function

# Working with CSV files
import csv

# Write CSV
data = [
    ['Name', 'Age', 'City'],
    ['Alice', 30, 'NYC'],
    ['Bob', 25, 'LA']
]

with open('people.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)

# Read CSV
with open('people.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# CSV with dictionaries
with open('people.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['Name']} is {row['Age']} years old")`
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Python
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🐍 Core Python
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <div
              key={index}
              onClick={() => setSelectedConcept(concept)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #3b82f6',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.75rem',
                color: '#93c5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore fundamental Python concepts
              </p>
            </div>
          ))}
        </div>

        {selectedConcept && (
          <div style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: '50',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '0.75rem',
              maxWidth: '72rem',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '2px solid #3b82f6',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #60a5fa',
                zIndex: '10'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {selectedConcept.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedConcept(null)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '1rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#b91c1c'
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc2626'
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                {/* Visual Diagram Section */}
                {selectedConcept.diagram && (
                  <div style={{
                    background: '#1f2937',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    border: '1px solid #3b82f6'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: '#93c5fd'
                    }}>
                      Visual Overview
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.5rem'
                    }}>
                      <selectedConcept.diagram />
                      {selectedConcept.secondaryDiagram && (
                        <selectedConcept.secondaryDiagram />
                      )}
                    </div>
                  </div>
                )}

                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
                  }}>
                    Overview
                  </h3>
                  <div style={{
                    color: '#d1d5db',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.625'
                  }}>
                    {selectedConcept.explanation}
                  </div>
                </div>

                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
                  }}>
                    Code Examples
                  </h3>
                  {parseCodeSections(selectedConcept.codeExample).map(
                    (section, idx) => (
                      <div key={section.id} style={{
                        backgroundColor: '#1e293b',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '2px solid #334155',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          padding: '1rem 1.5rem',
                          backgroundColor: '#334155',
                          color: '#60a5fa',
                          fontSize: '1rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span>💻 Code Block {idx + 1}</span>
                        </div>
                        <SyntaxHighlighter
                          language="python"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            background: 'none',
                            backgroundColor: 'transparent',
                            padding: 0
                          }}
                        >
                          {section.code}
                        </SyntaxHighlighter>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CorePython

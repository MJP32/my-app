import React, { useState, useEffect, useRef, useCallback } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useTheme } from '../contexts/ThemeContext';
import { onAuthStateChange } from '../services/authService';
import { loadDrawings, addDrawing, deleteDrawing as deleteDrawingFromStorage } from '../services/drawingService';

// Animated Pattern Diagrams - receive stackDepth to highlight current level
const LinearDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 140" className="w-full h-32">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
      </marker>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {[0, 1, 2, 3, 4].map((i) => {
      const isActive = i < stackDepth;
      const isCurrent = i === stackDepth - 1;
      return (
        <g key={i} className={isCurrent ? 'animate-pulse' : ''}>
          <rect
            x={20 + i * 42} y={15 + i * 24} width="40" height="24" rx="4"
            fill={isActive ? (isCurrent ? '#3b82f6' : '#1d4ed8') : '#334155'}
            stroke={isCurrent ? '#60a5fa' : 'none'} strokeWidth="2"
            filter={isCurrent ? 'url(#glow)' : 'none'}
            style={{ transition: 'all 0.3s ease' }}
          />
          <text x={40 + i * 42} y={31 + i * 24} fontSize="11" fill="white" textAnchor="middle" fontWeight={isCurrent ? 'bold' : 'normal'}>
            f({5-i})
          </text>
          {i < 4 && (
            <path
              d={`M${60 + i * 42} ${32 + i * 24} L${62 + i * 42} ${39 + i * 24}`}
              stroke={i < stackDepth - 1 ? '#60a5fa' : '#475569'} strokeWidth="2" markerEnd="url(#arrow)"
              style={{ transition: 'stroke 0.3s ease' }}
            />
          )}
        </g>
      );
    })}
    <text x="120" y="135" fontSize="9" fill="#94a3b8" textAnchor="middle">
      Stack depth: {stackDepth} | Each call waits for the next
    </text>
  </svg>
);

const TwoBranchDiagram = ({ stackDepth = 0 }) => {
  const nodes = [
    { id: 0, x: 120, y: 12, label: 'f(4)', level: 0 },
    { id: 1, x: 60, y: 45, label: 'f(3)', level: 1 },
    { id: 2, x: 180, y: 45, label: 'f(2)', level: 1 },
    { id: 3, x: 30, y: 78, label: 'f(2)', level: 2 },
    { id: 4, x: 90, y: 78, label: 'f(1)', level: 2 },
    { id: 5, x: 150, y: 78, label: 'f(1)', level: 2 },
    { id: 6, x: 210, y: 78, label: 'f(0)', level: 2 },
  ];
  return (
    <svg viewBox="0 0 240 110" className="w-full h-32">
      <defs><filter id="glowPurple"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {/* Lines */}
      <line x1="110" y1="22" x2="70" y2="35" stroke={stackDepth > 0 ? '#a78bfa' : '#475569'} strokeWidth="2" />
      <line x1="130" y1="22" x2="170" y2="35" stroke={stackDepth > 1 ? '#a78bfa' : '#475569'} strokeWidth="2" />
      <line x1="50" y1="55" x2="35" y2="68" stroke={stackDepth > 1 ? '#a78bfa' : '#475569'} strokeWidth="1.5" />
      <line x1="70" y1="55" x2="85" y2="68" stroke={stackDepth > 2 ? '#a78bfa' : '#475569'} strokeWidth="1.5" />
      <line x1="170" y1="55" x2="155" y2="68" stroke={stackDepth > 2 ? '#a78bfa' : '#475569'} strokeWidth="1.5" />
      <line x1="190" y1="55" x2="205" y2="68" stroke={stackDepth > 2 ? '#a78bfa' : '#475569'} strokeWidth="1.5" />
      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = node.level < stackDepth;
        const isCurrent = node.level === stackDepth - 1;
        return (
          <g key={node.id} className={isCurrent ? 'animate-pulse' : ''}>
            <rect
              x={node.x - 22} y={node.y} width="44" height="20" rx="4"
              fill={isActive ? (isCurrent ? '#8b5cf6' : '#6d28d9') : '#334155'}
              filter={isCurrent ? 'url(#glowPurple)' : 'none'}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x={node.x} y={node.y + 14} fontSize="10" fill="white" textAnchor="middle">{node.label}</text>
          </g>
        );
      })}
      <text x="120" y="105" fontSize="8" fill="#94a3b8" textAnchor="middle">Binary branching: O(2^n) calls</text>
    </svg>
  );
};

const DivideConquerDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs><filter id="glowGreen"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    {/* Divide phase */}
    <rect x={70} y={5} width={100} height={18} rx="3" fill={stackDepth >= 1 ? '#10b981' : '#334155'} filter={stackDepth === 1 ? 'url(#glowGreen)' : 'none'} className={stackDepth === 1 ? 'animate-pulse' : ''} />
    <text x={120} y={17} fontSize="9" fill="white" textAnchor="middle">[1,3,5,7,9,11]</text>
    <line x1={95} y1={23} x2={60} y2={35} stroke={stackDepth >= 2 ? '#34d399' : '#475569'} strokeWidth="1.5" />
    <line x1={145} y1={23} x2={180} y2={35} stroke={stackDepth >= 2 ? '#34d399' : '#475569'} strokeWidth="1.5" />
    <text x={120} y={32} fontSize="7" fill={stackDepth >= 2 ? '#6ee7b7' : '#64748b'}>divide</text>
    <rect x={20} y={38} width={70} height={16} rx="3" fill={stackDepth >= 2 ? '#10b981' : '#334155'} opacity={stackDepth >= 2 ? 0.9 : 0.5} filter={stackDepth === 2 ? 'url(#glowGreen)' : 'none'} />
    <text x={55} y={49} fontSize="8" fill="white" textAnchor="middle">[1,3,5]</text>
    <rect x={150} y={38} width={70} height={16} rx="3" fill={stackDepth >= 2 ? '#10b981' : '#334155'} opacity={stackDepth >= 2 ? 0.9 : 0.5} />
    <text x={185} y={49} fontSize="8" fill="white" textAnchor="middle">[7,9,11]</text>
    {/* Merge phase */}
    <path d="M55 58 L55 68 Q55 73 60 73 L115 73" stroke={stackDepth >= 3 ? '#34d399' : '#475569'} strokeWidth="1.5" fill="none" strokeDasharray={stackDepth >= 3 ? '0' : '3'} />
    <path d="M185 58 L185 68 Q185 73 180 73 L125 73" stroke={stackDepth >= 3 ? '#34d399' : '#475569'} strokeWidth="1.5" fill="none" strokeDasharray={stackDepth >= 3 ? '0' : '3'} />
    <text x={120} y={68} fontSize="7" fill={stackDepth >= 3 ? '#6ee7b7' : '#64748b'}>merge</text>
    <rect x={60} y={80} width={120} height={18} rx="3" fill={stackDepth >= 3 ? '#059669' : '#334155'} filter={stackDepth >= 3 ? 'url(#glowGreen)' : 'none'} className={stackDepth >= 3 ? 'animate-pulse' : ''} />
    <text x={120} y={92} fontSize="9" fill="white" textAnchor="middle">[1,3,5,7,9,11] sorted</text>
  </svg>
);

const BacktrackingDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs>
      <filter id="glowAmber"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="backArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
    </defs>
    <circle cx={120} cy={15} r={12} fill={stackDepth >= 1 ? '#f59e0b' : '#334155'} filter={stackDepth === 1 ? 'url(#glowAmber)' : 'none'} className={stackDepth === 1 ? 'animate-pulse' : ''} />
    <text x={120} y={19} fontSize="9" fill="white" textAnchor="middle">[]</text>
    <line x1={108} y1={25} x2={60} y2={42} stroke={stackDepth >= 2 ? '#fbbf24' : '#475569'} strokeWidth="1.5" />
    <line x1={120} y1={27} x2={120} y2={42} stroke={stackDepth >= 2 ? '#fbbf24' : '#475569'} strokeWidth="1.5" />
    <line x1={132} y1={25} x2={180} y2={42} stroke={stackDepth >= 2 ? '#fbbf24' : '#475569'} strokeWidth="1.5" />
    {[[60, '[1]'], [120, '[2]'], [180, '[3]']].map(([x, label], i) => (
      <g key={i}>
        <circle cx={x} cy={52} r={11} fill={stackDepth >= 2 ? '#f59e0b' : '#334155'} opacity={stackDepth >= 2 ? 0.9 : 0.5} />
        <text x={x} y={56} fontSize="8" fill="white" textAnchor="middle">{label}</text>
      </g>
    ))}
    <line x1={52} y1={62} x2={35} y2={78} stroke={stackDepth >= 3 ? '#fbbf24' : '#475569'} strokeWidth="1.5" />
    <line x1={68} y1={62} x2={85} y2={78} stroke={stackDepth >= 3 ? '#fbbf24' : '#475569'} strokeWidth="1.5" />
    {[[35, '[1,2]'], [85, '[1,3]']].map(([x, label], i) => (
      <g key={i}>
        <circle cx={x} cy={88} r={10} fill={stackDepth >= 3 ? '#f59e0b' : '#334155'} opacity={stackDepth >= 3 ? 0.8 : 0.4} />
        <text x={x} y={91} fontSize="7" fill="white" textAnchor="middle">{label}</text>
      </g>
    ))}
    {stackDepth >= 3 && <path d="M42 80 Q60 68 78 80" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeDasharray="3" markerEnd="url(#backArrow)" />}
    <text x={180} y={95} fontSize="8" fill="#fbbf24">← backtrack</text>
  </svg>
);

const SubsetsDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs><filter id="glowPink"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <circle cx={120} cy={12} r={10} fill={stackDepth >= 1 ? '#ec4899' : '#334155'} filter={stackDepth === 1 ? 'url(#glowPink)' : 'none'} />
    <text x={120} y={16} fontSize="8" fill="white" textAnchor="middle">{'{}'}</text>
    <line x1={110} y1={22} x2={70} y2={38} stroke={stackDepth >= 2 ? '#f472b6' : '#475569'} strokeWidth="1.5" />
    <line x1={130} y1={22} x2={170} y2={38} stroke={stackDepth >= 2 ? '#f472b6' : '#475569'} strokeWidth="1.5" />
    <text x={85} y={30} fontSize="7" fill={stackDepth >= 2 ? '#f9a8d4' : '#64748b'}>+1</text>
    <text x={155} y={30} fontSize="7" fill={stackDepth >= 2 ? '#f9a8d4' : '#64748b'}>skip</text>
    <circle cx={70} cy={48} r={10} fill={stackDepth >= 2 ? '#ec4899' : '#334155'} opacity={0.9} />
    <text x={70} y={52} fontSize="7" fill="white" textAnchor="middle">{'{1}'}</text>
    <circle cx={170} cy={48} r={10} fill={stackDepth >= 2 ? '#ec4899' : '#334155'} opacity={0.9} />
    <text x={170} y={52} fontSize="7" fill="white" textAnchor="middle">{'{}'}</text>
    <line x1={60} y1={58} x2={40} y2={74} stroke={stackDepth >= 3 ? '#f472b6' : '#475569'} strokeWidth="1" />
    <line x1={80} y1={58} x2={100} y2={74} stroke={stackDepth >= 3 ? '#f472b6' : '#475569'} strokeWidth="1" />
    <line x1={160} y1={58} x2={140} y2={74} stroke={stackDepth >= 3 ? '#f472b6' : '#475569'} strokeWidth="1" />
    <line x1={180} y1={58} x2={200} y2={74} stroke={stackDepth >= 3 ? '#f472b6' : '#475569'} strokeWidth="1" />
    {[[40, '{1,2}'], [100, '{1}'], [140, '{2}'], [200, '{}']].map(([x, label], i) => (
      <g key={i}><circle cx={x} cy={84} r={9} fill={stackDepth >= 3 ? '#ec4899' : '#334155'} opacity={0.7} /><text x={x} y={87} fontSize="6" fill="white" textAnchor="middle">{label}</text></g>
    ))}
    <rect x={30} y={98} width={180} height={10} rx="2" fill="#831843" opacity={0.6} />
    <text x={120} y={106} fontSize="7" fill="#f9a8d4" textAnchor="middle">Include or exclude each element → 2^n subsets</text>
  </svg>
);

const MemoDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs><filter id="glowIndigo"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <rect x={95} y={5} width={50} height={18} rx="3" fill={stackDepth >= 1 ? '#6366f1' : '#334155'} filter={stackDepth === 1 ? 'url(#glowIndigo)' : 'none'} />
    <text x={120} y={17} fontSize="9" fill="white" textAnchor="middle">f(5)</text>
    <line x1={100} y1={23} x2={65} y2={38} stroke={stackDepth >= 2 ? '#818cf8' : '#475569'} strokeWidth="1.5" />
    <line x1={140} y1={23} x2={175} y2={38} stroke={stackDepth >= 2 ? '#818cf8' : '#475569'} strokeWidth="1.5" />
    <rect x={40} y={40} width={45} height={16} rx="3" fill={stackDepth >= 2 ? '#6366f1' : '#334155'} opacity={0.9} />
    <text x={62} y={51} fontSize="8" fill="white" textAnchor="middle">f(4)</text>
    <rect x={155} y={40} width={45} height={16} rx="3" fill={stackDepth >= 2 ? '#22c55e' : '#334155'} stroke={stackDepth >= 2 ? '#4ade80' : 'none'} strokeWidth="2" />
    <text x={177} y={51} fontSize="8" fill="white" textAnchor="middle">f(3)✓</text>
    <line x1={45} y1={56} x2={30} y2={71} stroke={stackDepth >= 3 ? '#818cf8' : '#475569'} strokeWidth="1.5" />
    <line x1={80} y1={56} x2={95} y2={71} stroke={stackDepth >= 3 ? '#818cf8' : '#475569'} strokeWidth="1.5" />
    <rect x={10} y={73} width={40} height={14} rx="3" fill={stackDepth >= 3 ? '#22c55e' : '#334155'} stroke={stackDepth >= 3 ? '#4ade80' : 'none'} strokeWidth="2" />
    <text x={30} y={83} fontSize="7" fill="white" textAnchor="middle">f(3)✓</text>
    <rect x={80} y={73} width={40} height={14} rx="3" fill={stackDepth >= 3 ? '#6366f1' : '#334155'} opacity={0.8} />
    <text x={100} y={83} fontSize="7" fill="white" textAnchor="middle">f(2)</text>
    {/* Memo cache */}
    <rect x={150} y={70} width={80} height={28} rx="3" fill="#1e1b4b" stroke="#4338ca" />
    <text x={190} y={82} fontSize="7" fill="#a5b4fc" textAnchor="middle">memo cache</text>
    <text x={190} y={93} fontSize="7" fill="#22c55e" textAnchor="middle">{stackDepth >= 2 ? 'f(3)=2, f(2)=1' : 'empty'}</text>
    {stackDepth >= 3 && <path d="M50 80 Q70 100 150 85" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeDasharray="4" />}
  </svg>
);

const TreeDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs><filter id="glowCyan"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <circle cx={120} cy={18} r={14} fill={stackDepth >= 1 ? '#0ea5e9' : '#334155'} filter={stackDepth === 1 ? 'url(#glowCyan)' : 'none'} className={stackDepth === 1 ? 'animate-pulse' : ''} />
    <text x={120} y={22} fontSize="10" fill="white" textAnchor="middle">4</text>
    <line x1={106} y1={30} x2={70} y2={50} stroke={stackDepth >= 2 ? '#38bdf8' : '#475569'} strokeWidth="2" />
    <line x1={134} y1={30} x2={170} y2={50} stroke={stackDepth >= 2 ? '#38bdf8' : '#475569'} strokeWidth="2" />
    <circle cx={70} cy={60} r={12} fill={stackDepth >= 2 ? '#0ea5e9' : '#334155'} opacity={0.9} filter={stackDepth === 2 ? 'url(#glowCyan)' : 'none'} />
    <text x={70} y={64} fontSize="9" fill="white" textAnchor="middle">2</text>
    <circle cx={170} cy={60} r={12} fill={stackDepth >= 2 ? '#0ea5e9' : '#334155'} opacity={0.9} />
    <text x={170} y={64} fontSize="9" fill="white" textAnchor="middle">6</text>
    <line x1={60} y1={70} x2={40} y2={85} stroke={stackDepth >= 3 ? '#38bdf8' : '#475569'} strokeWidth="1.5" />
    <line x1={80} y1={70} x2={100} y2={85} stroke={stackDepth >= 3 ? '#38bdf8' : '#475569'} strokeWidth="1.5" />
    <line x1={160} y1={70} x2={140} y2={85} stroke={stackDepth >= 3 ? '#38bdf8' : '#475569'} strokeWidth="1.5" />
    <line x1={180} y1={70} x2={200} y2={85} stroke={stackDepth >= 3 ? '#38bdf8' : '#475569'} strokeWidth="1.5" />
    {[[40, '1'], [100, '3'], [140, '5'], [200, '7']].map(([x, label], i) => (
      <g key={i}><circle cx={x} cy={95} r={10} fill={stackDepth >= 3 ? '#0ea5e9' : '#334155'} opacity={0.7} /><text x={x} y={99} fontSize="8" fill="white" textAnchor="middle">{label}</text></g>
    ))}
  </svg>
);

const TailDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 100" className="w-full h-28">
    <defs><marker id="tailArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2dd4bf" /></marker></defs>
    <text x={120} y={15} fontSize="9" fill="#5eead4" textAnchor="middle">No stack buildup - constant space O(1)!</text>
    {[0, 1, 2, 3, 4].map((i) => {
      const isActive = i < stackDepth;
      const isCurrent = i === stackDepth - 1;
      const accValues = [1, 5, 20, 60, 120];
      return (
        <g key={i}>
          <rect
            x={15 + i * 45} y={30} width={42} height={28} rx="4"
            fill={isActive ? (isCurrent ? '#14b8a6' : '#0d9488') : '#334155'}
            opacity={isCurrent ? 1 : 0.8}
            className={isCurrent ? 'animate-pulse' : ''}
            style={{ transition: 'all 0.3s ease' }}
          />
          <text x={36 + i * 45} y={42} fontSize="8" fill="white" textAnchor="middle">f({5-i})</text>
          <text x={36 + i * 45} y={53} fontSize="7" fill="#5eead4" textAnchor="middle">acc={accValues[i]}</text>
          {i < 4 && <path d={`M${57 + i * 45} 44 L${60 + i * 45} 44`} stroke={isActive ? '#2dd4bf' : '#475569'} strokeWidth="2" markerEnd="url(#tailArrow)" />}
        </g>
      );
    })}
    <rect x={70} y={70} width={100} height={22} rx="4" fill={stackDepth >= 5 ? '#059669' : '#1e293b'} className={stackDepth >= 5 ? 'animate-pulse' : ''} />
    <text x={120} y={84} fontSize="9" fill="white" textAnchor="middle">{stackDepth >= 5 ? 'return 120' : 'waiting...'}</text>
  </svg>
);

const GridDiagram = ({ stackDepth = 0 }) => {
  const pathProgress = Math.min(stackDepth, 5);
  const pathPoints = [[0,0], [1,0], [2,0], [2,1], [2,2]];
  return (
    <svg viewBox="0 0 240 110" className="w-full h-32">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const idx = pathPoints.findIndex(([c, r]) => c === col && r === row);
          const isOnPath = idx !== -1 && idx < pathProgress;
          const isCurrent = idx === pathProgress - 1;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={70 + col * 35} y={10 + row * 32} width={32} height={30} rx="4"
                fill={isOnPath ? (isCurrent ? '#22c55e' : '#16a34a') : '#334155'}
                className={isCurrent ? 'animate-pulse' : ''}
                style={{ transition: 'fill 0.3s ease' }}
              />
              {row === 0 && col === 0 && <text x={86} y={30} fontSize="10" fill="white" textAnchor="middle">S</text>}
              {row === 2 && col === 2 && <text x={156} y={94} fontSize="10" fill="white" textAnchor="middle">E</text>}
            </g>
          );
        })
      )}
      {/* Path line */}
      {pathProgress > 1 && (
        <path
          d={`M86 25 ${pathProgress > 1 ? 'L121 25' : ''} ${pathProgress > 2 ? 'L156 25' : ''} ${pathProgress > 3 ? 'L156 57' : ''} ${pathProgress > 4 ? 'L156 89' : ''}`}
          stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      )}
      <circle cx={86 + (pathProgress > 0 ? Math.min(pathProgress - 1, 2) * 35 : 0)} cy={25 + (pathProgress > 3 ? (pathProgress - 3) * 32 : 0)} r={5} fill="#86efac" className="animate-pulse" />
      <text x={195} y={35} fontSize="8" fill="#94a3b8">Try all paths</text>
      <text x={195} y={50} fontSize="8" fill="#94a3b8">Backtrack on</text>
      <text x={195} y={65} fontSize="8" fill="#94a3b8">dead ends</text>
    </svg>
  );
};

const MultiBranchDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs><filter id="glowOrange"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <circle cx={120} cy={15} r={12} fill={stackDepth >= 1 ? '#f97316' : '#334155'} filter={stackDepth === 1 ? 'url(#glowOrange)' : 'none'} />
    <text x={120} y={19} fontSize="9" fill="white" textAnchor="middle">"23"</text>
    <line x1={108} y1={25} x2={50} y2={48} stroke={stackDepth >= 2 ? '#fb923c' : '#475569'} strokeWidth="1.5" />
    <line x1={120} y1={27} x2={120} y2={48} stroke={stackDepth >= 2 ? '#fb923c' : '#475569'} strokeWidth="1.5" />
    <line x1={132} y1={25} x2={190} y2={48} stroke={stackDepth >= 2 ? '#fb923c' : '#475569'} strokeWidth="1.5" />
    <text x={75} y={38} fontSize="8" fill="#fdba74">a</text>
    <text x={128} y={38} fontSize="8" fill="#fdba74">b</text>
    <text x={165} y={38} fontSize="8" fill="#fdba74">c</text>
    {[[50, '"a"'], [120, '"b"'], [190, '"c"']].map(([x, label], i) => (
      <g key={i}><circle cx={x} cy={58} r={11} fill={stackDepth >= 2 ? '#f97316' : '#334155'} opacity={0.9} /><text x={x} y={62} fontSize="8" fill="white" textAnchor="middle">{label}</text></g>
    ))}
    <line x1={40} y1={68} x2={20} y2={85} stroke={stackDepth >= 3 ? '#fb923c' : '#475569'} strokeWidth="1" />
    <line x1={50} y1={69} x2={50} y2={85} stroke={stackDepth >= 3 ? '#fb923c' : '#475569'} strokeWidth="1" />
    <line x1={60} y1={68} x2={80} y2={85} stroke={stackDepth >= 3 ? '#fb923c' : '#475569'} strokeWidth="1" />
    {[[20, '"ad"'], [50, '"ae"'], [80, '"af"']].map(([x, label], i) => (
      <g key={i}><circle cx={x} cy={95} r={9} fill={stackDepth >= 3 ? '#f97316' : '#334155'} opacity={0.7} /><text x={x} y={98} fontSize="6" fill="white" textAnchor="middle">{label}</text></g>
    ))}
    <text x={170} y={95} fontSize="8" fill="#94a3b8">k branches per digit</text>
  </svg>
);

const MutualDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs>
      <marker id="mutualArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" /></marker>
      <marker id="mutualArrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f472b6" /></marker>
    </defs>
    <rect x={30} y={30} width={70} height={35} rx="6" fill={stackDepth % 2 === 1 ? '#8b5cf6' : '#334155'} className={stackDepth % 2 === 1 ? 'animate-pulse' : ''} />
    <text x={65} y={45} fontSize="10" fill="white" textAnchor="middle">isEven(n)</text>
    <text x={65} y={57} fontSize="8" fill="#c4b5fd" textAnchor="middle">n == 0?</text>
    <rect x={140} y={30} width={70} height={35} rx="6" fill={stackDepth % 2 === 0 && stackDepth > 0 ? '#ec4899' : '#334155'} className={stackDepth % 2 === 0 && stackDepth > 0 ? 'animate-pulse' : ''} />
    <text x={175} y={45} fontSize="10" fill="white" textAnchor="middle">isOdd(n)</text>
    <text x={175} y={57} fontSize="8" fill="#f9a8d4" textAnchor="middle">n == 0?</text>
    <path d="M100 40 Q120 22 140 40" stroke={stackDepth >= 1 ? '#a78bfa' : '#475569'} strokeWidth="2" fill="none" markerEnd="url(#mutualArrow)" />
    <path d="M140 55 Q120 73 100 55" stroke={stackDepth >= 2 ? '#f472b6' : '#475569'} strokeWidth="2" fill="none" markerEnd="url(#mutualArrow2)" />
    <text x={120} y={18} fontSize="8" fill="#a78bfa">isOdd(n-1)</text>
    <text x={120} y={82} fontSize="8" fill="#f472b6">isEven(n-1)</text>
    <rect x={50} y={92} width={140} height={14} rx="3" fill="#1e1b4b" />
    <text x={120} y={102} fontSize="8" fill="#e9d5ff" textAnchor="middle">isEven(4) → isOdd(3) → isEven(2)...</text>
  </svg>
);

const NestedDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 100" className="w-full h-28">
    <rect x={20} y={25} width={200} height={50} rx="8" fill="#0f172a" stroke={stackDepth >= 1 ? '#60a5fa' : '#475569'} strokeWidth="2" className={stackDepth === 1 ? 'animate-pulse' : ''} />
    <rect x={35} y={35} width={150} height={30} rx="6" fill="#1e293b" stroke={stackDepth >= 2 ? '#818cf8' : '#64748b'} strokeWidth="2" className={stackDepth === 2 ? 'animate-pulse' : ''} />
    <rect x={50} y={43} width={100} height={14} rx="4" fill="#334155" stroke={stackDepth >= 3 ? '#a78bfa' : '#94a3b8'} strokeWidth="2" className={stackDepth === 3 ? 'animate-pulse' : ''} />
    <text x={100} y={54} fontSize="9" fill="#e2e8f0" textAnchor="middle">f(f(f(n)))</text>
    <text x={205} y={45} fontSize="8" fill="#64748b">outer</text>
    <text x={175} y={53} fontSize="7" fill="#94a3b8">mid</text>
    <text x={160} y={53} fontSize="6" fill="#c4b5fd">inner</text>
    <text x={120} y={92} fontSize="9" fill="#94a3b8" textAnchor="middle">M(99) → M(M(100)) → M(M(M(101)))...</text>
  </svg>
);

const BSTDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <defs><marker id="bstArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" /></marker></defs>
    <rect x={65} y={5} width={110} height={16} rx="3" fill="#1e293b" stroke="#475569" />
    <text x={120} y={16} fontSize="8" fill="#94a3b8" textAnchor="middle">[1, 2, 3, 4, 5, 6, 7]</text>
    <path d="M120 21 L120 32" stroke={stackDepth >= 1 ? '#22c55e' : '#475569'} strokeWidth="2" markerEnd="url(#bstArrow)" />
    <circle cx={120} cy={42} r={12} fill={stackDepth >= 1 ? '#22c55e' : '#334155'} className={stackDepth === 1 ? 'animate-pulse' : ''} />
    <text x={120} y={46} fontSize="10" fill="white" textAnchor="middle">4</text>
    <line x1={108} y1={52} x2={75} y2={68} stroke={stackDepth >= 2 ? '#4ade80' : '#475569'} strokeWidth="1.5" />
    <line x1={132} y1={52} x2={165} y2={68} stroke={stackDepth >= 2 ? '#4ade80' : '#475569'} strokeWidth="1.5" />
    <text x={85} y={60} fontSize="7" fill={stackDepth >= 2 ? '#86efac' : '#64748b'}>[1,2,3]</text>
    <text x={155} y={60} fontSize="7" fill={stackDepth >= 2 ? '#86efac' : '#64748b'}>[5,6,7]</text>
    <circle cx={75} cy={78} r={10} fill={stackDepth >= 2 ? '#22c55e' : '#334155'} opacity={0.9} className={stackDepth === 2 ? 'animate-pulse' : ''} />
    <text x={75} y={82} fontSize="9" fill="white" textAnchor="middle">2</text>
    <circle cx={165} cy={78} r={10} fill={stackDepth >= 2 ? '#22c55e' : '#334155'} opacity={0.9} />
    <text x={165} y={82} fontSize="9" fill="white" textAnchor="middle">6</text>
    <line x1={67} y1={86} x2={50} y2={98} stroke={stackDepth >= 3 ? '#4ade80' : '#475569'} strokeWidth="1" />
    <line x1={83} y1={86} x2={100} y2={98} stroke={stackDepth >= 3 ? '#4ade80' : '#475569'} strokeWidth="1" />
    <line x1={157} y1={86} x2={140} y2={98} stroke={stackDepth >= 3 ? '#4ade80' : '#475569'} strokeWidth="1" />
    <line x1={173} y1={86} x2={190} y2={98} stroke={stackDepth >= 3 ? '#4ade80' : '#475569'} strokeWidth="1" />
    {[[50, '1'], [100, '3'], [140, '5'], [190, '7']].map(([x, l]) => (
      <g key={x}><circle cx={x} cy={105} r={7} fill={stackDepth >= 3 ? '#22c55e' : '#334155'} opacity={0.7} /><text x={x} y={108} fontSize="7" fill="white" textAnchor="middle">{l}</text></g>
    ))}
  </svg>
);

const PartitionDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 110" className="w-full h-32">
    <rect x={80} y={5} width={80} height={18} rx="3" fill={stackDepth >= 1 ? '#a855f7' : '#334155'} className={stackDepth === 1 ? 'animate-pulse' : ''} />
    <text x={120} y={17} fontSize="10" fill="white" textAnchor="middle">"aab"</text>
    <line x1={95} y1={23} x2={50} y2={40} stroke={stackDepth >= 2 ? '#c084fc' : '#475569'} strokeWidth="1.5" />
    <line x1={120} y1={23} x2={120} y2={40} stroke={stackDepth >= 2 ? '#c084fc' : '#475569'} strokeWidth="1.5" />
    <line x1={145} y1={23} x2={190} y2={40} stroke={stackDepth >= 2 ? '#c084fc' : '#475569'} strokeWidth="1.5" />
    <text x={68} y={33} fontSize="7" fill="#d8b4fe">"a"</text>
    <text x={128} y={33} fontSize="7" fill="#d8b4fe">"aa"</text>
    <text x={172} y={33} fontSize="7" fill="#d8b4fe">"aab"</text>
    <rect x={25} y={43} width={50} height={16} rx="3" fill={stackDepth >= 2 ? '#a855f7' : '#334155'} opacity={0.9} />
    <text x={50} y={54} fontSize="8" fill="white" textAnchor="middle">"ab"</text>
    <rect x={95} y={43} width={50} height={16} rx="3" fill={stackDepth >= 2 ? '#a855f7' : '#334155'} opacity={0.9} />
    <text x={120} y={54} fontSize="8" fill="white" textAnchor="middle">"b"</text>
    <rect x={165} y={43} width={50} height={16} rx="3" fill={stackDepth >= 2 ? '#ef4444' : '#334155'} opacity={0.6} />
    <text x={190} y={54} fontSize="8" fill="#fca5a5" textAnchor="middle">""✓</text>
    <line x1={35} y1={59} x2={25} y2={75} stroke={stackDepth >= 3 ? '#c084fc' : '#475569'} strokeWidth="1" />
    <line x1={65} y1={59} x2={75} y2={75} stroke="#ef4444" strokeWidth="1" strokeDasharray="3" />
    <rect x={10} y={78} width={35} height={14} rx="2" fill={stackDepth >= 3 ? '#a855f7' : '#334155'} opacity={0.7} />
    <text x={27} y={88} fontSize="7" fill="white" textAnchor="middle">"b"</text>
    <text x={75} y={88} fontSize="7" fill="#ef4444">✗ not palindrome</text>
    <rect x={60} y={98} width={120} height={12} rx="2" fill="#581c87" />
    <text x={120} y={107} fontSize="7" fill="#e9d5ff" textAnchor="middle">Result: ["a","a","b"], ["aa","b"]</text>
  </svg>
);

const LinkedListDiagram = ({ stackDepth = 0 }) => (
  <svg viewBox="0 0 240 100" className="w-full h-28">
    <defs>
      <marker id="llArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" /></marker>
      <marker id="llArrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f472b6" /></marker>
    </defs>
    <text x={120} y={12} fontSize="9" fill="#94a3b8" textAnchor="middle">Original: 1 → 2 → 3 → 4 → 5</text>
    {[0, 1, 2, 3, 4].map((i) => {
      const isProcessed = i < stackDepth;
      const isCurrent = i === stackDepth - 1;
      return (
        <g key={i}>
          <rect x={20 + i * 44} y={20} width={36} height={22} rx="4" fill={isProcessed ? (isCurrent ? '#06b6d4' : '#0891b2') : '#334155'} className={isCurrent ? 'animate-pulse' : ''} />
          <text x={38 + i * 44} y={35} fontSize="10" fill="white" textAnchor="middle">{i + 1}</text>
          {i < 4 && <path d={`M${56 + i * 44} 31 L${64 + i * 44} 31`} stroke={isProcessed ? '#22d3ee' : '#475569'} strokeWidth="2" markerEnd="url(#llArrow)" />}
        </g>
      );
    })}
    <path d="M120 46 L120 54" stroke="#f472b6" strokeWidth="2" markerEnd="url(#llArrow2)" />
    <text x={140} y={52} fontSize="8" fill="#f9a8d4">reverse</text>
    <text x={120} y={70} fontSize="9" fill="#94a3b8" textAnchor="middle">Reversed: 5 → 4 → 3 → 2 → 1</text>
    {[0, 1, 2, 3, 4].map((i) => {
      const showReversed = stackDepth > 4 - i;
      return (
        <g key={i}>
          <rect x={20 + i * 44} y={75} width={36} height={22} rx="4" fill={showReversed ? '#ec4899' : '#334155'} opacity={showReversed ? 1 : 0.5} />
          <text x={38 + i * 44} y={90} fontSize="10" fill="white" textAnchor="middle">{5 - i}</text>
          {i < 4 && <path d={`M${56 + i * 44} 86 L${64 + i * 44} 86`} stroke={showReversed ? '#f472b6' : '#475569'} strokeWidth="2" markerEnd="url(#llArrow2)" />}
        </g>
      );
    })}
  </svg>
);

const patterns = [
  {
    id: 'linear',
    name: 'Linear Recursion',
    diagram: LinearDiagram,
    description: 'The simplest form of recursion where each call makes exactly one recursive call. The problem is reduced by a constant amount each time until reaching the base case.',
    keyPoints: [
      'Single recursive call per function invocation',
      'Problem size reduces by constant amount (usually 1)',
      'Stack depth equals input size',
      'Common in: factorial, array sum, string operations'
    ],
    leetcodeProblems: [
      { id: 344, name: 'Reverse String', difficulty: 'Easy', url: 'https://leetcode.com/problems/reverse-string/' },
      { id: 206, name: 'Reverse Linked List', difficulty: 'Easy', url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { id: 234, name: 'Palindrome Linked List', difficulty: 'Easy', url: 'https://leetcode.com/problems/palindrome-linked-list/' },
      { id: 509, name: 'Fibonacci Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/fibonacci-number/' },
      { id: 1290, name: 'Convert Binary Number in a Linked List to Integer', difficulty: 'Easy', url: 'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/' },
      { id: 231, name: 'Power of Two', difficulty: 'Easy', url: 'https://leetcode.com/problems/power-of-two/' },
    ],
    code: `def factorial(n):
    # Base case: stop recursion
    if n <= 1:
        return 1

    # Recursive case: n * factorial of (n-1)
    return n * factorial(n - 1)`,
    input: 5,
    inputLabel: 'Calculate factorial of:',
    execute: (n) => {
      const steps = [];
      const callStack = [];

      const simulate = (n, depth) => {
        const frame = { func: 'factorial', args: { n }, depth, id: callStack.length };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call factorial(${n})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          line: 'def factorial(n):'
        });

        if (n <= 1) {
          steps.push({
            action: 'base',
            message: `Base case: n=${n} <= 1, return 1`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: 1 },
            line: 'return 1'
          });
          callStack.pop();
          return 1;
        }

        steps.push({
          action: 'recurse',
          message: `n=${n} > 1, need factorial(${n-1})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          line: 'return n * factorial(n - 1)'
        });

        const result = simulate(n - 1, depth + 1);
        const returnVal = n * result;

        steps.push({
          action: 'return',
          message: `factorial(${n}) = ${n} * ${result} = ${returnVal}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'factorial(n-1)': result, returnValue: returnVal },
          line: 'return n * factorial(n - 1)'
        });

        callStack.pop();
        return returnVal;
      };

      const finalResult = simulate(n, 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'two-branch',
    name: 'Two-Branch Recursion',
    diagram: TwoBranchDiagram,
    description: 'Each call spawns exactly two recursive calls. Creates a binary tree of calls. Classic example is Fibonacci where f(n) = f(n-1) + f(n-2).',
    keyPoints: [
      'Two recursive calls per invocation',
      'Creates exponential time complexity O(2^n) without memoization',
      'Forms a binary call tree',
      'Common in: Fibonacci, climbing stairs, binary decisions'
    ],
    leetcodeProblems: [
      { id: 70, name: 'Climbing Stairs', difficulty: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 509, name: 'Fibonacci Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/fibonacci-number/' },
      { id: 1137, name: 'N-th Tribonacci Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/n-th-tribonacci-number/' },
      { id: 894, name: 'All Possible Full Binary Trees', difficulty: 'Medium', url: 'https://leetcode.com/problems/all-possible-full-binary-trees/' },
      { id: 776, name: 'Split BST', difficulty: 'Medium', url: 'https://leetcode.com/problems/split-bst/' },
    ],
    code: `def fibonacci(n):
    # Base cases
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # Two branches: sum of two previous
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    input: 5,
    inputLabel: 'Calculate Fibonacci of:',
    execute: (n) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const simulate = (n, depth) => {
        const frame = { func: 'fibonacci', args: { n }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call fibonacci(${n})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          line: 'def fibonacci(n):'
        });

        if (n <= 0) {
          steps.push({
            action: 'base',
            message: `Base case: n=${n} <= 0, return 0`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: 0 },
            line: 'return 0'
          });
          callStack.pop();
          return 0;
        }

        if (n === 1) {
          steps.push({
            action: 'base',
            message: `Base case: n=1, return 1`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: 1 },
            line: 'return 1'
          });
          callStack.pop();
          return 1;
        }

        steps.push({
          action: 'recurse',
          message: `Need fibonacci(${n-1}) + fibonacci(${n-2})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          line: 'return fibonacci(n - 1) + fibonacci(n - 2)'
        });

        const left = simulate(n - 1, depth + 1);

        steps.push({
          action: 'partial',
          message: `Got fibonacci(${n-1}) = ${left}, now computing fibonacci(${n-2})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'fib(n-1)': left },
          line: 'return fibonacci(n - 1) + fibonacci(n - 2)'
        });

        const right = simulate(n - 2, depth + 1);
        const result = left + right;

        steps.push({
          action: 'return',
          message: `fibonacci(${n}) = ${left} + ${right} = ${result}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'fib(n-1)': left, 'fib(n-2)': right, returnValue: result },
          line: 'return fibonacci(n - 1) + fibonacci(n - 2)'
        });

        callStack.pop();
        return result;
      };

      const finalResult = simulate(n, 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'divide-conquer',
    name: 'Divide and Conquer',
    diagram: DivideConquerDiagram,
    description: 'Split the problem into smaller subproblems, solve each recursively, then combine the results. The key insight is that subproblems are independent and can be solved separately.',
    keyPoints: [
      'Divide: Split problem into smaller subproblems',
      'Conquer: Solve subproblems recursively',
      'Combine: Merge solutions into final answer',
      'Common in: Merge sort, quick sort, binary search'
    ],
    leetcodeProblems: [
      { id: 704, name: 'Binary Search', difficulty: 'Easy', url: 'https://leetcode.com/problems/binary-search/' },
      { id: 912, name: 'Sort an Array (Merge Sort)', difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-an-array/' },
      { id: 148, name: 'Sort List', difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-list/' },
      { id: 23, name: 'Merge k Sorted Lists', difficulty: 'Hard', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { id: 4, name: 'Median of Two Sorted Arrays', difficulty: 'Hard', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
      { id: 215, name: 'Kth Largest Element (Quick Select)', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { id: 53, name: 'Maximum Subarray', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-subarray/' },
      { id: 169, name: 'Majority Element', difficulty: 'Easy', url: 'https://leetcode.com/problems/majority-element/' },
    ],
    code: `def binary_search(arr, target, lo, hi):
    # Base case: element not found
    if lo > hi:
        return -1

    # Divide: find middle
    mid = (lo + hi) // 2

    # Conquer: search appropriate half
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, lo, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, hi)`,
    input: { arr: [1, 3, 5, 7, 9, 11, 13, 15], target: 7 },
    inputLabel: 'Search for 7 in [1,3,5,7,9,11,13,15]:',
    execute: (input) => {
      const { arr, target } = input;
      const steps = [];
      const callStack = [];

      const simulate = (lo, hi, depth) => {
        const mid = Math.floor((lo + hi) / 2);
        const frame = { func: 'binary_search', args: { lo, hi, target }, depth, id: callStack.length };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call binary_search(lo=${lo}, hi=${hi})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { lo, hi, target },
          array: arr,
          highlight: { lo, hi, mid: lo <= hi ? mid : -1 },
          line: 'def binary_search(arr, target, lo, hi):'
        });

        if (lo > hi) {
          steps.push({
            action: 'base',
            message: `Base case: lo(${lo}) > hi(${hi}), not found`,
            stack: callStack.map(f => ({ ...f })),
            vars: { lo, hi, returnValue: -1 },
            array: arr,
            highlight: { lo, hi, mid: -1 },
            line: 'return -1'
          });
          callStack.pop();
          return -1;
        }

        steps.push({
          action: 'compute',
          message: `mid = (${lo} + ${hi}) // 2 = ${mid}, arr[${mid}] = ${arr[mid]}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { lo, hi, mid, 'arr[mid]': arr[mid], target },
          array: arr,
          highlight: { lo, hi, mid },
          line: 'mid = (lo + hi) // 2'
        });

        if (arr[mid] === target) {
          steps.push({
            action: 'return',
            message: `Found! arr[${mid}] = ${target}, return ${mid}`,
            stack: callStack.map(f => ({ ...f })),
            vars: { lo, hi, mid, returnValue: mid },
            array: arr,
            highlight: { lo, hi, mid, found: true },
            line: 'return mid'
          });
          callStack.pop();
          return mid;
        }

        if (arr[mid] > target) {
          steps.push({
            action: 'decide',
            message: `arr[${mid}]=${arr[mid]} > target=${target}, search left [${lo}..${mid-1}]`,
            stack: callStack.map(f => ({ ...f })),
            vars: { lo, hi, mid, 'arr[mid]': arr[mid], target, direction: 'left' },
            array: arr,
            highlight: { lo, hi: mid - 1, mid, direction: 'left' },
            line: 'return binary_search(arr, target, lo, mid - 1)'
          });
          const result = simulate(lo, mid - 1, depth + 1);
          callStack.pop();
          return result;
        }

        steps.push({
          action: 'decide',
          message: `arr[${mid}]=${arr[mid]} < target=${target}, search right [${mid+1}..${hi}]`,
          stack: callStack.map(f => ({ ...f })),
          vars: { lo, hi, mid, 'arr[mid]': arr[mid], target, direction: 'right' },
          array: arr,
          highlight: { lo: mid + 1, hi, mid, direction: 'right' },
          line: 'return binary_search(arr, target, mid + 1, hi)'
        });
        const result = simulate(mid + 1, hi, depth + 1);
        callStack.pop();
        return result;
      };

      const finalResult = simulate(0, arr.length - 1, 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    diagram: BacktrackingDiagram,
    description: 'Build solutions incrementally, abandoning paths ("backtracking") when they cannot lead to valid solutions. The key is to explore all possibilities systematically while pruning invalid branches early.',
    keyPoints: [
      'Build candidate solutions incrementally',
      'Check constraints at each step',
      'Backtrack (undo) when path is invalid',
      'Common in: Permutations, N-Queens, Sudoku, maze solving'
    ],
    leetcodeProblems: [
      { id: 46, name: 'Permutations', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/' },
      { id: 47, name: 'Permutations II', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations-ii/' },
      { id: 51, name: 'N-Queens', difficulty: 'Hard', url: 'https://leetcode.com/problems/n-queens/' },
      { id: 37, name: 'Sudoku Solver', difficulty: 'Hard', url: 'https://leetcode.com/problems/sudoku-solver/' },
      { id: 39, name: 'Combination Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/' },
      { id: 40, name: 'Combination Sum II', difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum-ii/' },
      { id: 77, name: 'Combinations', difficulty: 'Medium', url: 'https://leetcode.com/problems/combinations/' },
      { id: 79, name: 'Word Search', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/' },
      { id: 22, name: 'Generate Parentheses', difficulty: 'Medium', url: 'https://leetcode.com/problems/generate-parentheses/' },
      { id: 93, name: 'Restore IP Addresses', difficulty: 'Medium', url: 'https://leetcode.com/problems/restore-ip-addresses/' },
    ],
    code: `def permute(nums, path, used, result):
    # Base case: complete permutation
    if len(path) == len(nums):
        result.append(path[:])
        return

    # Try each unused number
    for i in range(len(nums)):
        if used[i]:
            continue  # Skip used

        used[i] = True          # Choose
        path.append(nums[i])

        permute(nums, path, used, result)  # Explore

        path.pop()              # Backtrack
        used[i] = False`,
    input: [1, 2, 3],
    inputLabel: 'Generate permutations of [1, 2, 3]:',
    execute: (nums) => {
      const steps = [];
      const result = [];
      const callStack = [];
      let callId = 0;

      const simulate = (path, used, depth) => {
        const frame = { func: 'permute', args: { path: [...path], depth }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call permute with path=[${path.join(', ') || ''}]`,
          stack: callStack.map(f => ({ ...f })),
          vars: { path: [...path], used: [...used] },
          currentPath: [...path],
          line: 'def permute(nums, path, used, result):'
        });

        if (path.length === nums.length) {
          result.push([...path]);
          steps.push({
            action: 'base',
            message: `Complete! Found permutation [${path.join(', ')}]`,
            stack: callStack.map(f => ({ ...f })),
            vars: { path: [...path], complete: true },
            currentPath: [...path],
            results: result.map(r => [...r]),
            line: 'result.append(path[:])'
          });
          callStack.pop();
          return;
        }

        for (let i = 0; i < nums.length; i++) {
          if (used[i]) {
            steps.push({
              action: 'skip',
              message: `Skip nums[${i}]=${nums[i]} (already used)`,
              stack: callStack.map(f => ({ ...f })),
              vars: { i, 'nums[i]': nums[i], used: [...used] },
              currentPath: [...path],
              line: 'if used[i]: continue'
            });
            continue;
          }

          steps.push({
            action: 'choose',
            message: `Choose nums[${i}]=${nums[i]}, path becomes [${[...path, nums[i]].join(', ')}]`,
            stack: callStack.map(f => ({ ...f })),
            vars: { i, 'nums[i]': nums[i], path: [...path, nums[i]] },
            currentPath: [...path, nums[i]],
            line: 'used[i] = True; path.append(nums[i])'
          });

          used[i] = true;
          path.push(nums[i]);

          simulate(path, used, depth + 1);

          path.pop();
          used[i] = false;

          steps.push({
            action: 'backtrack',
            message: `Backtrack: remove ${nums[i]}, path=[${path.join(', ') || ''}]`,
            stack: callStack.map(f => ({ ...f })),
            vars: { i, removed: nums[i], path: [...path], used: [...used] },
            currentPath: [...path],
            line: 'path.pop(); used[i] = False'
          });
        }

        callStack.pop();
      };

      simulate([], new Array(nums.length).fill(false), 0);
      return { steps, result };
    }
  },
  {
    id: 'include-exclude',
    name: 'Include/Exclude (Subsets)',
    diagram: SubsetsDiagram,
    description: 'At each element, make a binary choice: include it or exclude it. This generates all possible subsets of a collection. The decision tree has 2^n leaves for n elements.',
    keyPoints: [
      'Binary decision at each element',
      'Include current element OR exclude it',
      'Generates 2^n subsets for n elements',
      'Common in: Subset sum, power set, knapsack variants'
    ],
    leetcodeProblems: [
      { id: 78, name: 'Subsets', difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/' },
      { id: 90, name: 'Subsets II', difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets-ii/' },
      { id: 416, name: 'Partition Equal Subset Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
      { id: 494, name: 'Target Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/target-sum/' },
      { id: 698, name: 'Partition to K Equal Sum Subsets', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/' },
      { id: 1239, name: 'Maximum Length of a Concatenated String with Unique Characters', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/' },
      { id: 2597, name: 'The Number of Beautiful Subsets', difficulty: 'Medium', url: 'https://leetcode.com/problems/the-number-of-beautiful-subsets/' },
    ],
    code: `def subsets(nums, idx, current, result):
    # Base case: processed all elements
    if idx == len(nums):
        result.append(current[:])
        return

    # Exclude current element
    subsets(nums, idx + 1, current, result)

    # Include current element
    current.append(nums[idx])
    subsets(nums, idx + 1, current, result)
    current.pop()  # Backtrack`,
    input: [1, 2, 3],
    inputLabel: 'Generate all subsets of [1, 2, 3]:',
    execute: (nums) => {
      const steps = [];
      const result = [];
      const callStack = [];
      let callId = 0;

      const simulate = (idx, current, depth) => {
        const frame = { func: 'subsets', args: { idx, current: [...current] }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call subsets(idx=${idx}, current=[${current.join(', ') || ''}])`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, 'nums[idx]': nums[idx], current: [...current] },
          currentSubset: [...current],
          line: 'def subsets(nums, idx, current, result):'
        });

        if (idx === nums.length) {
          result.push([...current]);
          steps.push({
            action: 'base',
            message: `Reached end, save subset [${current.join(', ') || ''}]`,
            stack: callStack.map(f => ({ ...f })),
            vars: { idx, current: [...current], complete: true },
            currentSubset: [...current],
            results: result.map(r => [...r]),
            line: 'result.append(current[:])'
          });
          callStack.pop();
          return;
        }

        steps.push({
          action: 'exclude',
          message: `EXCLUDE ${nums[idx]}: keep current=[${current.join(', ') || ''}]`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, excluding: nums[idx], current: [...current] },
          currentSubset: [...current],
          line: 'subsets(nums, idx + 1, current, result)  # exclude'
        });
        simulate(idx + 1, current, depth + 1);

        current.push(nums[idx]);
        steps.push({
          action: 'include',
          message: `INCLUDE ${nums[idx]}: current=[${current.join(', ')}]`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, including: nums[idx], current: [...current] },
          currentSubset: [...current],
          line: 'current.append(nums[idx])'
        });
        simulate(idx + 1, current, depth + 1);

        current.pop();
        steps.push({
          action: 'backtrack',
          message: `Backtrack: remove ${nums[idx]}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, removed: nums[idx], current: [...current] },
          currentSubset: [...current],
          line: 'current.pop()'
        });

        callStack.pop();
      };

      simulate(0, [], 0);
      return { steps, result };
    }
  },
  {
    id: 'memoization',
    name: 'Memoization',
    diagram: MemoDiagram,
    description: 'Cache results of expensive recursive calls to avoid redundant computation. When subproblems overlap, memoization transforms exponential time into polynomial time.',
    keyPoints: [
      'Store computed results in a cache (memo)',
      'Check cache before computing',
      'Eliminates redundant subproblem computation',
      'Bridges recursion to dynamic programming'
    ],
    leetcodeProblems: [
      { id: 70, name: 'Climbing Stairs', difficulty: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 198, name: 'House Robber', difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber/' },
      { id: 213, name: 'House Robber II', difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber-ii/' },
      { id: 322, name: 'Coin Change', difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/' },
      { id: 518, name: 'Coin Change II', difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change-ii/' },
      { id: 139, name: 'Word Break', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-break/' },
      { id: 377, name: 'Combination Sum IV', difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum-iv/' },
      { id: 1143, name: 'Longest Common Subsequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { id: 72, name: 'Edit Distance', difficulty: 'Medium', url: 'https://leetcode.com/problems/edit-distance/' },
      { id: 10, name: 'Regular Expression Matching', difficulty: 'Hard', url: 'https://leetcode.com/problems/regular-expression-matching/' },
    ],
    code: `def fib_memo(n, memo=None):
    if memo is None:
        memo = {}

    # Check cache first
    if n in memo:
        return memo[n]

    # Base cases
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # Compute and cache
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]`,
    input: 7,
    inputLabel: 'Calculate Fibonacci with memoization:',
    execute: (n) => {
      const steps = [];
      const memo = {};
      const callStack = [];
      let callId = 0;

      const simulate = (n, depth) => {
        const frame = { func: 'fib_memo', args: { n }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call fib_memo(${n})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          memo: { ...memo },
          line: 'def fib_memo(n, memo):'
        });

        if (n in memo) {
          steps.push({
            action: 'cache-hit',
            message: `Cache HIT! memo[${n}] = ${memo[n]}`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: memo[n], cached: true },
            memo: { ...memo },
            line: 'if n in memo: return memo[n]'
          });
          callStack.pop();
          return memo[n];
        }

        if (n <= 0) {
          steps.push({
            action: 'base',
            message: `Base case: n=${n} <= 0, return 0`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: 0 },
            memo: { ...memo },
            line: 'return 0'
          });
          callStack.pop();
          return 0;
        }

        if (n === 1) {
          steps.push({
            action: 'base',
            message: `Base case: n=1, return 1`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: 1 },
            memo: { ...memo },
            line: 'return 1'
          });
          callStack.pop();
          return 1;
        }

        steps.push({
          action: 'recurse',
          message: `Cache miss, computing fib(${n-1}) + fib(${n-2})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          memo: { ...memo },
          line: 'memo[n] = fib_memo(n-1) + fib_memo(n-2)'
        });

        const left = simulate(n - 1, depth + 1);
        const right = simulate(n - 2, depth + 1);
        memo[n] = left + right;

        steps.push({
          action: 'cache-store',
          message: `Store memo[${n}] = ${left} + ${right} = ${memo[n]}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'fib(n-1)': left, 'fib(n-2)': right, returnValue: memo[n] },
          memo: { ...memo },
          line: 'memo[n] = fib_memo(n-1) + fib_memo(n-2)'
        });

        callStack.pop();
        return memo[n];
      };

      const finalResult = simulate(n, 0);
      return { steps, result: finalResult, memo };
    }
  },
  {
    id: 'tree-traversal',
    name: 'Tree Traversal',
    diagram: TreeDiagram,
    description: 'Visit every node in a tree structure by recursively processing the current node and its children. The order of processing (pre/in/post) determines when the node is visited relative to its children.',
    keyPoints: [
      'Process current node',
      'Recursively visit left subtree',
      'Recursively visit right subtree',
      'Order determines traversal type: pre/in/post-order'
    ],
    leetcodeProblems: [
      { id: 104, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { id: 111, name: 'Minimum Depth of Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/' },
      { id: 226, name: 'Invert Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/invert-binary-tree/' },
      { id: 100, name: 'Same Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/same-tree/' },
      { id: 101, name: 'Symmetric Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/symmetric-tree/' },
      { id: 112, name: 'Path Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/path-sum/' },
      { id: 113, name: 'Path Sum II', difficulty: 'Medium', url: 'https://leetcode.com/problems/path-sum-ii/' },
      { id: 236, name: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
      { id: 543, name: 'Diameter of Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
      { id: 124, name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
    ],
    code: `def max_depth(node):
    # Base case: empty tree
    if node is None:
        return 0

    # Recurse on children
    left_depth = max_depth(node.left)
    right_depth = max_depth(node.right)

    # Combine: 1 + max of children
    return 1 + max(left_depth, right_depth)`,
    input: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } },
    inputLabel: 'Find max depth of tree:',
    execute: (root) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const simulate = (node, path, depth) => {
        const nodeStr = node ? `node(${node.val})` : 'None';
        const frame = { func: 'max_depth', args: { node: nodeStr }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call max_depth(${nodeStr})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { node: nodeStr, path: path || 'root' },
          tree: root,
          currentNode: node?.val,
          line: 'def max_depth(node):'
        });

        if (node === null) {
          steps.push({
            action: 'base',
            message: `Base case: node is None, return 0`,
            stack: callStack.map(f => ({ ...f })),
            vars: { node: 'None', returnValue: 0 },
            tree: root,
            currentNode: null,
            line: 'return 0'
          });
          callStack.pop();
          return 0;
        }

        steps.push({
          action: 'recurse',
          message: `Processing node ${node.val}, going left first`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'node.val': node.val },
          tree: root,
          currentNode: node.val,
          line: 'left_depth = max_depth(node.left)'
        });

        const leftDepth = simulate(node.left, path + '.left', depth + 1);

        steps.push({
          action: 'partial',
          message: `Node ${node.val}: left_depth=${leftDepth}, now going right`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'node.val': node.val, left_depth: leftDepth },
          tree: root,
          currentNode: node.val,
          line: 'right_depth = max_depth(node.right)'
        });

        const rightDepth = simulate(node.right, path + '.right', depth + 1);
        const result = 1 + Math.max(leftDepth, rightDepth);

        steps.push({
          action: 'return',
          message: `Node ${node.val}: 1 + max(${leftDepth}, ${rightDepth}) = ${result}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'node.val': node.val, left_depth: leftDepth, right_depth: rightDepth, returnValue: result },
          tree: root,
          currentNode: node.val,
          line: 'return 1 + max(left_depth, right_depth)'
        });

        callStack.pop();
        return result;
      };

      const finalResult = simulate(root, '', 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'accumulator',
    name: 'Accumulator Pattern',
    diagram: TailDiagram,
    description: 'Pass accumulated results down through recursive calls rather than building up on return. This keeps intermediate state in parameters rather than relying on the call stack.',
    keyPoints: [
      'Pass accumulator as parameter',
      'Build result during descent, not ascent',
      'Enables tail recursion optimization',
      'Common in: List building, sum with running total'
    ],
    leetcodeProblems: [
      { id: 129, name: 'Sum Root to Leaf Numbers', difficulty: 'Medium', url: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/' },
      { id: 257, name: 'Binary Tree Paths', difficulty: 'Easy', url: 'https://leetcode.com/problems/binary-tree-paths/' },
      { id: 112, name: 'Path Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/path-sum/' },
      { id: 113, name: 'Path Sum II', difficulty: 'Medium', url: 'https://leetcode.com/problems/path-sum-ii/' },
      { id: 437, name: 'Path Sum III', difficulty: 'Medium', url: 'https://leetcode.com/problems/path-sum-iii/' },
      { id: 988, name: 'Smallest String Starting From Leaf', difficulty: 'Medium', url: 'https://leetcode.com/problems/smallest-string-starting-from-leaf/' },
    ],
    code: `def reverse_string(s, idx, acc):
    # Base case: processed all characters
    if idx < 0:
        return acc

    # Add current char to accumulator
    return reverse_string(s, idx - 1, acc + s[idx])

# Usage: reverse_string("hello", 4, "")`,
    input: 'hello',
    inputLabel: 'Reverse the string:',
    execute: (s) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const simulate = (idx, acc, depth) => {
        const frame = { func: 'reverse_string', args: { idx, acc: `"${acc}"` }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call reverse_string(idx=${idx}, acc="${acc}")`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, 's[idx]': s[idx], acc },
          original: s,
          accumulated: acc,
          currentIdx: idx,
          line: 'def reverse_string(s, idx, acc):'
        });

        if (idx < 0) {
          steps.push({
            action: 'base',
            message: `Base case: idx < 0, return "${acc}"`,
            stack: callStack.map(f => ({ ...f })),
            vars: { idx, returnValue: acc },
            original: s,
            accumulated: acc,
            line: 'return acc'
          });
          callStack.pop();
          return acc;
        }

        const newAcc = acc + s[idx];
        steps.push({
          action: 'accumulate',
          message: `Add s[${idx}]='${s[idx]}' to acc: "${acc}" -> "${newAcc}"`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, 's[idx]': s[idx], acc, newAcc },
          original: s,
          accumulated: newAcc,
          currentIdx: idx,
          line: 'return reverse_string(s, idx - 1, acc + s[idx])'
        });

        const result = simulate(idx - 1, newAcc, depth + 1);
        callStack.pop();
        return result;
      };

      const finalResult = simulate(s.length - 1, '', 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'tail-recursion',
    name: 'Tail Recursion',
    diagram: TailDiagram,
    description: 'The recursive call is the very last operation in the function. Some compilers optimize this into iteration, preventing stack overflow for deep recursion.',
    keyPoints: [
      'Recursive call is the final operation',
      'No work done after recursive call returns',
      'Can be optimized to iteration (TCO)',
      'Prevents stack overflow in optimizing compilers'
    ],
    leetcodeProblems: [
      { id: 509, name: 'Fibonacci Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/fibonacci-number/' },
      { id: 70, name: 'Climbing Stairs', difficulty: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 50, name: 'Pow(x, n)', difficulty: 'Medium', url: 'https://leetcode.com/problems/powx-n/' },
      { id: 779, name: 'K-th Symbol in Grammar', difficulty: 'Medium', url: 'https://leetcode.com/problems/k-th-symbol-in-grammar/' },
      { id: 1922, name: 'Count Good Numbers', difficulty: 'Medium', url: 'https://leetcode.com/problems/count-good-numbers/' },
    ],
    code: `def factorial_tail(n, accumulator=1):
    # Base case: return accumulated result
    if n <= 1:
        return accumulator

    # Tail call: nothing happens after this
    return factorial_tail(n - 1, n * accumulator)`,
    input: 5,
    inputLabel: 'Calculate factorial (tail recursive):',
    execute: (n) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const simulate = (n, acc, depth) => {
        const frame = { func: 'factorial_tail', args: { n, accumulator: acc }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call factorial_tail(n=${n}, accumulator=${acc})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, accumulator: acc },
          line: 'def factorial_tail(n, accumulator=1):'
        });

        if (n <= 1) {
          steps.push({
            action: 'base',
            message: `Base case: n <= 1, return accumulator=${acc}`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, accumulator: acc, returnValue: acc },
            line: 'return accumulator'
          });
          callStack.pop();
          return acc;
        }

        const newAcc = n * acc;
        steps.push({
          action: 'tail-call',
          message: `Tail call: factorial_tail(${n-1}, ${n} * ${acc} = ${newAcc})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, accumulator: acc, 'n * acc': newAcc, 'next_n': n - 1 },
          line: 'return factorial_tail(n - 1, n * accumulator)'
        });

        const result = simulate(n - 1, newAcc, depth + 1);
        callStack.pop();
        return result;
      };

      const finalResult = simulate(n, 1, 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'grid-traversal',
    name: 'Grid/Path Traversal',
    diagram: GridDiagram,
    description: 'Explore all paths in a 2D grid by recursively moving in valid directions. Often combined with backtracking to mark and unmark visited cells.',
    keyPoints: [
      'Explore 4 (or 8) directions from each cell',
      'Check boundaries and validity',
      'Mark visited to avoid cycles',
      'Backtrack by unmarking when returning'
    ],
    leetcodeProblems: [
      { id: 200, name: 'Number of Islands', difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/' },
      { id: 695, name: 'Max Area of Island', difficulty: 'Medium', url: 'https://leetcode.com/problems/max-area-of-island/' },
      { id: 79, name: 'Word Search', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/' },
      { id: 212, name: 'Word Search II', difficulty: 'Hard', url: 'https://leetcode.com/problems/word-search-ii/' },
      { id: 733, name: 'Flood Fill', difficulty: 'Easy', url: 'https://leetcode.com/problems/flood-fill/' },
      { id: 130, name: 'Surrounded Regions', difficulty: 'Medium', url: 'https://leetcode.com/problems/surrounded-regions/' },
      { id: 417, name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { id: 62, name: 'Unique Paths', difficulty: 'Medium', url: 'https://leetcode.com/problems/unique-paths/' },
      { id: 63, name: 'Unique Paths II', difficulty: 'Medium', url: 'https://leetcode.com/problems/unique-paths-ii/' },
      { id: 980, name: 'Unique Paths III', difficulty: 'Hard', url: 'https://leetcode.com/problems/unique-paths-iii/' },
    ],
    code: `def count_paths(grid, r, c, end_r, end_c):
    # Out of bounds or blocked
    if (r < 0 or r >= len(grid) or
        c < 0 or c >= len(grid[0]) or
        grid[r][c] == 1):
        return 0

    # Reached destination
    if r == end_r and c == end_c:
        return 1

    # Mark visited
    grid[r][c] = 1

    # Explore all 4 directions
    paths = (count_paths(grid, r+1, c, end_r, end_c) +
             count_paths(grid, r-1, c, end_r, end_c) +
             count_paths(grid, r, c+1, end_r, end_c) +
             count_paths(grid, r, c-1, end_r, end_c))

    # Backtrack
    grid[r][c] = 0
    return paths`,
    input: { grid: [[0,0,0],[0,1,0],[0,0,0]], start: [0,0], end: [2,2] },
    inputLabel: 'Count paths from (0,0) to (2,2):',
    execute: (input) => {
      const steps = [];
      const grid = input.grid.map(row => [...row]);
      const [endR, endC] = input.end;
      let pathCount = 0;
      const callStack = [];
      let callId = 0;

      const simulate = (r, c, path, depth) => {
        const frame = { func: 'count_paths', args: { r, c }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call count_paths(r=${r}, c=${c})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { r, c },
          grid: grid.map(row => [...row]),
          path: [...path],
          current: [r, c],
          line: 'def count_paths(grid, r, c, end_r, end_c):'
        });

        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
          steps.push({
            action: 'boundary',
            message: `Out of bounds at (${r}, ${c}), return 0`,
            stack: callStack.map(f => ({ ...f })),
            vars: { r, c, returnValue: 0 },
            grid: grid.map(row => [...row]),
            path: [...path],
            line: 'return 0  # out of bounds'
          });
          callStack.pop();
          return 0;
        }

        if (grid[r][c] === 1) {
          steps.push({
            action: 'blocked',
            message: `Cell (${r}, ${c}) is blocked/visited, return 0`,
            stack: callStack.map(f => ({ ...f })),
            vars: { r, c, 'grid[r][c]': 1, returnValue: 0 },
            grid: grid.map(row => [...row]),
            path: [...path],
            blocked: [r, c],
            line: 'return 0  # blocked'
          });
          callStack.pop();
          return 0;
        }

        if (r === endR && c === endC) {
          pathCount++;
          steps.push({
            action: 'found',
            message: `Reached destination! Path #${pathCount} found`,
            stack: callStack.map(f => ({ ...f })),
            vars: { r, c, returnValue: 1, pathNumber: pathCount },
            grid: grid.map(row => [...row]),
            path: [...path, [r, c]],
            current: [r, c],
            line: 'return 1  # reached destination'
          });
          callStack.pop();
          return 1;
        }

        steps.push({
          action: 'mark',
          message: `Mark (${r}, ${c}) as visited`,
          stack: callStack.map(f => ({ ...f })),
          vars: { r, c },
          grid: grid.map(row => [...row]),
          path: [...path, [r, c]],
          current: [r, c],
          line: 'grid[r][c] = 1  # mark visited'
        });

        grid[r][c] = 1;
        const newPath = [...path, [r, c]];

        const directions = [[1, 0, 'down'], [-1, 0, 'up'], [0, 1, 'right'], [0, -1, 'left']];
        let total = 0;

        for (const [dr, dc, dir] of directions) {
          steps.push({
            action: 'explore',
            message: `From (${r}, ${c}), try ${dir} -> (${r+dr}, ${c+dc})`,
            stack: callStack.map(f => ({ ...f })),
            vars: { r, c, direction: dir, 'next': `(${r+dr}, ${c+dc})` },
            grid: grid.map(row => [...row]),
            path: newPath,
            current: [r, c],
            trying: [r + dr, c + dc],
            line: `count_paths(grid, r${dr >= 0 ? '+' : ''}${dr}, c${dc >= 0 ? '+' : ''}${dc}, ...)`
          });
          total += simulate(r + dr, c + dc, newPath, depth + 1);
        }

        grid[r][c] = 0;
        steps.push({
          action: 'backtrack',
          message: `Backtrack: unmark (${r}, ${c}), found ${total} paths through here`,
          stack: callStack.map(f => ({ ...f })),
          vars: { r, c, totalPaths: total, returnValue: total },
          grid: grid.map(row => [...row]),
          path: path,
          backtrackFrom: [r, c],
          line: 'grid[r][c] = 0  # backtrack'
        });

        callStack.pop();
        return total;
      };

      const finalResult = simulate(input.start[0], input.start[1], [], 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'multi-branch',
    name: 'Multi-Branch (K-ary)',
    diagram: MultiBranchDiagram,
    description: 'Each call spawns multiple (more than two) recursive calls. The number of branches can be fixed or depend on the input. Common in combinatorial problems where you try multiple options at each step.',
    keyPoints: [
      'More than two recursive calls per invocation',
      'Number of branches often equals number of choices',
      'Creates K-ary call tree',
      'Common in: Phone letter combinations, word break, combinations'
    ],
    leetcodeProblems: [
      { id: 17, name: 'Letter Combinations of a Phone Number', difficulty: 'Medium', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
      { id: 22, name: 'Generate Parentheses', difficulty: 'Medium', url: 'https://leetcode.com/problems/generate-parentheses/' },
      { id: 39, name: 'Combination Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/' },
      { id: 77, name: 'Combinations', difficulty: 'Medium', url: 'https://leetcode.com/problems/combinations/' },
      { id: 784, name: 'Letter Case Permutation', difficulty: 'Medium', url: 'https://leetcode.com/problems/letter-case-permutation/' },
      { id: 797, name: 'All Paths From Source to Target', difficulty: 'Medium', url: 'https://leetcode.com/problems/all-paths-from-source-to-target/' },
      { id: 1079, name: 'Letter Tile Possibilities', difficulty: 'Medium', url: 'https://leetcode.com/problems/letter-tile-possibilities/' },
    ],
    code: `def letter_combinations(digits, idx, path, result):
    mapping = {'2': 'abc', '3': 'def', '4': 'ghi',
               '5': 'jkl', '6': 'mno', '7': 'pqrs',
               '8': 'tuv', '9': 'wxyz'}

    # Base case: processed all digits
    if idx == len(digits):
        if path:
            result.append(''.join(path))
        return

    # Try each letter for current digit
    for char in mapping[digits[idx]]:
        path.append(char)
        letter_combinations(digits, idx + 1, path, result)
        path.pop()  # Backtrack`,
    input: '23',
    inputLabel: 'Letter combinations for digits "23":',
    execute: (digits) => {
      const steps = [];
      const result = [];
      const callStack = [];
      let callId = 0;
      const mapping = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'};

      const simulate = (idx, path, depth) => {
        const frame = { func: 'letter_combinations', args: { idx, path: path.join('') }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call letter_combinations(idx=${idx}, path="${path.join('')}")`,
          stack: callStack.map(f => ({ ...f })),
          vars: { idx, digit: digits[idx], letters: mapping[digits[idx]], path: path.join('') },
          currentPath: [...path],
          line: 'def letter_combinations(digits, idx, path, result):'
        });

        if (idx === digits.length) {
          if (path.length > 0) {
            result.push(path.join(''));
            steps.push({
              action: 'base',
              message: `Complete! Found combination "${path.join('')}"`,
              stack: callStack.map(f => ({ ...f })),
              vars: { idx, path: path.join(''), complete: true },
              currentPath: [...path],
              results: [...result],
              line: 'result.append("".join(path))'
            });
          }
          callStack.pop();
          return;
        }

        const letters = mapping[digits[idx]];
        for (let i = 0; i < letters.length; i++) {
          const char = letters[i];
          steps.push({
            action: 'choose',
            message: `For digit '${digits[idx]}', try letter '${char}' (${i+1}/${letters.length})`,
            stack: callStack.map(f => ({ ...f })),
            vars: { idx, digit: digits[idx], choosing: char, branch: `${i+1}/${letters.length}` },
            currentPath: [...path, char],
            line: 'for char in mapping[digits[idx]]:'
          });

          path.push(char);
          simulate(idx + 1, path, depth + 1);
          path.pop();

          steps.push({
            action: 'backtrack',
            message: `Backtrack: remove '${char}', path="${path.join('')}"`,
            stack: callStack.map(f => ({ ...f })),
            vars: { idx, removed: char, path: path.join('') },
            currentPath: [...path],
            line: 'path.pop()'
          });
        }

        callStack.pop();
      };

      simulate(0, [], 0);
      return { steps, result };
    }
  },
  {
    id: 'mutual',
    name: 'Mutual/Indirect Recursion',
    diagram: MutualDiagram,
    description: 'Two or more functions call each other recursively. Function A calls function B, which calls function A. Often used for alternating logic or parsing grammars.',
    keyPoints: [
      'Function A calls Function B, B calls A',
      'Neither function calls itself directly',
      'Used for alternating conditions',
      'Common in: Parsers, isEven/isOdd, state machines'
    ],
    leetcodeProblems: [
      { id: 394, name: 'Decode String', difficulty: 'Medium', url: 'https://leetcode.com/problems/decode-string/' },
      { id: 726, name: 'Number of Atoms', difficulty: 'Hard', url: 'https://leetcode.com/problems/number-of-atoms/' },
      { id: 736, name: 'Parse Lisp Expression', difficulty: 'Hard', url: 'https://leetcode.com/problems/parse-lisp-expression/' },
      { id: 770, name: 'Basic Calculator IV', difficulty: 'Hard', url: 'https://leetcode.com/problems/basic-calculator-iv/' },
      { id: 224, name: 'Basic Calculator', difficulty: 'Hard', url: 'https://leetcode.com/problems/basic-calculator/' },
      { id: 772, name: 'Basic Calculator III', difficulty: 'Hard', url: 'https://leetcode.com/problems/basic-calculator-iii/' },
    ],
    code: `def is_even(n):
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False
    return is_even(n - 1)`,
    input: 5,
    inputLabel: 'Check if number is even:',
    execute: (n) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const isEven = (n, depth) => {
        const frame = { func: 'is_even', args: { n }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call is_even(${n})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, function: 'is_even' },
          line: 'def is_even(n):'
        });

        if (n === 0) {
          steps.push({
            action: 'base',
            message: `Base case: n=0, return True (0 is even)`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: true },
            line: 'return True'
          });
          callStack.pop();
          return true;
        }

        steps.push({
          action: 'mutual-call',
          message: `n!=0, call is_odd(${n-1}) to check if ${n} is even`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, calling: 'is_odd', with: n - 1 },
          line: 'return is_odd(n - 1)'
        });

        const result = isOdd(n - 1, depth + 1);

        steps.push({
          action: 'return',
          message: `is_even(${n}) = is_odd(${n-1}) = ${result}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'is_odd(n-1)': result, returnValue: result },
          line: 'return is_odd(n - 1)'
        });

        callStack.pop();
        return result;
      };

      const isOdd = (n, depth) => {
        const frame = { func: 'is_odd', args: { n }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call is_odd(${n})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, function: 'is_odd' },
          line: 'def is_odd(n):'
        });

        if (n === 0) {
          steps.push({
            action: 'base',
            message: `Base case: n=0, return False (0 is not odd)`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: false },
            line: 'return False'
          });
          callStack.pop();
          return false;
        }

        steps.push({
          action: 'mutual-call',
          message: `n!=0, call is_even(${n-1}) to check if ${n} is odd`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, calling: 'is_even', with: n - 1 },
          line: 'return is_even(n - 1)'
        });

        const result = isEven(n - 1, depth + 1);

        steps.push({
          action: 'return',
          message: `is_odd(${n}) = is_even(${n-1}) = ${result}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'is_even(n-1)': result, returnValue: result },
          line: 'return is_even(n - 1)'
        });

        callStack.pop();
        return result;
      };

      const finalResult = isEven(n, 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'nested',
    name: 'Nested Recursion',
    diagram: NestedDiagram,
    description: 'The argument to the recursive call is itself a recursive call. This creates deeply nested computation where inner calls must complete before outer calls can proceed.',
    keyPoints: [
      'Recursive call as argument to another recursive call',
      'Inner recursion must complete first',
      'Can grow very fast (Ackermann function)',
      'Common in: Ackermann, McCarthy 91 function'
    ],
    leetcodeProblems: [
      { id: 761, name: 'Special Binary String', difficulty: 'Hard', url: 'https://leetcode.com/problems/special-binary-string/' },
      { id: 1106, name: 'Parsing A Boolean Expression', difficulty: 'Hard', url: 'https://leetcode.com/problems/parsing-a-boolean-expression/' },
      { id: 439, name: 'Ternary Expression Parser', difficulty: 'Medium', url: 'https://leetcode.com/problems/ternary-expression-parser/' },
      { id: 385, name: 'Mini Parser', difficulty: 'Medium', url: 'https://leetcode.com/problems/mini-parser/' },
      { id: 341, name: 'Flatten Nested List Iterator', difficulty: 'Medium', url: 'https://leetcode.com/problems/flatten-nested-list-iterator/' },
    ],
    code: `def mccarthy91(n):
    # McCarthy 91 function - returns 91 for all n <= 100
    if n > 100:
        return n - 10

    # Nested recursion: argument is a recursive call
    return mccarthy91(mccarthy91(n + 11))`,
    input: 95,
    inputLabel: 'McCarthy 91 function for:',
    execute: (n) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const simulate = (n, depth) => {
        const frame = { func: 'mccarthy91', args: { n }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call mccarthy91(${n})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n },
          line: 'def mccarthy91(n):'
        });

        if (n > 100) {
          const result = n - 10;
          steps.push({
            action: 'base',
            message: `n=${n} > 100, return ${n} - 10 = ${result}`,
            stack: callStack.map(f => ({ ...f })),
            vars: { n, returnValue: result },
            line: 'return n - 10'
          });
          callStack.pop();
          return result;
        }

        steps.push({
          action: 'nested-outer',
          message: `n=${n} <= 100, need mccarthy91(mccarthy91(${n + 11}))`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, 'n + 11': n + 11 },
          line: 'return mccarthy91(mccarthy91(n + 11))'
        });

        steps.push({
          action: 'nested-inner',
          message: `First compute inner call: mccarthy91(${n + 11})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, computing: 'inner', argument: n + 11 },
          line: 'mccarthy91(n + 11)  # inner call'
        });

        const inner = simulate(n + 11, depth + 1);

        steps.push({
          action: 'nested-outer',
          message: `Inner returned ${inner}, now compute outer: mccarthy91(${inner})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, innerResult: inner, computing: 'outer' },
          line: 'mccarthy91(...)  # outer call with inner result'
        });

        const outer = simulate(inner, depth + 1);

        steps.push({
          action: 'return',
          message: `mccarthy91(${n}) = ${outer}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { n, returnValue: outer },
          line: 'return mccarthy91(mccarthy91(n + 11))'
        });

        callStack.pop();
        return outer;
      };

      const finalResult = simulate(n, 0);
      return { steps, result: finalResult };
    }
  },
  {
    id: 'tree-construction',
    name: 'Tree Construction',
    diagram: BSTDiagram,
    description: 'Recursively build a tree data structure from linear input like arrays. Each call constructs a node and recursively builds its children from subranges of the input.',
    keyPoints: [
      'Build tree nodes from array data',
      'Recursively construct left and right subtrees',
      'Use indices or slices to partition input',
      'Common in: Build BST from sorted array, construct from traversals'
    ],
    leetcodeProblems: [
      { id: 108, name: 'Convert Sorted Array to Binary Search Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/' },
      { id: 109, name: 'Convert Sorted List to Binary Search Tree', difficulty: 'Medium', url: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/' },
      { id: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
      { id: 106, name: 'Construct Binary Tree from Inorder and Postorder Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/' },
      { id: 889, name: 'Construct Binary Tree from Preorder and Postorder Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/' },
      { id: 1008, name: 'Construct Binary Search Tree from Preorder Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/' },
      { id: 654, name: 'Maximum Binary Tree', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-binary-tree/' },
      { id: 998, name: 'Maximum Binary Tree II', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-binary-tree-ii/' },
    ],
    code: `def sorted_array_to_bst(nums, left, right):
    # Base case: invalid range
    if left > right:
        return None

    # Find middle element as root
    mid = (left + right) // 2

    # Create node and build subtrees
    node = TreeNode(nums[mid])
    node.left = sorted_array_to_bst(nums, left, mid - 1)
    node.right = sorted_array_to_bst(nums, mid + 1, right)

    return node`,
    input: [-10, -3, 0, 5, 9],
    inputLabel: 'Build BST from sorted array:',
    execute: (nums) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      const simulate = (left, right, depth, position) => {
        const frame = { func: 'sorted_array_to_bst', args: { left, right }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call sorted_array_to_bst(left=${left}, right=${right})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { left, right, 'range': `[${nums.slice(left, right + 1).join(', ')}]` },
          array: nums,
          highlight: { lo: left, hi: right, mid: left <= right ? Math.floor((left + right) / 2) : -1 },
          position,
          line: 'def sorted_array_to_bst(nums, left, right):'
        });

        if (left > right) {
          steps.push({
            action: 'base',
            message: `left(${left}) > right(${right}), return None`,
            stack: callStack.map(f => ({ ...f })),
            vars: { left, right, returnValue: 'None' },
            array: nums,
            highlight: { lo: left, hi: right, mid: -1 },
            line: 'return None'
          });
          callStack.pop();
          return null;
        }

        const mid = Math.floor((left + right) / 2);
        const nodeVal = nums[mid];

        steps.push({
          action: 'create',
          message: `mid = ${mid}, create node with value ${nodeVal}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { left, right, mid, 'nums[mid]': nodeVal },
          array: nums,
          highlight: { lo: left, hi: right, mid, creating: true },
          line: 'node = TreeNode(nums[mid])'
        });

        const node = { val: nodeVal, left: null, right: null };

        steps.push({
          action: 'recurse',
          message: `Build left subtree from [${left}..${mid-1}]`,
          stack: callStack.map(f => ({ ...f })),
          vars: { left, right, mid, building: 'left subtree' },
          array: nums,
          highlight: { lo: left, hi: mid - 1, mid: -1, direction: 'left' },
          line: 'node.left = sorted_array_to_bst(nums, left, mid - 1)'
        });

        node.left = simulate(left, mid - 1, depth + 1, position + 'L');

        steps.push({
          action: 'recurse',
          message: `Build right subtree from [${mid+1}..${right}]`,
          stack: callStack.map(f => ({ ...f })),
          vars: { left, right, mid, building: 'right subtree' },
          array: nums,
          highlight: { lo: mid + 1, hi: right, mid: -1, direction: 'right' },
          line: 'node.right = sorted_array_to_bst(nums, mid + 1, right)'
        });

        node.right = simulate(mid + 1, right, depth + 1, position + 'R');

        steps.push({
          action: 'return',
          message: `Return node(${nodeVal}) with children`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'node.val': nodeVal, 'node.left': node.left?.val ?? 'None', 'node.right': node.right?.val ?? 'None', returnValue: `node(${nodeVal})` },
          array: nums,
          highlight: { lo: left, hi: right, mid },
          tree: node,
          line: 'return node'
        });

        callStack.pop();
        return node;
      };

      const tree = simulate(0, nums.length - 1, 0, '');
      return { steps, result: tree, tree };
    }
  },
  {
    id: 'exhaustive',
    name: 'Exhaustive Search (Generate All)',
    diagram: PartitionDiagram,
    description: 'Generate all valid configurations by trying every possible option at each decision point. Used when you need to find all solutions, not just one.',
    keyPoints: [
      'Explore every possible configuration',
      'Often uses constraints to prune invalid paths',
      'Generates all valid solutions',
      'Common in: Palindrome partitioning, word break, all paths'
    ],
    leetcodeProblems: [
      { id: 131, name: 'Palindrome Partitioning', difficulty: 'Medium', url: 'https://leetcode.com/problems/palindrome-partitioning/' },
      { id: 140, name: 'Word Break II', difficulty: 'Hard', url: 'https://leetcode.com/problems/word-break-ii/' },
      { id: 291, name: 'Word Pattern II', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-pattern-ii/' },
      { id: 282, name: 'Expression Add Operators', difficulty: 'Hard', url: 'https://leetcode.com/problems/expression-add-operators/' },
      { id: 301, name: 'Remove Invalid Parentheses', difficulty: 'Hard', url: 'https://leetcode.com/problems/remove-invalid-parentheses/' },
      { id: 241, name: 'Different Ways to Add Parentheses', difficulty: 'Medium', url: 'https://leetcode.com/problems/different-ways-to-add-parentheses/' },
      { id: 93, name: 'Restore IP Addresses', difficulty: 'Medium', url: 'https://leetcode.com/problems/restore-ip-addresses/' },
      { id: 842, name: 'Split Array into Fibonacci Sequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/split-array-into-fibonacci-sequence/' },
    ],
    code: `def partition_palindrome(s, start, path, result):
    # Base case: reached end of string
    if start == len(s):
        result.append(path[:])
        return

    # Try all possible substrings from start
    for end in range(start + 1, len(s) + 1):
        substring = s[start:end]
        if is_palindrome(substring):
            path.append(substring)
            partition_palindrome(s, end, path, result)
            path.pop()  # Backtrack`,
    input: 'aab',
    inputLabel: 'Find all palindrome partitions of "aab":',
    execute: (s) => {
      const steps = [];
      const result = [];
      const callStack = [];
      let callId = 0;

      const isPalindrome = (str) => str === str.split('').reverse().join('');

      const simulate = (start, path, depth) => {
        const frame = { func: 'partition_palindrome', args: { start, path: `[${path.join(', ')}]` }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call partition(start=${start}, path=[${path.join(', ')}])`,
          stack: callStack.map(f => ({ ...f })),
          vars: { start, remaining: s.slice(start), path: [...path] },
          string: s,
          partitionStart: start,
          currentPath: [...path],
          line: 'def partition_palindrome(s, start, path, result):'
        });

        if (start === s.length) {
          result.push([...path]);
          steps.push({
            action: 'base',
            message: `Reached end! Found partition: [${path.join(', ')}]`,
            stack: callStack.map(f => ({ ...f })),
            vars: { start, path: [...path], complete: true },
            string: s,
            currentPath: [...path],
            results: result.map(r => [...r]),
            line: 'result.append(path[:])'
          });
          callStack.pop();
          return;
        }

        for (let end = start + 1; end <= s.length; end++) {
          const substring = s.slice(start, end);
          const isPalin = isPalindrome(substring);

          steps.push({
            action: isPalin ? 'valid' : 'invalid',
            message: `Try "${substring}" (s[${start}:${end}]): ${isPalin ? 'palindrome' : 'not palindrome'}`,
            stack: callStack.map(f => ({ ...f })),
            vars: { start, end, substring, isPalindrome: isPalin },
            string: s,
            substringRange: { start, end },
            currentPath: [...path],
            line: 'if is_palindrome(substring):'
          });

          if (isPalin) {
            steps.push({
              action: 'choose',
              message: `Add "${substring}" to path: [${[...path, substring].join(', ')}]`,
              stack: callStack.map(f => ({ ...f })),
              vars: { adding: substring, newPath: [...path, substring] },
              string: s,
              currentPath: [...path, substring],
              line: 'path.append(substring)'
            });

            path.push(substring);
            simulate(end, path, depth + 1);
            path.pop();

            steps.push({
              action: 'backtrack',
              message: `Backtrack: remove "${substring}", path=[${path.join(', ')}]`,
              stack: callStack.map(f => ({ ...f })),
              vars: { removed: substring, path: [...path] },
              string: s,
              currentPath: [...path],
              line: 'path.pop()'
            });
          }
        }

        callStack.pop();
      };

      simulate(0, [], 0);
      return { steps, result };
    }
  },
  {
    id: 'linked-list',
    name: 'Data Structure Operations',
    diagram: LinkedListDiagram,
    description: 'Recursive operations on data structures like linked lists. Process the current element and recursively handle the rest. The structure of recursion mirrors the structure of the data.',
    keyPoints: [
      'Process current node/element',
      'Recurse on rest of structure (next pointer)',
      'Structure of recursion matches data structure',
      'Common in: Reverse list, merge lists, delete nodes'
    ],
    leetcodeProblems: [
      { id: 206, name: 'Reverse Linked List', difficulty: 'Easy', url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { id: 21, name: 'Merge Two Sorted Lists', difficulty: 'Easy', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { id: 24, name: 'Swap Nodes in Pairs', difficulty: 'Medium', url: 'https://leetcode.com/problems/swap-nodes-in-pairs/' },
      { id: 25, name: 'Reverse Nodes in k-Group', difficulty: 'Hard', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
      { id: 203, name: 'Remove Linked List Elements', difficulty: 'Easy', url: 'https://leetcode.com/problems/remove-linked-list-elements/' },
      { id: 234, name: 'Palindrome Linked List', difficulty: 'Easy', url: 'https://leetcode.com/problems/palindrome-linked-list/' },
      { id: 83, name: 'Remove Duplicates from Sorted List', difficulty: 'Easy', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/' },
      { id: 82, name: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/' },
      { id: 143, name: 'Reorder List', difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-list/' },
    ],
    code: `def reverse_list(head):
    # Base case: empty or single node
    if head is None or head.next is None:
        return head

    # Recurse to end of list
    new_head = reverse_list(head.next)

    # Reverse the link
    head.next.next = head
    head.next = None

    return new_head`,
    input: [1, 2, 3, 4, 5],
    inputLabel: 'Reverse linked list [1->2->3->4->5]:',
    execute: (arr) => {
      const steps = [];
      const callStack = [];
      let callId = 0;

      // Build linked list
      const buildList = (arr) => {
        if (arr.length === 0) return null;
        const head = { val: arr[0], next: null };
        let current = head;
        for (let i = 1; i < arr.length; i++) {
          current.next = { val: arr[i], next: null };
          current = current.next;
        }
        return head;
      };

      const listToArray = (head) => {
        const result = [];
        while (head) {
          result.push(head.val);
          head = head.next;
        }
        return result;
      };

      const simulate = (head, depth) => {
        const frame = { func: 'reverse_list', args: { head: head?.val ?? 'None' }, depth, id: callId++ };
        callStack.push(frame);

        steps.push({
          action: 'call',
          message: `Call reverse_list(head=${head?.val ?? 'None'})`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'head.val': head?.val ?? 'None', 'head.next': head?.next?.val ?? 'None' },
          list: listToArray(head),
          currentNode: head?.val,
          line: 'def reverse_list(head):'
        });

        if (head === null || head.next === null) {
          steps.push({
            action: 'base',
            message: `Base case: ${head === null ? 'empty list' : 'single node'}, return ${head?.val ?? 'None'}`,
            stack: callStack.map(f => ({ ...f })),
            vars: { 'head.val': head?.val ?? 'None', returnValue: head?.val ?? 'None' },
            list: head ? [head.val] : [],
            currentNode: head?.val,
            line: 'return head'
          });
          callStack.pop();
          return head;
        }

        steps.push({
          action: 'recurse',
          message: `Recurse on rest of list starting at ${head.next.val}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'head.val': head.val, 'head.next.val': head.next.val },
          list: listToArray(head),
          currentNode: head.val,
          line: 'new_head = reverse_list(head.next)'
        });

        const newHead = simulate(head.next, depth + 1);

        steps.push({
          action: 'reverse-link',
          message: `Got new_head=${newHead.val}. Now reverse: ${head.next.val}.next = ${head.val}`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'head.val': head.val, 'head.next.val': head.next.val, 'new_head.val': newHead.val },
          reversing: { from: head.next.val, to: head.val },
          line: 'head.next.next = head'
        });

        head.next.next = head;

        steps.push({
          action: 'nullify',
          message: `Set ${head.val}.next = None (will be set by caller or stays as tail)`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'head.val': head.val, 'head.next': 'None' },
          line: 'head.next = None'
        });

        head.next = null;

        steps.push({
          action: 'return',
          message: `Return new_head=${newHead.val} (the new front of reversed portion)`,
          stack: callStack.map(f => ({ ...f })),
          vars: { 'new_head.val': newHead.val, returnValue: newHead.val },
          list: listToArray(newHead),
          line: 'return new_head'
        });

        callStack.pop();
        return newHead;
      };

      const head = buildList(arr);
      const finalResult = simulate(head, 0);
      return { steps, result: listToArray(finalResult) };
    }
  }
];

const ActionBadge = ({ action }) => {
  const colors = {
    call: 'bg-blue-500',
    base: 'bg-emerald-500',
    return: 'bg-purple-500',
    recurse: 'bg-indigo-500',
    partial: 'bg-sky-500',
    'cache-hit': 'bg-amber-500',
    'cache-store': 'bg-orange-500',
    choose: 'bg-cyan-500',
    skip: 'bg-gray-500',
    backtrack: 'bg-rose-500',
    exclude: 'bg-slate-500',
    include: 'bg-teal-500',
    decide: 'bg-indigo-500',
    compute: 'bg-violet-500',
    'tail-call': 'bg-violet-500',
    accumulate: 'bg-cyan-500',
    mark: 'bg-blue-500',
    visit: 'bg-blue-500',
    boundary: 'bg-gray-500',
    blocked: 'bg-red-500',
    found: 'bg-green-500',
    explore: 'bg-cyan-500',
    'mutual-call': 'bg-pink-500',
    'nested-outer': 'bg-fuchsia-500',
    'nested-inner': 'bg-fuchsia-400',
    create: 'bg-green-500',
    valid: 'bg-emerald-500',
    invalid: 'bg-red-400',
    'reverse-link': 'bg-orange-500',
    nullify: 'bg-slate-500'
  };

  return (
    <span className={`${colors[action] || 'bg-gray-500'} text-white text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide`}>
      {action.replace('-', ' ')}
    </span>
  );
};

const CallStack = ({ stack }) => {
  if (!stack || stack.length === 0) {
    return (
      <div className="text-slate-500 text-sm italic">Stack is empty</div>
    );
  }

  return (
    <div className="space-y-1">
      {[...stack].reverse().map((frame, idx) => (
        <div
          key={frame.id}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            idx === 0
              ? 'bg-emerald-900/50 border border-emerald-700'
              : 'bg-slate-800/50 border border-slate-700'
          }`}
        >
          <span className={`text-xs font-bold w-5 h-5 rounded flex items-center justify-center ${
            idx === 0 ? 'bg-emerald-600' : 'bg-slate-600'
          }`}>
            {stack.length - idx - 1}
          </span>
          <code className="font-mono text-sm">
            <span className={idx === 0 ? 'text-emerald-400' : 'text-blue-400'}>{frame.func}</span>
            <span className="text-slate-400">(</span>
            <span className="text-amber-400">
              {Object.entries(frame.args).map(([k, v]) => `${k}=${typeof v === 'string' ? v : JSON.stringify(v)}`).join(', ')}
            </span>
            <span className="text-slate-400">)</span>
          </code>
          {idx === 0 && <span className="text-emerald-400 text-xs ml-auto">current</span>}
        </div>
      ))}
      <div className="text-center text-slate-600 text-xs mt-2 border-t border-slate-800 pt-2">
        --- bottom of stack ---
      </div>
    </div>
  );
};

const TreeVisualization = ({ tree, currentNode }) => {
  const renderNode = (node, x, y, level, side) => {
    if (!node) return null;

    const isActive = node.val === currentNode;
    const spacing = 50 / (level + 1);

    return (
      <g key={`${node.val}-${level}-${side}`}>
        {node.left && (
          <line x1={x} y1={y + 12} x2={x - spacing} y2={y + 35} stroke="#475569" strokeWidth="2" />
        )}
        {node.right && (
          <line x1={x} y1={y + 12} x2={x + spacing} y2={y + 35} stroke="#475569" strokeWidth="2" />
        )}
        <circle
          cx={x} cy={y} r="14"
          fill={isActive ? '#10b981' : '#1e293b'}
          stroke={isActive ? '#34d399' : '#475569'}
          strokeWidth="2"
        />
        <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          {node.val}
        </text>
        {node.left && renderNode(node.left, x - spacing, y + 40, level + 1, 'L')}
        {node.right && renderNode(node.right, x + spacing, y + 40, level + 1, 'R')}
      </g>
    );
  };

  return (
    <svg width="200" height="140" className="mx-auto">
      {renderNode(tree, 100, 20, 0, 'root')}
    </svg>
  );
};

const GridVisualization = ({ grid, path, current, trying, backtrackFrom, blocked }) => {
  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((cell, c) => {
            const isPath = path?.some(p => p[0] === r && p[1] === c);
            const isCurrent = current?.[0] === r && current?.[1] === c;
            const isTrying = trying?.[0] === r && trying?.[1] === c;
            const isBacktrack = backtrackFrom?.[0] === r && backtrackFrom?.[1] === c;
            const isBlocked = (cell === 1 && !isPath) || (blocked?.[0] === r && blocked?.[1] === c);
            const isStart = r === 0 && c === 0;
            const isEnd = r === grid.length - 1 && c === grid[0].length - 1;

            let bg = 'bg-slate-700';
            if (isBlocked) bg = 'bg-slate-900';
            if (isPath) bg = 'bg-blue-600';
            if (isCurrent) bg = 'bg-emerald-500';
            if (isTrying) bg = 'bg-cyan-400';
            if (isBacktrack) bg = 'bg-rose-500';
            if (isStart && !isCurrent) bg = 'bg-green-700';
            if (isEnd && !isCurrent) bg = 'bg-purple-700';

            return (
              <div
                key={c}
                className={`w-10 h-10 ${bg} rounded flex items-center justify-center text-xs font-bold text-white transition-colors duration-200`}
              >
                {isStart ? 'S' : isEnd ? 'E' : isBlocked ? '*' : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const ArrayVisualization = ({ array, highlight }) => {
  return (
    <div className="flex gap-1 items-end flex-wrap">
      {array.map((val, idx) => {
        const isLo = idx === highlight?.lo;
        const isHi = idx === highlight?.hi;
        const isMid = idx === highlight?.mid;
        const isFound = isMid && highlight?.found;
        const inRange = highlight && idx >= highlight.lo && idx <= highlight.hi;

        let bg = 'bg-slate-700';
        if (inRange) bg = 'bg-slate-600';
        if (isLo || isHi) bg = 'bg-blue-600';
        if (isMid) bg = 'bg-amber-500';
        if (isFound) bg = 'bg-emerald-500';

        return (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 ${bg} rounded flex items-center justify-center text-white font-bold transition-colors duration-200`}>
              {val}
            </div>
            <span className="text-xs text-slate-500">{idx}</span>
            <div className="h-4">
              {isMid && <span className="text-xs text-amber-400">mid</span>}
              {isLo && !isMid && <span className="text-xs text-blue-400">lo</span>}
              {isHi && !isMid && !isLo && <span className="text-xs text-blue-400">hi</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StringVisualization = ({ original, accumulated, currentIdx }) => {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs text-slate-500 mb-1">Original:</div>
        <div className="flex gap-1">
          {original.split('').map((char, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded flex items-center justify-center font-mono font-bold transition-colors ${
                idx === currentIdx ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs text-slate-500 mb-1">Accumulated:</div>
        <div className="flex gap-1 min-h-[32px]">
          {accumulated.split('').map((char, idx) => (
            <div
              key={idx}
              className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center font-mono font-bold text-white"
            >
              {char}
            </div>
          ))}
          {accumulated.length === 0 && (
            <div className="text-slate-500 italic text-sm">empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

const CodeHighlight = ({ code, currentLine }) => {
  const lines = code.split('\n');

  return (
    <pre className="font-mono text-xs bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-800">
      {lines.map((line, idx) => {
        const isHighlighted = currentLine && line.includes(currentLine.substring(0, 20));
        return (
          <div
            key={idx}
            className={`${isHighlighted ? 'bg-amber-900/30 -mx-4 px-4' : ''} transition-colors`}
          >
            <span className="text-slate-600 select-none mr-4">{String(idx + 1).padStart(2, ' ')}</span>
            <span className={isHighlighted ? 'text-amber-300' : 'text-slate-300'}>{line}</span>
          </div>
        );
      })}
    </pre>
  );
};

const RECURSION_COLORS = {
  primary: '#fbbf24',
  primaryHover: '#f59e0b',
  bg: 'rgba(245, 158, 11, 0.1)',
  border: 'rgba(245, 158, 11, 0.3)',
  arrow: '#f59e0b',
  hoverBg: 'rgba(245, 158, 11, 0.2)',
  topicBg: 'rgba(245, 158, 11, 0.05)'
};

export default function RecursionPatterns({ onBack, breadcrumb }) {
  const { isDark } = useTheme();
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [executionState, setExecutionState] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [customInput, setCustomInput] = useState(patterns[0].input);
  const [inputError, setInputError] = useState(null);
  const containerRef = useRef(null);

  // Drawing scratchpad state
  const [drawingSectionOpen, setDrawingSectionOpen] = useState(false);
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [drawingLineWidth, setDrawingLineWidth] = useState(3);
  const [drawingTool, setDrawingTool] = useState('pen');
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const [selectedSavedDrawing, setSelectedSavedDrawing] = useState(null);
  const scratchCanvasRef = useRef(null);
  const scratchCtxRef = useRef(null);

  const drawingColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#90EE90', '#FFD700'
  ];
  const drawingWidths = [1, 2, 3, 5, 8, 12, 16, 20];

  // Load drawings on mount and when auth state changes
  useEffect(() => {
    setSavedDrawings(loadDrawings());

    const unsubscribe = onAuthStateChange(() => {
      setSavedDrawings(loadDrawings());
      setSelectedSavedDrawing(null);
    });

    return () => unsubscribe();
  }, []);

  const initScratchCanvas = useCallback(() => {
    if (!scratchCanvasRef.current) return;
    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 600;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scratchCtxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (drawingSectionOpen) {
      setTimeout(() => initScratchCanvas(), 50);
    }
  }, [drawingSectionOpen, initScratchCanvas]);

  const handleScratchMouseDown = (e) => {
    const ctx = scratchCtxRef.current;
    if (!ctx) return;
    setIsDrawingActive(true);
    const rect = scratchCanvasRef.current.getBoundingClientRect();
    const scaleX = scratchCanvasRef.current.width / rect.width;
    const scaleY = scratchCanvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawingTool === 'eraser' ? '#FFFFFF' : drawingColor;
    ctx.lineWidth = drawingTool === 'eraser' ? drawingLineWidth * 3 : drawingLineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const handleScratchMouseMove = (e) => {
    if (!isDrawingActive || !scratchCtxRef.current) return;
    const rect = scratchCanvasRef.current.getBoundingClientRect();
    const scaleX = scratchCanvasRef.current.width / rect.width;
    const scaleY = scratchCanvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    scratchCtxRef.current.lineTo(x, y);
    scratchCtxRef.current.stroke();
  };

  const handleScratchMouseUp = () => {
    if (!scratchCtxRef.current) return;
    setIsDrawingActive(false);
    scratchCtxRef.current.closePath();
  };

  const clearScratchCanvas = () => {
    if (!scratchCtxRef.current) return;
    scratchCtxRef.current.fillStyle = '#FFFFFF';
    scratchCtxRef.current.fillRect(0, 0, scratchCanvasRef.current.width, scratchCanvasRef.current.height);
  };

  const saveScratchDrawing = () => {
    if (!scratchCanvasRef.current) return;
    const dataUrl = scratchCanvasRef.current.toDataURL('image/png');
    const name = prompt('Name your drawing:', `Drawing ${savedDrawings.length + 1}`);
    if (!name) return;
    const updated = addDrawing(savedDrawings, name, dataUrl);
    setSavedDrawings(updated);
  };

  const loadSavedDrawing = (drawing) => {
    if (!scratchCanvasRef.current || !scratchCtxRef.current) return;
    const img = new Image();
    img.onload = () => {
      scratchCtxRef.current.fillStyle = '#FFFFFF';
      scratchCtxRef.current.fillRect(0, 0, scratchCanvasRef.current.width, scratchCanvasRef.current.height);
      scratchCtxRef.current.drawImage(img, 0, 0);
    };
    img.src = drawing.data;
    setSelectedSavedDrawing(drawing.name);
  };

  const deleteSavedDrawing = (index) => {
    if (savedDrawings[index]?.name === selectedSavedDrawing) {
      setSelectedSavedDrawing(null);
    }
    const updated = deleteDrawingFromStorage(savedDrawings, index);
    setSavedDrawings(updated);
  };

  const downloadDrawing = () => {
    if (!scratchCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = `recursion-drawing-${Date.now()}.png`;
    link.href = scratchCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    setCustomInput(selectedPattern.input);
    setInputError(null);
    runExecution(selectedPattern.input);
  }, [selectedPattern]);

  const runExecution = (input) => {
    try {
      const result = selectedPattern.execute(input);
      setExecutionState(result);
      setCurrentStep(0);
      setIsPlaying(false);
      setInputError(null);
    } catch (err) {
      setInputError(err.message);
    }
  };

  const handleInputChange = (value) => {
    if (typeof selectedPattern.input === 'number') {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 0 && num <= 10) {
        setCustomInput(num);
      }
    } else if (typeof selectedPattern.input === 'string') {
      setCustomInput(value);
    } else {
      // For objects/arrays, store as string and parse on run
      setCustomInput(value);
    }
  };

  const handleRun = () => {
    let input = customInput;
    if (typeof selectedPattern.input !== 'number' && typeof selectedPattern.input !== 'string' && typeof customInput === 'string') {
      try {
        input = JSON.parse(customInput);
      } catch {
        setInputError('Invalid JSON');
        return;
      }
    }
    runExecution(input);
  };

  useEffect(() => {
    if (!isPlaying || !executionState) return;

    const timer = setTimeout(() => {
      if (currentStep < executionState.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, executionState, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'b') {
        e.preventDefault();
        onBack?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const step = executionState?.steps[currentStep];

  // Build breadcrumb stack
  const buildBreadcrumbStack = () => {
    return [{ name: 'Recursion', icon: '🔄' }];
  };

  const handleBreadcrumbClick = () => {
    // Only one level, clicking goes back to main
  };

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #f8fafc)',
      color: isDark ? 'white' : '#1f2937',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '100rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={RECURSION_COLORS}
        />
      </div>

      <div className="max-w-[1600px] mx-auto relative">
        {/* Pattern Selector - Collapsible on hover (desktop) */}
        <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-50 group">
          {/* Collapsed tab */}
          <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-r-xl py-3 px-2 cursor-pointer group-hover:opacity-0 transition-opacity duration-200">
            <div className="writing-mode-vertical text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              {selectedPattern.name}
            </div>
          </div>
          {/* Expanded panel */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-r-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl min-w-[200px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Patterns</h2>
            <div className="flex flex-col gap-1">
              {patterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPattern.id === pattern.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-transparent border-l-2 border-blue-500 text-blue-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Pattern Selector - Horizontal scroll */}
        <div className="lg:hidden mb-4">
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-2">
            <div className="flex gap-1 overflow-x-auto pb-1">
              {patterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedPattern.id === pattern.id
                      ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
            {/* LEVEL 1: Description (left) + Animated Diagram (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Description */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 lg:p-5">
                <h2 className="text-xl font-bold text-white mb-3">{selectedPattern.name}</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{selectedPattern.description}</p>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Points</h3>
                <ul className="space-y-1.5">
                  {selectedPattern.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Animated Diagram */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 lg:p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Visual Flow
                  <span className="ml-auto text-slate-500 font-normal">depth: {step?.stack?.length || 0}</span>
                </h3>
                {selectedPattern.diagram && (
                  <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800">
                    <selectedPattern.diagram stackDepth={step?.stack?.length || 0} />
                  </div>
                )}
                {/* Input/Output compact */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 mb-1">Input</h4>
                    <div className="flex items-center gap-2">
                      {typeof selectedPattern.input === 'number' ? (
                        <input type="number" min="0" max="10" value={customInput}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="font-mono text-emerald-400 text-xs bg-slate-950 border border-slate-700 px-2 py-1 rounded w-14 focus:outline-none focus:border-blue-500" />
                      ) : typeof selectedPattern.input === 'string' ? (
                        <input type="text" value={customInput}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="font-mono text-emerald-400 text-xs bg-slate-950 border border-slate-700 px-2 py-1 rounded w-24 focus:outline-none focus:border-blue-500" />
                      ) : (
                        <input type="text" value={typeof customInput === 'string' ? customInput : JSON.stringify(customInput)}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="font-mono text-emerald-400 text-xs bg-slate-950 border border-slate-700 px-2 py-1 rounded flex-1 focus:outline-none focus:border-blue-500" />
                      )}
                      <button onClick={handleRun} className="bg-emerald-600 hover:bg-emerald-500 px-2 py-1 rounded text-xs font-bold transition-colors">Run</button>
                    </div>
                    {inputError && <p className="text-red-400 text-xs mt-1">{inputError}</p>}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 mb-1">Output</h4>
                    <code className="font-mono text-purple-400 text-sm bg-slate-950 px-2 py-1 rounded inline-block">
                      {executionState && JSON.stringify(executionState.result)}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* LEVEL 2: Call Stack/Step/Variables (left) + Code (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Left: Call Stack + Current Step + Variables (stacked) */}
              <div className="lg:col-span-2 space-y-3">
                {/* Call Stack */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Call Stack
                    <span className="ml-auto text-slate-500 font-normal">depth: {step?.stack?.length || 0}</span>
                  </h3>
                  <div className="max-h-32 overflow-y-auto">
                    {step ? <CallStack stack={step.stack} /> : <p className="text-slate-500 text-xs">Click Play to start</p>}
                  </div>
                </div>

                {/* Current Step */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {step && <ActionBadge action={step.action} />}
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Step</h3>
                  </div>
                  {step ? (
                    <>
                      <p className="text-white font-medium text-sm mb-2">{step.message}</p>
                      {step.line && (
                        <div className="bg-slate-950 rounded-lg p-2">
                          <code className="font-mono text-xs text-amber-300">{step.line}</code>
                        </div>
                      )}
                      {step.currentPath && !step.grid && (
                        <div className="bg-slate-950 rounded-lg p-2 mt-2">
                          <span className="text-slate-400 text-xs">Path: </span>
                          <span className="font-mono text-cyan-400 text-xs">[{step.currentPath.join(', ') || ''}]</span>
                        </div>
                      )}
                      {step.currentSubset && (
                        <div className="bg-slate-950 rounded-lg p-2 mt-2">
                          <span className="text-slate-400 text-xs">Building: </span>
                          <span className="font-mono text-cyan-400 text-xs">[{step.currentSubset.join(', ') || ''}]</span>
                        </div>
                      )}
                      {step.memo && Object.keys(step.memo).length > 0 && (
                        <div className="bg-slate-950 rounded-lg p-2 mt-2">
                          <span className="text-slate-400 text-xs">Memo: </span>
                          <span className="font-mono text-amber-400 text-xs">{JSON.stringify(step.memo)}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-slate-500 text-xs">Press Play to begin stepping through</p>
                  )}
                </div>

                {/* Variables */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Variables</h3>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {step?.vars ? Object.entries(step.vars).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center bg-slate-950 rounded px-2 py-1">
                        <span className="font-mono text-blue-400 text-xs">{key}</span>
                        <span className="font-mono text-emerald-400 text-xs">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    )) : <p className="text-slate-500 text-xs">No variables yet</p>}
                  </div>
                  {step?.vars?.returnValue !== undefined && (
                    <div className="mt-2 pt-2 border-t border-slate-800">
                      <div className="flex justify-between items-center bg-purple-950/50 rounded px-2 py-1.5">
                        <span className="font-bold text-purple-300 text-xs">Return</span>
                        <span className="font-mono text-purple-400 font-bold text-sm">{step.vars.returnValue}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Code with step-through controls */}
              <div className="lg:col-span-3 bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Python Code</h3>
                <CodeHighlight code={selectedPattern.code} currentLine={step?.line} />

                {/* Controls */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setCurrentStep(0)} disabled={currentStep === 0}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-2.5 py-1.5 rounded-lg font-medium text-xs transition-colors">⏮ Reset</button>
                      <button onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-2.5 py-1.5 rounded-lg font-medium text-xs transition-colors">◀ Prev</button>
                      <button onClick={() => setIsPlaying(!isPlaying)}
                        className={`${isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'} px-4 py-1.5 rounded-lg font-bold text-xs transition-colors`}>
                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                      </button>
                      <button onClick={() => setCurrentStep(prev => Math.min((executionState?.steps.length || 1) - 1, prev + 1))}
                        disabled={currentStep >= (executionState?.steps.length || 1) - 1}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-2.5 py-1.5 rounded-lg font-medium text-xs transition-colors">Next ▶</button>
                      <button onClick={() => setCurrentStep((executionState?.steps.length || 1) - 1)}
                        disabled={currentStep >= (executionState?.steps.length || 1) - 1}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-2.5 py-1.5 rounded-lg font-medium text-xs transition-colors">End ⏭</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">Speed:</span>
                      <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs">
                        <option value={1500}>0.5x</option>
                        <option value={800}>1x</option>
                        <option value={400}>2x</option>
                        <option value={200}>4x</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
                      style={{ width: `${((currentStep + 1) / (executionState?.steps.length || 1)) * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-500">
                    <span>Step {currentStep + 1} / {executionState?.steps.length || 0}</span>
                    <span>{Math.round(((currentStep + 1) / (executionState?.steps.length || 1)) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawing Scratchpad Section */}
            <div className="bg-slate-900/50 rounded-2xl border border-indigo-500/30 overflow-hidden">
              <button
                onClick={() => setDrawingSectionOpen(!drawingSectionOpen)}
                className="w-full flex justify-between items-center p-4 lg:p-5 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">&#x270F;</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-white">Drawing Scratchpad</h3>
                    <p className="text-xs text-slate-400">Visualize recursion trees, call stacks, and solutions ({savedDrawings.length} saved)</p>
                  </div>
                </div>
                <span className={`text-slate-400 transition-transform duration-200 ${drawingSectionOpen ? 'rotate-180' : ''}`}>&#x25BC;</span>
              </button>

              {drawingSectionOpen && (
                <div className="px-4 pb-4 lg:px-5 lg:pb-5">
                  {/* Tools */}
                  <div className="flex flex-wrap gap-4 mb-3">
                    {/* Colors */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Color</label>
                      <div className="flex gap-1 flex-wrap" style={{ maxWidth: '260px' }}>
                        {drawingColors.map((c) => (
                          <button
                            key={c}
                            onClick={() => { setDrawingColor(c); setDrawingTool('pen'); }}
                            className="transition-all duration-150"
                            style={{
                              width: '24px',
                              height: '24px',
                              backgroundColor: c,
                              border: drawingColor === c && drawingTool === 'pen' ? '3px solid #818cf8' : '2px solid #4b5563',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              boxShadow: drawingColor === c && drawingTool === 'pen' ? '0 0 0 2px rgba(129,140,248,0.4)' : 'none'
                            }}
                          />
                        ))}
                        <input
                          type="color"
                          value={drawingColor}
                          onChange={(e) => { setDrawingColor(e.target.value); setDrawingTool('pen'); }}
                          className="cursor-pointer"
                          style={{ width: '24px', height: '24px', border: '2px solid #4b5563', borderRadius: '5px', padding: 0 }}
                          title="Custom color"
                        />
                      </div>
                    </div>

                    {/* Widths */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Width</label>
                      <div className="flex gap-1 flex-wrap">
                        {drawingWidths.map((w) => (
                          <button
                            key={w}
                            onClick={() => setDrawingLineWidth(w)}
                            className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                              drawingLineWidth === w
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {w}px
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tool */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tool</label>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setDrawingTool('pen')}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                            drawingTool === 'pen' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          Pen
                        </button>
                        <button
                          onClick={() => setDrawingTool('eraser')}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                            drawingTool === 'eraser' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          Eraser
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Actions</label>
                      <div className="flex gap-1 flex-wrap">
                        <button onClick={saveScratchDrawing} className="px-3 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                          Save
                        </button>
                        <button onClick={downloadDrawing} className="px-3 py-1 rounded text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                          Download
                        </button>
                        <button onClick={clearScratchCanvas} className="px-3 py-1 rounded text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition-colors">
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Canvas */}
                  <canvas
                    ref={scratchCanvasRef}
                    onMouseDown={handleScratchMouseDown}
                    onMouseMove={handleScratchMouseMove}
                    onMouseUp={handleScratchMouseUp}
                    onMouseLeave={handleScratchMouseUp}
                    className="border-2 border-slate-700 rounded-xl block w-full"
                    style={{
                      cursor: drawingTool === 'eraser' ? 'pointer' : 'crosshair',
                      backgroundColor: 'white',
                      height: 'auto'
                    }}
                  />

                  {/* Saved Drawings */}
                  {savedDrawings.length > 0 && (
                    <div className="mt-3">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Saved Drawings</label>
                      <div className="flex gap-2 flex-wrap">
                        {savedDrawings.map((drawing, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg overflow-hidden cursor-pointer transition-all ${
                              selectedSavedDrawing === drawing.name ? 'ring-2 ring-indigo-500' : 'ring-1 ring-slate-700'
                            }`}
                            style={{ width: '120px' }}
                          >
                            <img
                              src={drawing.data}
                              alt={drawing.name}
                              onClick={() => loadSavedDrawing(drawing)}
                              className="w-full h-16 object-cover bg-white"
                            />
                            <div className="bg-slate-800 px-2 py-1 flex items-center justify-between">
                              <span
                                onClick={() => loadSavedDrawing(drawing)}
                                className="text-xs text-slate-300 font-medium truncate flex-1"
                                title={drawing.name}
                              >
                                {drawing.name}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteSavedDrawing(idx); }}
                                className="text-red-400 hover:text-red-300 text-xs ml-1"
                                title="Delete"
                              >
                                &#x2715;
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* LeetCode Problems Section */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 lg:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LC</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Practice Problems</h3>
                  <p className="text-xs text-slate-400">LeetCode problems that use this pattern</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {selectedPattern.leetcodeProblems?.map((problem) => (
                  <a
                    key={problem.id}
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg p-3 transition-all"
                  >
                    <span className="font-mono text-slate-500 text-xs w-8">#{problem.id}</span>
                    <span className="flex-1 text-sm text-slate-200 group-hover:text-white truncate">
                      {problem.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      problem.difficulty === 'Easy' ? 'bg-emerald-900/50 text-emerald-400' :
                      problem.difficulty === 'Medium' ? 'bg-amber-900/50 text-amber-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {selectedPattern.leetcodeProblems?.length || 0} problems - Click to open in LeetCode
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-500">Easy</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-500">Medium</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/30 text-red-500">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

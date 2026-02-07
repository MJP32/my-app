/**
 * CollapsibleSidebar - Reusable sidebar that shows/hides on hover
 *
 * Fixed left sidebar showing title vertically, expands on hover to show all items
 */

import { useState, useEffect } from 'react'

export default function CollapsibleSidebar({
  items,
  selectedIndex,
  onSelect,
  title = 'Topics',
  getItemLabel = (item) => item.name || item.title || item,
  getItemIcon = (item) => item.icon || null,
  primaryColor = '#3b82f6',
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Fixed sidebar on left - always visible */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 group ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Collapsed tab - shows page title vertically */}
        <div
          className={`bg-slate-900/90 backdrop-blur border border-slate-700 rounded-r-xl py-3 px-2 cursor-pointer transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          <div
            className="text-xs font-bold text-slate-400 uppercase tracking-widest"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {title}
          </div>
        </div>

        {/* Expanded panel */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-r-2xl p-3 transition-all duration-200 shadow-2xl min-w-[200px] max-h-[80vh] overflow-y-auto ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{title}</h2>
          <div className="flex flex-col gap-1">
            {items.map((item, index) => {
              const label = getItemLabel(item)
              const icon = getItemIcon(item)
              const isSelected = selectedIndex === index

              return (
                <button
                  key={index}
                  onClick={() => onSelect(index)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-500/20 to-transparent border-l-2 text-blue-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  style={isSelected ? { borderLeftColor: primaryColor, color: primaryColor } : {}}
                >
                  {icon && <span className="text-base">{icon}</span>}
                  <span className="truncate">{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

    </>
  )
}

/**
 * Hook to manage sidebar state
 */
export function useSidebarSelection(items, initialIndex = 0) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  useEffect(() => {
    // Reset selection if items change and index is out of bounds
    if (selectedIndex >= items.length) {
      setSelectedIndex(0)
    }
  }, [items, selectedIndex])

  return [selectedIndex, setSelectedIndex, items[selectedIndex]]
}

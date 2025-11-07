#!/usr/bin/env python3
"""
Batch update script to apply collapsible sections pattern
"""

import re
import sys

def update_component(component_name, file_path):
    """Update a single component file"""

    print(f"\n{'='*60}")
    print(f"Processing {component_name}...")
    print(f"{'='*60}")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Find the Easy section
    easy_search = re.search(
        r'(\s+)\{/\* Easy Questions \*/\}\s+'
        r'\{questions\.filter\(q => q\.difficulty === [\'"]Easy[\'"]\)\.length > 0 && \(',
        content
    )

    if not easy_search:
        print("⚠ Could not find Easy Questions section")
        return False

    indent = easy_search.group(1)

    # Create the collapsible template for Easy
    easy_template = f'''{indent}{{/* Easy Questions */}}
{indent}{{(() => {{
{indent}  const easyQuestions = questions.filter(q => q.difficulty === 'Easy')
{indent}  if (easyQuestions.length === 0) return null

{indent}  const completed = easyQuestions.filter(q => isProblemCompleted(`{component_name}-${{q.id}}`)).length
{indent}  const total = easyQuestions.length
{indent}  const shouldCollapse = total > 5
{indent}  const isExpanded = expandedSections.Easy

{indent}  return (
{indent}    <div>
{indent}      <h2
{indent}        onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, Easy: !prev.Easy }}))}}
{indent}        style={{{{
{indent}          fontSize: '1.5rem',
{indent}          fontWeight: '700',
{indent}          color: '#059669',
{indent}          marginBottom: '1rem',
{indent}          display: 'flex',
{indent}          alignItems: 'center',
{indent}          gap: '0.75rem',
{indent}          borderBottom: '3px solid #10b981',
{indent}          paddingBottom: '0.5rem',
{indent}          cursor: shouldCollapse ? 'pointer' : 'default',
{indent}          userSelect: 'none'
{indent}        }}}}
{indent}      >
{indent}        {{shouldCollapse && (
{indent}          <span style={{{{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}}}>
{indent}            ▶
{indent}          </span>
{indent}        )}}
{indent}        <span style={{{{
{indent}          backgroundColor: '#d1fae5',
{indent}          color: '#065f46',
{indent}          padding: '0.25rem 0.75rem',
{indent}          borderRadius: '8px',
{indent}          fontSize: '0.9rem'
{indent}        }}}}>
{indent}          Easy
{indent}        </span>
{indent}        <span style={{{{ fontSize: '1rem', color: '#6b7280' }}}}>
{indent}          ({{total}} {{total === 1 ? 'problem' : 'problems'}})
{indent}        </span>
{indent}        {{shouldCollapse && (
{indent}          <span style={{{{
{indent}            marginLeft: 'auto',
{indent}            backgroundColor: completed === total ? '#10b981' : '#e5e7eb',
{indent}            color: completed === total ? 'white' : '#6b7280',
{indent}            padding: '0.25rem 0.75rem',
{indent}            borderRadius: '12px',
{indent}            fontSize: '0.85rem',
{indent}            fontWeight: '600'
{indent}          }}}}>
{indent}            {{completed}}/{{total}} completed
{indent}          </span>
{indent}        )}}
{indent}      </h2>
{indent}      {{(!shouldCollapse || isExpanded) && (
{indent}        <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
{indent}          {{easyQuestions.map(q =>
{indent}            <QuestionCard key={{`${{q.id}}-${{refreshKey}}`}} question={{q}} forceRefresh={{refreshKey}} />
{indent}          )}}
{indent}        </div>
{indent}      )}}
{indent}    </div>
{indent}  )
{indent}}})()}}'''

    # Similar templates for Medium and Hard...
    medium_template = f'''{indent}{{/* Medium Questions */}}
{indent}{{(() => {{
{indent}  const mediumQuestions = questions.filter(q => q.difficulty === 'Medium')
{indent}  if (mediumQuestions.length === 0) return null

{indent}  const completed = mediumQuestions.filter(q => isProblemCompleted(`{component_name}-${{q.id}}`)).length
{indent}  const total = mediumQuestions.length
{indent}  const shouldCollapse = total > 5
{indent}  const isExpanded = expandedSections.Medium

{indent}  return (
{indent}    <div>
{indent}      <h2
{indent}        onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, Medium: !prev.Medium }}))}}
{indent}        style={{{{
{indent}          fontSize: '1.5rem',
{indent}          fontWeight: '700',
{indent}          color: '#d97706',
{indent}          marginBottom: '1rem',
{indent}          display: 'flex',
{indent}          alignItems: 'center',
{indent}          gap: '0.75rem',
{indent}          borderBottom: '3px solid #f59e0b',
{indent}          paddingBottom: '0.5rem',
{indent}          cursor: shouldCollapse ? 'pointer' : 'default',
{indent}          userSelect: 'none'
{indent}        }}}}
{indent}      >
{indent}        {{shouldCollapse && (
{indent}          <span style={{{{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}}}>
{indent}            ▶
{indent}          </span>
{indent}        )}}
{indent}        <span style={{{{
{indent}          backgroundColor: '#fef3c7',
{indent}          color: '#92400e',
{indent}          padding: '0.25rem 0.75rem',
{indent}          borderRadius: '8px',
{indent}          fontSize: '0.9rem'
{indent}        }}}}>
{indent}          Medium
{indent}        </span>
{indent}        <span style={{{{ fontSize: '1rem', color: '#6b7280' }}}}>
{indent}          ({{total}} {{total === 1 ? 'problem' : 'problems'}})
{indent}        </span>
{indent}        {{shouldCollapse && (
{indent}          <span style={{{{
{indent}            marginLeft: 'auto',
{indent}            backgroundColor: completed === total ? '#f59e0b' : '#e5e7eb',
{indent}            color: completed === total ? 'white' : '#6b7280',
{indent}            padding: '0.25rem 0.75rem',
{indent}            borderRadius: '12px',
{indent}            fontSize: '0.85rem',
{indent}            fontWeight: '600'
{indent}          }}}}>
{indent}            {{completed}}/{{total}} completed
{indent}          </span>
{indent}        )}}
{indent}      </h2>
{indent}      {{(!shouldCollapse || isExpanded) && (
{indent}        <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
{indent}          {{mediumQuestions.map(q =>
{indent}            <QuestionCard key={{`${{q.id}}-${{refreshKey}}`}} question={{q}} forceRefresh={{refreshKey}} />
{indent}          )}}
{indent}        </div>
{indent}      )}}
{indent}    </div>
{indent}  )
{indent}}})()}}'''

    hard_template = f'''{indent}{{/* Hard Questions */}}
{indent}{{(() => {{
{indent}  const hardQuestions = questions.filter(q => q.difficulty === 'Hard')
{indent}  if (hardQuestions.length === 0) return null

{indent}  const completed = hardQuestions.filter(q => isProblemCompleted(`{component_name}-${{q.id}}`)).length
{indent}  const total = hardQuestions.length
{indent}  const shouldCollapse = total > 5
{indent}  const isExpanded = expandedSections.Hard

{indent}  return (
{indent}    <div>
{indent}      <h2
{indent}        onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, Hard: !prev.Hard }}))}}
{indent}        style={{{{
{indent}          fontSize: '1.5rem',
{indent}          fontWeight: '700',
{indent}          color: '#dc2626',
{indent}          marginBottom: '1rem',
{indent}          display: 'flex',
{indent}          alignItems: 'center',
{indent}          gap: '0.75rem',
{indent}          borderBottom: '3px solid #ef4444',
{indent}          paddingBottom: '0.5rem',
{indent}          cursor: shouldCollapse ? 'pointer' : 'default',
{indent}          userSelect: 'none'
{indent}        }}}}
{indent}      >
{indent}        {{shouldCollapse && (
{indent}          <span style={{{{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}}}>
{indent}            ▶
{indent}          </span>
{indent}        )}}
{indent}        <span style={{{{
{indent}          backgroundColor: '#fee2e2',
{indent}          color: '#991b1b',
{indent}          padding: '0.25rem 0.75rem',
{indent}          borderRadius: '8px',
{indent}          fontSize: '0.9rem'
{indent}        }}}}>
{indent}          Hard
{indent}        </span>
{indent}        <span style={{{{ fontSize: '1rem', color: '#6b7280' }}}}>
{indent}          ({{total}} {{total === 1 ? 'problem' : 'problems'}})
{indent}        </span>
{indent}        {{shouldCollapse && (
{indent}          <span style={{{{
{indent}            marginLeft: 'auto',
{indent}            backgroundColor: completed === total ? '#ef4444' : '#e5e7eb',
{indent}            color: completed === total ? 'white' : '#6b7280',
{indent}            padding: '0.25rem 0.75rem',
{indent}            borderRadius: '12px',
{indent}            fontSize: '0.85rem',
{indent}            fontWeight: '600'
{indent}          }}}}>
{indent}            {{completed}}/{{total}} completed
{indent}          </span>
{indent}        )}}
{indent}      </h2>
{indent}      {{(!shouldCollapse || isExpanded) && (
{indent}        <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
{indent}          {{hardQuestions.map(q =>
{indent}            <QuestionCard key={{`${{q.id}}-${{refreshKey}}`}} question={{q}} forceRefresh={{refreshKey}} />
{indent}          )}}
{indent}        </div>
{indent}      )}}
{indent}    </div>
{indent}  )
{indent}}})()}}'''

    # Find and replace each difficulty section
    # Easy
    easy_pattern = re.compile(
        r'(\s+)\{/\* Easy Questions \*/\}\s+'
        r'\{questions\.filter\(q => q\.difficulty === [\'"]Easy[\'"]\)\.length > 0 && \(\s+'
        r'<div>.*?'
        r'</div>\s+'
        r'\)\}',
        re.DOTALL
    )

    match = easy_pattern.search(content)
    if match:
        content = content[:match.start()] + easy_template + content[match.end():]
        print("✓ Updated Easy section")
    else:
        print("⚠ Could not find Easy section to replace")
        return False

    # Medium
    medium_pattern = re.compile(
        r'(\s+)\{/\* Medium Questions \*/\}\s+'
        r'\{questions\.filter\(q => q\.difficulty === [\'"]Medium[\'"]\)\.length > 0 && \(\s+'
        r'<div>.*?'
        r'</div>\s+'
        r'\)\}',
        re.DOTALL
    )

    match = medium_pattern.search(content)
    if match:
        content = content[:match.start()] + medium_template + content[match.end():]
        print("✓ Updated Medium section")
    else:
        print("⚠ Could not find Medium section to replace")
        return False

    # Hard
    hard_pattern = re.compile(
        r'(\s+)\{/\* Hard Questions \*/\}\s+'
        r'\{questions\.filter\(q => q\.difficulty === [\'"]Hard[\'"]\)\.length > 0 && \(\s+'
        r'<div>.*?'
        r'</div>\s+'
        r'\)\}',
        re.DOTALL
    )

    match = hard_pattern.search(content)
    if match:
        content = content[:match.start()] + hard_template + content[match.end():]
        print("✓ Updated Hard section")
    else:
        print("⚠ Could not find Hard section to replace")
        return False

    # Write back
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Successfully updated {component_name}")
        return True
    except Exception as e:
        print(f"❌ Error writing {file_path}: {e}")
        return False

# Process components
components = [
    ('BinaryTrees', 'src/pages/algorithms/BinaryTrees.jsx'),
    ('DynamicProgramming', 'src/pages/algorithms/DynamicProgramming.jsx'),
    ('Graphs', 'src/pages/algorithms/Graphs.jsx'),
    ('HashTables', 'src/pages/algorithms/HashTables.jsx'),
    ('Heaps', 'src/pages/algorithms/Heaps.jsx'),
    ('Queues', 'src/pages/algorithms/Queues.jsx'),
    ('Strings', 'src/pages/algorithms/Strings.jsx'),
    ('Trees', 'src/pages/algorithms/Trees.jsx'),
    ('Trie', 'src/pages/algorithms/Trie.jsx'),
    ('UnionFind', 'src/pages/algorithms/UnionFind.jsx'),
]

if __name__ == '__main__':
    print("Starting batch update...")
    print(f"Will process {len(components)} components\n")

    success_count = 0
    for component_name, file_path in components:
        if update_component(component_name, file_path):
            success_count += 1

    print(f"\n{'='*60}")
    print(f"✅ Successfully updated {success_count}/{len(components)} components")
    print(f"{'='*60}")

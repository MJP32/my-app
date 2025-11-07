#!/usr/bin/env python3
"""
Script to apply collapsible sections pattern to algorithm components
"""

import re
import sys

def apply_collapsible_pattern(component_name, file_path):
    """Apply collapsible sections pattern to a component file"""

    print(f"\n{'='*60}")
    print(f"Processing {component_name}...")
    print(f"{'='*60}")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Define the collapsible pattern template for Easy
    easy_pattern = r'''          \{/\* Easy Questions \*/\}
          \{questions\.filter\(q => q\.difficulty === 'Easy'\)\.length > 0 && \(
            <div>
              <h2 style=\{\{
                fontSize: '1\.5rem',
                fontWeight: '700',
                color: '#059669',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0\.75rem',
                borderBottom: '3px solid #10b981',
                paddingBottom: '0\.5rem'
              \}\}>
                <span style=\{\{
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  padding: '0\.25rem 0\.75rem',
                  borderRadius: '8px',
                  fontSize: '0\.9rem'
                \}\}>
                  Easy
                </span>
                <span style=\{\{ fontSize: '1rem', color: '#6b7280' \}\}>
                  \(\{questions\.filter\(q => q\.difficulty === 'Easy'\)\.length\} \{questions\.filter\(q => q\.difficulty === 'Easy'\)\.length === 1 \? 'problem' : 'problems'\}\)
                </span>
              </h2>
              <div style=\{\{ display: 'flex', flexDirection: 'column', gap: '1rem' \}\}>
                \{questions\.filter\(q => q\.difficulty === 'Easy'\)\.map\(q =>
                  <QuestionCard key=\{`\$\{q\.id\}-\$\{refreshKey\}`\} question=\{q\} />
                \)\}
              </div>
            </div>
          \)\}'''

    easy_replacement = f'''          {{/* Easy Questions */}}
          {{(() => {{
            const easyQuestions = questions.filter(q => q.difficulty === 'Easy')
            if (easyQuestions.length === 0) return null

            const completed = easyQuestions.filter(q => isProblemCompleted(`{component_name}-${{q.id}}`)).length
            const total = easyQuestions.length
            const shouldCollapse = total > 5
            const isExpanded = expandedSections.Easy

            return (
              <div>
                <h2
                  onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, Easy: !prev.Easy }}))}}
                  style={{{{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#059669',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderBottom: '3px solid #10b981',
                    paddingBottom: '0.5rem',
                    cursor: shouldCollapse ? 'pointer' : 'default',
                    userSelect: 'none'
                  }}}}
                >
                  {{shouldCollapse && (
                    <span style={{{{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}}}>
                      ▶
                    </span>
                  )}}
                  <span style={{{{
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}}}>
                    Easy
                  </span>
                  <span style={{{{ fontSize: '1rem', color: '#6b7280' }}}}>
                    ({{total}} {{total === 1 ? 'problem' : 'problems'}})
                  </span>
                  {{shouldCollapse && (
                    <span style={{{{
                      marginLeft: 'auto',
                      backgroundColor: completed === total ? '#10b981' : '#e5e7eb',
                      color: completed === total ? 'white' : '#6b7280',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}}}>
                      {{completed}}/{{total}} completed
                    </span>
                  )}}
                </h2>
                {{(!shouldCollapse || isExpanded) && (
                  <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
                    {{easyQuestions.map(q =>
                      <QuestionCard key={{`${{q.id}}-${{refreshKey}}`}} question={{q}} />
                    )}}
                  </div>
                )}}
              </div>
            )
          }})()}}'''

    # Define the collapsible pattern template for Medium
    medium_pattern = r'''          \{/\* Medium Questions \*/\}
          \{questions\.filter\(q => q\.difficulty === 'Medium'\)\.length > 0 && \(
            <div>
              <h2 style=\{\{
                fontSize: '1\.5rem',
                fontWeight: '700',
                color: '#d97706',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0\.75rem',
                borderBottom: '3px solid #f59e0b',
                paddingBottom: '0\.5rem'
              \}\}>
                <span style=\{\{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '0\.25rem 0\.75rem',
                  borderRadius: '8px',
                  fontSize: '0\.9rem'
                \}\}>
                  Medium
                </span>
                <span style=\{\{ fontSize: '1rem', color: '#6b7280' \}\}>
                  \(\{questions\.filter\(q => q\.difficulty === 'Medium'\)\.length\} \{questions\.filter\(q => q\.difficulty === 'Medium'\)\.length === 1 \? 'problem' : 'problems'\}\)
                </span>
              </h2>
              <div style=\{\{ display: 'flex', flexDirection: 'column', gap: '1rem' \}\}>
                \{questions\.filter\(q => q\.difficulty === 'Medium'\)\.map\(q =>
                  <QuestionCard key=\{`\$\{q\.id\}-\$\{refreshKey\}`\} question=\{q\} />
                \)\}
              </div>
            </div>
          \)\}'''

    medium_replacement = f'''          {{/* Medium Questions */}}
          {{(() => {{
            const mediumQuestions = questions.filter(q => q.difficulty === 'Medium')
            if (mediumQuestions.length === 0) return null

            const completed = mediumQuestions.filter(q => isProblemCompleted(`{component_name}-${{q.id}}`)).length
            const total = mediumQuestions.length
            const shouldCollapse = total > 5
            const isExpanded = expandedSections.Medium

            return (
              <div>
                <h2
                  onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, Medium: !prev.Medium }}))}}
                  style={{{{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#d97706',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderBottom: '3px solid #f59e0b',
                    paddingBottom: '0.5rem',
                    cursor: shouldCollapse ? 'pointer' : 'default',
                    userSelect: 'none'
                  }}}}
                >
                  {{shouldCollapse && (
                    <span style={{{{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}}}>
                      ▶
                    </span>
                  )}}
                  <span style={{{{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}}}>
                    Medium
                  </span>
                  <span style={{{{ fontSize: '1rem', color: '#6b7280' }}}}>
                    ({{total}} {{total === 1 ? 'problem' : 'problems'}})
                  </span>
                  {{shouldCollapse && (
                    <span style={{{{
                      marginLeft: 'auto',
                      backgroundColor: completed === total ? '#f59e0b' : '#e5e7eb',
                      color: completed === total ? 'white' : '#6b7280',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}}}>
                      {{completed}}/{{total}} completed
                    </span>
                  )}}
                </h2>
                {{(!shouldCollapse || isExpanded) && (
                  <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
                    {{mediumQuestions.map(q =>
                      <QuestionCard key={{`${{q.id}}-${{refreshKey}}`}} question={{q}} />
                    )}}
                  </div>
                )}}
              </div>
            )
          }})()}}'''

    # Define the collapsible pattern template for Hard
    hard_pattern = r'''          \{/\* Hard Questions \*/\}
          \{questions\.filter\(q => q\.difficulty === 'Hard'\)\.length > 0 && \(
            <div>
              <h2 style=\{\{
                fontSize: '1\.5rem',
                fontWeight: '700',
                color: '#dc2626',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0\.75rem',
                borderBottom: '3px solid #ef4444',
                paddingBottom: '0\.5rem'
              \}\}>
                <span style=\{\{
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  padding: '0\.25rem 0\.75rem',
                  borderRadius: '8px',
                  fontSize: '0\.9rem'
                \}\}>
                  Hard
                </span>
                <span style=\{\{ fontSize: '1rem', color: '#6b7280' \}\}>
                  \(\{questions\.filter\(q => q\.difficulty === 'Hard'\)\.length\} \{questions\.filter\(q => q\.difficulty === 'Hard'\)\.length === 1 \? 'problem' : 'problems'\}\)
                </span>
              </h2>
              <div style=\{\{ display: 'flex', flexDirection: 'column', gap: '1rem' \}\}>
                \{questions\.filter\(q => q\.difficulty === 'Hard'\)\.map\(q =>
                  <QuestionCard key=\{`\$\{q\.id\}-\$\{refreshKey\}`\} question=\{q\} />
                \)\}
              </div>
            </div>
          \)\}'''

    hard_replacement = f'''          {{/* Hard Questions */}}
          {{(() => {{
            const hardQuestions = questions.filter(q => q.difficulty === 'Hard')
            if (hardQuestions.length === 0) return null

            const completed = hardQuestions.filter(q => isProblemCompleted(`{component_name}-${{q.id}}`)).length
            const total = hardQuestions.length
            const shouldCollapse = total > 5
            const isExpanded = expandedSections.Hard

            return (
              <div>
                <h2
                  onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, Hard: !prev.Hard }}))}}
                  style={{{{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#dc2626',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderBottom: '3px solid #ef4444',
                    paddingBottom: '0.5rem',
                    cursor: shouldCollapse ? 'pointer' : 'default',
                    userSelect: 'none'
                  }}}}
                >
                  {{shouldCollapse && (
                    <span style={{{{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}}}>
                      ▶
                    </span>
                  )}}
                  <span style={{{{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}}}>
                    Hard
                  </span>
                  <span style={{{{ fontSize: '1rem', color: '#6b7280' }}}}>
                    ({{total}} {{total === 1 ? 'problem' : 'problems'}})
                  </span>
                  {{shouldCollapse && (
                    <span style={{{{
                      marginLeft: 'auto',
                      backgroundColor: completed === total ? '#ef4444' : '#e5e7eb',
                      color: completed === total ? 'white' : '#6b7280',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}}}>
                      {{completed}}/{{total}} completed
                    </span>
                  )}}
                </h2>
                {{(!shouldCollapse || isExpanded) && (
                  <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
                    {{hardQuestions.map(q =>
                      <QuestionCard key={{`${{q.id}}-${{refreshKey}}`}} question={{q}} />
                    )}}
                  </div>
                )}}
              </div>
            )
          }})()}}'''

    modified = False

    # Apply Easy pattern
    if re.search(easy_pattern, content):
        print("✓ Found Easy pattern, replacing...")
        content = re.sub(easy_pattern, easy_replacement, content)
        modified = True
    else:
        print("⚠ Easy pattern not found or already updated")

    # Apply Medium pattern
    if re.search(medium_pattern, content):
        print("✓ Found Medium pattern, replacing...")
        content = re.sub(medium_pattern, medium_replacement, content)
        modified = True
    else:
        print("⚠ Medium pattern not found or already updated")

    # Apply Hard pattern
    if re.search(hard_pattern, content):
        print("✓ Found Hard pattern, replacing...")
        content = re.sub(hard_pattern, hard_replacement, content)
        modified = True
    else:
        print("⚠ Hard pattern not found or already updated")

    if modified:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Successfully updated {component_name}")
            return True
        except Exception as e:
            print(f"❌ Error writing {file_path}: {e}")
            return False
    else:
        print(f"⏭ No changes needed for {component_name}")
        return False

# Components to update
components = [
    ('BinarySearchTrees', 'src/pages/algorithms/BinarySearchTrees.jsx'),
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
    print("Starting collapsible sections update...")
    print(f"Will process {len(components)} components\n")

    success_count = 0
    for component_name, file_path in components:
        if apply_collapsible_pattern(component_name, file_path):
            success_count += 1

    print(f"\n{'='*60}")
    print(f"✅ Updated {success_count}/{len(components)} components")
    print(f"{'='*60}")

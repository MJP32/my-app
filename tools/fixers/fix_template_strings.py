#!/usr/bin/env python3
"""
Fix incomplete template strings in handleQuestionSelect functions
"""

import re
import os

files_to_fix = [
    ('BinarySearch', 'src/pages/algorithms/BinarySearch.jsx'),
    ('BinarySearchTrees', 'src/pages/algorithms/BinarySearchTrees.jsx'),
    ('BinaryTrees', 'src/pages/algorithms/BinaryTrees.jsx'),
    ('FamousAlgorithms', 'src/pages/algorithms/FamousAlgorithms.jsx'),
    ('Graphs', 'src/pages/algorithms/Graphs.jsx'),
    ('GreedyAlgorithms', 'src/pages/algorithms/GreedyAlgorithms.jsx'),
    ('HashTables', 'src/pages/algorithms/HashTables.jsx'),
    ('Heaps', 'src/pages/algorithms/Heaps.jsx'),
    ('Queues', 'src/pages/algorithms/Queues.jsx'),
    ('Recursion', 'src/pages/algorithms/Recursion.jsx'),
    ('Searching', 'src/pages/algorithms/Searching.jsx'),
    ('Trie', 'src/pages/algorithms/Trie.jsx'),
    ('UnionFind', 'src/pages/algorithms/UnionFind.jsx'),
]

def fix_file(component_name, file_path):
    """Fix incomplete template strings in a file"""

    print(f"\nProcessing {component_name}...")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Pattern to match the broken code structure
    pattern = re.compile(
        rf'''(  const handleQuestionSelect = \(question\) => \{{.*?)
    const problemId = `{component_name}-\${{question\.id}}

  const openDrawingModal = \(\) => \{{
    if \(selectedQuestion\) \{{
      const problemId = `{component_name}-\${{selectedQuestion\.id}}`
      const savedDrawing = localStorage\.getItem\(`drawing-\${{problemId}}`\)
      setCurrentDrawing\(savedDrawing\)
      setShowDrawing\(true\)
    \}}
  \}}

  const closeDrawingModal = \(\) => \{{
    setShowDrawing\(false\)
    // Reload drawing after saving
    if \(selectedQuestion\) \{{
      const problemId = `{component_name}-\${{selectedQuestion\.id}}`
      const savedDrawing = localStorage\.getItem\(`drawing-\${{problemId}}`\)
      setCurrentDrawing\(savedDrawing\)
    \}}
  \}}`
    const savedDrawing = localStorage\.getItem\(`drawing-\${{problemId}}`\)
    setCurrentDrawing\(savedDrawing\)
  \}}''',
        re.DOTALL
    )

    replacement = rf'''\1    const problemId = `{component_name}-${{question.id}}`
    const savedDrawing = localStorage.getItem(`drawing-${{problemId}}`)
    setCurrentDrawing(savedDrawing)
  }}

  const openDrawingModal = () => {{
    if (selectedQuestion) {{
      const problemId = `{component_name}-${{selectedQuestion.id}}`
      const savedDrawing = localStorage.getItem(`drawing-${{problemId}}`)
      setCurrentDrawing(savedDrawing)
      setShowDrawing(true)
    }}
  }}

  const closeDrawingModal = () => {{
    setShowDrawing(false)
    // Reload drawing after saving
    if (selectedQuestion) {{
      const problemId = `{component_name}-${{selectedQuestion.id}}`
      const savedDrawing = localStorage.getItem(`drawing-${{problemId}}`)
      setCurrentDrawing(savedDrawing)
    }}
  }}'''

    match = pattern.search(content)
    if match:
        content = pattern.sub(replacement, content)
        print(f"✓ Fixed template string in {component_name}")

        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Successfully updated {component_name}")
            return True
        except Exception as e:
            print(f"❌ Error writing {file_path}: {e}")
            return False
    else:
        print(f"⚠ Pattern not found in {component_name}")
        return False

print("="*60)
print("Fixing template strings in algorithm components")
print("="*60)

success_count = 0
for component_name, file_path in files_to_fix:
    if fix_file(component_name, file_path):
        success_count += 1

print(f"\n{'='*60}")
print(f"✅ Fixed {success_count}/{len(files_to_fix)} files")
print(f"{'='*60}")

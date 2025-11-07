#!/bin/bash

files=(
  "BinarySearch.jsx"
  "BinarySearchTrees.jsx"
  "BinaryTrees.jsx"
  "DynamicProgramming.jsx"
  "FamousAlgorithms.jsx"
  "Graphs.jsx"
  "GreedyAlgorithms.jsx"
  "Heaps.jsx"
  "Queues.jsx"
  "Recursion.jsx"
  "Searching.jsx"
  "Sorting.jsx"
  "Trie.jsx"
  "UnionFind.jsx"
)

for file in "${files[@]}"; do
  filepath="src/pages/algorithms/$file"
  echo "Fixing $file..."

  # Use Python to fix the file
  python3 << 'PYTHON_SCRIPT'
import sys
import re

filepath = sys.argv[1]

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: closing of component function, then blank lines, then DrawingCanvas outside
# We want to move DrawingCanvas inside before the closing </div>
pattern = r'(\s+</div>\s+</div>\s+\)\s+}\s+)\n\n+(\s+\{/\* Drawing Canvas Modal \*/\}\s+<DrawingCanvas[^>]*\n[^>]*\n[^>]*\n[^>]*\n[^>]*\n\s+/>)\n+(export default)'

replacement = r'\n\2\n    </div>\n  )\n}\n\n\3'

fixed_content = re.sub(pattern, replacement, content)

if fixed_content != content:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    print(f"  ✓ Fixed {filepath}")
else:
    print(f"  ✗ No changes in {filepath}")
PYTHON_SCRIPT
  python3 -c "
import sys, re
filepath = '$filepath'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()
# Find pattern where function closes, then DrawingCanvas appears outside
pattern = r'(      \)\}\s*\n)(}\s*\n)\s*\n\s*(\{/\* Drawing Canvas Modal \*/\}[^}]+</DrawingCanvas>)\s*\n(export default)'
replacement = r'\n      \3\n    </div>\n  \1\2\n\4'
fixed = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)
if fixed != content:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed)
    print(f'  ✓ Fixed {filepath}')
else:
    print(f'  ✗ No pattern match in {filepath}')
"
done

echo "Done!"

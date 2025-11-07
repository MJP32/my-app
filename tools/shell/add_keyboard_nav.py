#!/usr/bin/env python3
"""
Add keyboard navigation to algorithm components
"""

import re

components = [
    'Arrays', 'BinarySearch', 'BinarySearchTrees', 'BinaryTrees',
    'DynamicProgramming', 'Graphs', 'HashTables', 'Heaps',
    'LinkedLists', 'Queues', 'Recursion', 'Searching', 'Sorting',
    'Stacks', 'Strings', 'Trees', 'Trie', 'UnionFind',
    'DataStructures', 'FamousAlgorithms', 'GreedyAlgorithms'
]

def add_keyboard_nav(component_name):
    file_path = f'src/pages/algorithms/{component_name}.jsx'

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"⚠️  File not found: {file_path}")
        return False
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Skip if already has keyboard navigation
    if 'useKeyboardNavigation' in content:
        print(f"⏭  {component_name} already has keyboard navigation")
        return False

    # Add import for useKeyboardNavigation
    if "import { useKeyboardNavigation }" not in content:
        # Find the imports section
        import_pattern = r"(import .* from ['\"].*languageService['\"])"
        replacement = r"\1\nimport { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'"

        if not re.search(import_pattern, content):
            # Try alternate pattern
            import_pattern = r"(import .* from ['\"].*progressService['\"])"
            replacement = r"\1\nimport { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'"

        content = re.sub(import_pattern, replacement, content, count=1)
        print(f"✓ Added keyboard navigation import to {component_name}")

    # Make collapsible headers keyboard accessible
    # Add tabIndex, role, and onKeyDown to h2 elements that have onClick
    def make_header_accessible(match):
        header = match.group(0)

        # Skip if already has tabIndex
        if 'tabIndex' in header:
            return header

        # Add keyboard accessibility
        # Find the closing > of the opening tag
        tag_end = header.find('>')
        if tag_end == -1:
            return header

        # Insert keyboard attributes before the closing >
        accessible_attrs = '\n                  tabIndex={shouldCollapse ? 0 : -1}\n                  role={shouldCollapse ? "button" : undefined}\n                  aria-expanded={shouldCollapse ? isExpanded : undefined}\n                  onKeyDown={(e) => {\n                    if (shouldCollapse && (e.key === "Enter" || e.key === " ")) {\n                      e.preventDefault()\n                      setExpandedSections(prev => ({ ...prev, Easy: !prev.Easy }))\n                    }\n                  }}'

        # Replace difficulty name in the handler
        difficulty = 'Easy' if 'Easy' in header else ('Medium' if 'Medium' in header else 'Hard')
        accessible_attrs = accessible_attrs.replace('Easy', difficulty)

        modified_header = header[:tag_end] + accessible_attrs + header[tag_end:]
        return modified_header

    # Pattern to match h2 elements with onClick
    h2_pattern = r'<h2\s+onClick=\{[^}]+\}[^>]*style=\{\{[^}]+\}\}[^>]*>'
    content = re.sub(h2_pattern, make_header_accessible, content)

    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Successfully updated {component_name}")
        return True
    except Exception as e:
        print(f"❌ Error writing {file_path}: {e}")
        return False

print("="*60)
print("Adding Keyboard Navigation to Algorithm Components")
print("="*60)

success_count = 0
for component in components:
    print(f"\nProcessing {component}...")
    if add_keyboard_nav(component):
        success_count += 1

print(f"\n{'='*60}")
print(f"✅ Updated {success_count}/{len(components)} components")
print(f"{'='*60}")

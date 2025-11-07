#!/usr/bin/env python3
"""
Update algorithm category files to match SlidingWindow.jsx format.
This preserves the questions array from each file while updating the structure.
"""

import re
import sys
from pathlib import Path

# Category configurations
CATEGORIES = {
    'Arrays.jsx': ('🔢', 'Arrays', 'Arrays'),
    'BinarySearch.jsx': ('🔍', 'Binary Search', 'Binary Search'),
    'BinarySearchTrees.jsx': ('🌳', 'Binary Search Trees', 'Binary Search Trees'),
    'BinaryTrees.jsx': ('🌲', 'Binary Trees', 'Binary Trees'),
    'BitManipulation.jsx': ('💡', 'Bit Manipulation', 'Bit Manipulation'),
    'DataStructures.jsx': ('📚', 'Data Structures', 'Data Structures'),
    'DynamicProgramming.jsx': ('🧮', 'Dynamic Programming', 'Dynamic Programming'),
    'FamousAlgorithms.jsx': ('⭐', 'Famous Algorithms', 'Famous Algorithms'),
    'Graphs.jsx': ('🗺️', 'Graphs', 'Graphs'),
    'GreedyAlgorithms.jsx': ('🎯', 'Greedy Algorithms', 'Greedy Algorithms'),
    'HashTables.jsx': ('📊', 'Hash Tables', 'Hash Tables'),
    'Heaps.jsx': ('⛰️', 'Heaps', 'Heaps'),
    'LinkedLists.jsx': ('🔗', 'Linked Lists', 'Linked Lists'),
    'Queues.jsx': ('📋', 'Queues', 'Queues'),
    'Recursion.jsx': ('♻️', 'Recursion', 'Recursion'),
    'Sorting.jsx': ('📶', 'Sorting', 'Sorting'),
    'Stacks.jsx': ('📚', 'Stacks', 'Stacks'),
    'Strings.jsx': ('🔤', 'Strings', 'Strings'),
    'Trees.jsx': ('🌴', 'Trees', 'Trees'),
    'Trie.jsx': ('🔠', 'Trie', 'Trie'),
    'TwoPointers.jsx': ('👉👈', 'Two Pointers', 'Two Pointers'),
    'UnionFind.jsx': ('🔗', 'Union Find', 'Union Find'),
}

def extract_questions(content):
    """Extract the questions array from file content"""
    # Find 'const questions = ['
    match = re.search(r'const questions\s*=\s*\[', content)
    if not match:
        return None, None

    start = match.start()
    # Find the matching closing bracket
    bracket_count = 0
    in_array = False
    end = start

    for i in range(match.end() - 1, len(content)):
        char = content[i]
        if char == '[':
            bracket_count += 1
            in_array = True
        elif char == ']':
            if in_array:
                bracket_count -= 1
                if bracket_count == 0:
                    end = i + 1
                    break

    if end > start:
        return content[start:end], end

    return None, None

def main():
    base_dir = Path('src/pages/algorithms')

    # Read template
    template_path = base_dir / 'SlidingWindow.jsx'
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()

    # Extract template structure
    template_questions, _ = extract_questions(template)
    if not template_questions:
        print("ERROR: Could not extract questions from template")
        return

    # Split template into parts
    before_questions = template.split('const questions = [')[0]
    after_match = re.search(r'\]\s*\n\s*(//.*)?\n\s*const getCompletionStats', template, re.DOTALL)
    if not after_match:
        print("ERROR: Could not find end of questions in template")
        return

    after_questions = template[after_match.start():]
    # Replace the specific category references in the template

    success = 0
    failed = 0

    for filename, (emoji, title, problem_id) in CATEGORIES.items():
        filepath = base_dir / filename

        if not filepath.exists():
            print(f"⚠️  File not found: {filename}")
            failed += 1
            continue

        print(f"Processing: {filename}")

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract questions from current file
            questions_block, _ = extract_questions(content)

            if not questions_block:
                print(f"  ⚠️  Could not extract questions array")
                failed += 1
                continue

            # Build new content
            component_name = filename.replace('.jsx', '')

            # Start with template before questions
            new_content = before_questions

            # Replace function name and Sliding Window references
            new_content = new_content.replace('function SlidingWindow(', f'function {component_name}(')

            # Add the extracted questions
            new_content += questions_block + '\n'

            # Add after questions template
            after_part = after_questions
            # Replace all occurrences of "Sliding Window" with the new problem_id
            after_part = after_part.replace('`Sliding Window-${', f'`{problem_id}-${{')
            after_part = after_part.replace('Sliding Window', title)
            after_part = after_part.replace('🪟', emoji)
            after_part = after_part.replace('Master the sliding window technique for substring and subarray problems', f'Master {title.lower()} problems')
            after_part = after_part.replace('export default SlidingWindow', f'export default {component_name}')

            new_content += after_part

            # Write the new file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"  ✓ Successfully updated")
            success += 1

        except Exception as e:
            print(f"  ✗ Error: {str(e)}")
            failed += 1

    print(f"\n{'='*60}")
    print(f"Update complete!")
    print(f"  ✓ Success: {success}")
    print(f"  ✗ Failed: {failed}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

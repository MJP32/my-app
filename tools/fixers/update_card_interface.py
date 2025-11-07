#!/usr/bin/env python3
"""
Update all category files to show CompletionCheckbox and LeetCode link on question cards.
Matches the pattern used in Arrays.jsx.
"""

import os
import re

def update_card_interface(file_path, category_name):
    """Update a single file's card interface to match Arrays.jsx pattern."""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find the card rendering section
    # Looking for: difficultyQuestions.map((question) => (
    # And then finding the card structure

    # Find the problemId prefix (e.g., "Sliding Window" from `Sliding Window-${question.id}`)
    problem_id_match = re.search(r'problemId=\{`([^`]+)-\$\{', content)
    if not problem_id_match:
        print(f"  ⚠️  Could not find problemId pattern in {file_path}")
        return False

    problem_id_prefix = problem_id_match.group(1)

    # Find the card rendering section - look for the map and the card div
    # Pattern: {difficultyQuestions.map((question) => (
    #   <div key={question.id} onClick={() => selectQuestion(question)} ...>

    # Old pattern in the title section (line with checkmark):
    old_title_pattern = r'(<h3 style=\{\{ fontSize: \'1\.1rem\', fontWeight: \'600\', color: \'#1f2937\', margin: 0, flex: 1 \}\}>\{question\.id\}\. \{question\.title\}</h3>)\s*\{isProblemCompleted\([^)]+\) && <span style=\{\{ fontSize: \'1\.25rem\' \}\}>✅</span>\}'

    # New title pattern (without checkmark):
    new_title_pattern = r'\1'

    # Replace the title section to remove checkmark
    content = re.sub(old_title_pattern, new_title_pattern, content)

    # Old pattern for bottom section (just difficulty badge):
    old_bottom_pattern = r'<div style=\{\{ display: \'flex\', gap: \'0\.5rem\', flexWrap: \'wrap\' \}\}>\s*<span style=\{\{ padding: \'0\.25rem 0\.75rem\', borderRadius: \'12px\', fontSize: \'0\.75rem\', fontWeight: \'600\', backgroundColor: getDifficultyColor\(question\.difficulty\) \+ \'20\', color: getDifficultyColor\(question\.difficulty\) \}\}>\{question\.difficulty\}</span>\s*</div>'

    # New bottom pattern (with CompletionCheckbox and LeetCode link):
    new_bottom_pattern = '''<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`''' + problem_id_prefix + '''-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>'''

    # Replace the bottom section
    content = re.sub(old_bottom_pattern, new_bottom_pattern, content, flags=re.DOTALL)

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

def main():
    # Algorithm files (excluding Arrays.jsx which is already done)
    algorithm_files = [
        'src/pages/algorithms/SlidingWindow.jsx',
        'src/pages/algorithms/MathGeometry.jsx',
        'src/pages/algorithms/AdvancedGraphs.jsx',
        'src/pages/algorithms/Searching.jsx',
        'src/pages/algorithms/Backtracking.jsx',
        'src/pages/algorithms/Intervals.jsx',
        'src/pages/algorithms/Stacks.jsx',
        'src/pages/algorithms/HashTables.jsx',
        'src/pages/algorithms/BinarySearch.jsx',
        'src/pages/algorithms/BinarySearchTrees.jsx',
        'src/pages/algorithms/BinaryTrees.jsx',
        'src/pages/algorithms/BitManipulation.jsx',
        'src/pages/algorithms/DataStructures.jsx',
        'src/pages/algorithms/DynamicProgramming.jsx',
        'src/pages/algorithms/FamousAlgorithms.jsx',
        'src/pages/algorithms/Graphs.jsx',
        'src/pages/algorithms/GreedyAlgorithms.jsx',
        'src/pages/algorithms/Heaps.jsx',
        'src/pages/algorithms/LinkedLists.jsx',
        'src/pages/algorithms/Queues.jsx',
        'src/pages/algorithms/Recursion.jsx',
        'src/pages/algorithms/Sorting.jsx',
        'src/pages/algorithms/Strings.jsx',
        'src/pages/algorithms/Trees.jsx',
        'src/pages/algorithms/Trie.jsx',
        'src/pages/algorithms/TwoPointers.jsx',
        'src/pages/algorithms/UnionFind.jsx',
    ]

    base_path = '/mnt/c/Users/micha/Documents/dev/oct/my-app'

    print("Updating algorithm files...")
    for file in algorithm_files:
        file_path = os.path.join(base_path, file)
        category_name = os.path.basename(file).replace('.jsx', '')
        print(f"  Processing {category_name}...")

        if update_card_interface(file_path, category_name):
            print(f"  ✅ Updated {category_name}")
        else:
            print(f"  ❌ Failed to update {category_name}")

    print("\n✅ All algorithm files updated!")

if __name__ == '__main__':
    main()

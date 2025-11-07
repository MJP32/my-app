#!/usr/bin/env python3
"""
Verify all problems have LeetCode links with consistent format
"""

import re
import os

def check_component(file_path):
    """Check if all problems in a component have LeetCode links"""

    component_name = os.path.basename(file_path).replace('.jsx', '')

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return None

    # Find all problem objects
    # Look for patterns like: id: 1, ... up to the next id: or closing }
    problems = re.findall(r'\{\s*id:\s*(\d+),.*?(?=\{[\s]*id:|$)', content, re.DOTALL)

    # Count problems with leetcodeUrl
    leetcode_urls = re.findall(r"leetcodeUrl:\s*['\"]https://leetcode\.com/problems/[^'\"]+['\"]", content)

    # Count problem IDs
    problem_ids = re.findall(r'^\s*id:\s*\d+,', content, re.MULTILINE)

    total_problems = len(problem_ids)
    problems_with_links = len(leetcode_urls)

    print(f"\n{component_name}:")
    print(f"  Total problems: {total_problems}")
    print(f"  With LeetCode links: {problems_with_links}")

    if total_problems == problems_with_links:
        print(f"  ✅ All problems have LeetCode links")
        return True
    else:
        print(f"  ⚠️  Missing {total_problems - problems_with_links} LeetCode links")
        return False

# Check all component files
algorithm_files = [
    'Arrays.jsx', 'BinarySearch.jsx', 'BinarySearchTrees.jsx', 'BinaryTrees.jsx',
    'DataStructures.jsx', 'DynamicProgramming.jsx', 'FamousAlgorithms.jsx',
    'Graphs.jsx', 'GreedyAlgorithms.jsx', 'HashTables.jsx', 'Heaps.jsx',
    'LinkedLists.jsx', 'Queues.jsx', 'Recursion.jsx', 'Searching.jsx',
    'Sorting.jsx', 'Stacks.jsx', 'Strings.jsx', 'Trees.jsx', 'Trie.jsx', 'UnionFind.jsx'
]

print("="*60)
print("Verifying LeetCode Links Across All Components")
print("="*60)

all_good = True
for filename in algorithm_files:
    file_path = f'src/pages/algorithms/{filename}'
    if os.path.exists(file_path):
        result = check_component(file_path)
        if result == False:
            all_good = False
    else:
        print(f"\n{filename}:")
        print(f"  ⚠️  File not found")
        all_good = False

print("\n" + "="*60)
if all_good:
    print("✅ All components have consistent LeetCode links!")
else:
    print("⚠️  Some components need LeetCode links added")
print("="*60)

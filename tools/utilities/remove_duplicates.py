#!/usr/bin/env python3
"""
Remove duplicate problems from algorithm files.
Each problem should only appear in its most appropriate category.
"""

import re
import sys

# Define which problems to remove from which files
REMOVALS = {
    'Arrays.jsx': [
        'Two Sum',
        'Jump Game',
        'Gas Station',
        'Valid Palindrome',
        'Find Minimum in Rotated Sorted Array'
    ],
    'Trees.jsx': [
        'Binary Tree Inorder Traversal',
        'Maximum Depth of Binary Tree',
        'Lowest Common Ancestor',
        'Validate Binary Search Tree'
    ],
    'DataStructures.jsx': [
        'Validate Binary Search Tree',
        'Binary Tree Level Order Traversal',
        'Kth Smallest Element in BST',
        'Kth Smallest Element in a BST'  # Handle title variation
    ],
    'Searching.jsx': [
        'Search in Rotated Sorted Array',
        'Search a 2D Matrix II'
    ],
    'FamousAlgorithms.jsx': [
        'Sliding Window Maximum'
    ],
    'Strings.jsx': [
        'Longest Palindromic Substring'
    ]
}

def remove_problem_from_file(file_path, problem_title):
    """Remove a problem from a file by finding its complete object definition."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Pattern to match a complete problem object
        # This matches from { id: N, to the closing },
        pattern = r'\s*\{\s*\n\s*id:\s*\d+,\s*\n\s*title:\s*[\'"]' + re.escape(problem_title) + r'[\'"],.*?\n\s*\},?\s*\n'

        # Try to find and remove the problem
        new_content, count = re.subn(pattern, '', content, flags=re.DOTALL)

        if count > 0:
            # Clean up any double commas that might result
            new_content = re.sub(r',(\s*),', r',\1', new_content)
            new_content = re.sub(r',(\s*)\]', r'\1]', new_content)

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Removed '{problem_title}' from {file_path}")
            return True
        else:
            print(f"✗ Could not find '{problem_title}' in {file_path}")
            return False

    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    base_path = '/mnt/c/Users/micha/Documents/dev/oct/my-app/src/pages/algorithms/'

    total_removed = 0
    total_failed = 0

    for file_name, problems in REMOVALS.items():
        file_path = base_path + file_name
        print(f"\n📄 Processing {file_name}...")

        for problem in problems:
            if remove_problem_from_file(file_path, problem):
                total_removed += 1
            else:
                total_failed += 1

    print(f"\n{'='*60}")
    print(f"Summary: {total_removed} problems removed, {total_failed} failed")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

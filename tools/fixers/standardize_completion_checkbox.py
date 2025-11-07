#!/usr/bin/env python3
"""
Standardize CompletionCheckbox placement across all problem pages.
Ensures it's always wrapped in <div style={{ marginLeft: 'auto' }}> and appears in the same location.
"""

import os
import re
from pathlib import Path

def standardize_completion_checkbox(file_path):
    """
    Find CompletionCheckbox without proper wrapper and add it.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if file doesn't contain CompletionCheckbox
        if 'CompletionCheckbox' not in content:
            return False

        # Check if it already has the marginLeft auto wrapper
        if re.search(r'<div\s+style={{[^}]*marginLeft:\s*[\'"]auto[\'"]', content):
            # Check if CompletionCheckbox is INSIDE this div
            pattern = r'<div\s+style={{[^}]*marginLeft:\s*[\'"]auto[\'"][^}]*}}>\s*<CompletionCheckbox'
            if re.search(pattern, content):
                print(f"✓ {file_path} - Already properly wrapped")
                return False

        # Pattern 1: CompletionCheckbox without any wrapper div
        pattern1 = r'(\s*)(<CompletionCheckbox\s+problemId=)'

        # Check if it needs wrapping
        matches = list(re.finditer(pattern1, content))
        if not matches:
            print(f"✗ {file_path} - No CompletionCheckbox found with expected pattern")
            return False

        modified = False
        for match in reversed(matches):  # Process from end to avoid offset issues
            indent = match.group(1)
            checkbox_start = match.group(2)

            # Check if this CompletionCheckbox is already wrapped
            before_checkbox = content[:match.start()]
            if '<div style={{ marginLeft: \'auto\' }}>' in before_checkbox[-100:]:
                continue

            # Find the closing tag
            start_pos = match.start()
            closing_pattern = r'/>'
            closing_match = re.search(closing_pattern, content[start_pos:])
            if not closing_match:
                continue

            end_pos = start_pos + closing_match.end()
            checkbox_block = content[start_pos:end_pos]

            # Wrap it properly
            wrapped = f"{indent}<div style={{{{ marginLeft: 'auto' }}}}>\n{indent}  {checkbox_block.strip()}\n{indent}</div>"

            content = content[:start_pos] + wrapped + content[end_pos:]
            modified = True

        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ {file_path} - Fixed CompletionCheckbox placement")
            return True
        else:
            print(f"- {file_path} - No changes needed")
            return False

    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    base_path = Path('/mnt/c/Users/micha/Documents/dev/oct/my-app/src/pages')

    # Find all .jsx files
    jsx_files = []
    for directory in ['algorithms', 'java', 'design', 'python']:
        dir_path = base_path / directory
        if dir_path.exists():
            jsx_files.extend(dir_path.glob('*.jsx'))

    total_fixed = 0
    total_checked = 0

    print("Standardizing CompletionCheckbox placement...\n")

    for file_path in sorted(jsx_files):
        total_checked += 1
        if standardize_completion_checkbox(str(file_path)):
            total_fixed += 1

    print(f"\n{'='*60}")
    print(f"Summary: {total_fixed} files fixed out of {total_checked} checked")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

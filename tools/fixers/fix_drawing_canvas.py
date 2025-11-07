#!/usr/bin/env python3
import os
import re

# Directory containing the algorithm files
algorithms_dir = "src/pages/algorithms"

# Pattern to match: function closing } followed by DrawingCanvas outside
pattern = re.compile(
    r'(\)\s*\n}\s*\n)\s*\n\s*(\{/\* Drawing Canvas Modal \*/\}\s*\n\s*<DrawingCanvas[\s\S]*?/>)\s*\n(export default)',
    re.MULTILINE
)

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if the file has the issue
    if re.search(pattern, content):
        print(f"Fixing {filepath}...")

        # Fix: Move DrawingCanvas inside the component before the closing div
        # Look for the pattern where DrawingCanvas is outside the function
        fixed_content = re.sub(
            r'(\)\s*\n)(}\s*\n)\s*\n\s*(\{/\* Drawing Canvas Modal \*/\}\s*\n\s*<DrawingCanvas[\s\S]*?/>)\s*\n(export default)',
            r'\n      \3\n    </div>\n  \1\2\n\4',
            content
        )

        # If that didn't work, try another pattern
        if fixed_content == content:
            fixed_content = re.sub(
                r'(    </div>\n  \)\n)(}\n)\s*\n\s*(\{/\* Drawing Canvas Modal \*/\}\s*\n\s*<DrawingCanvas[\s\S]*?/>)\s*\n(export default)',
                r'\n      \3\n\1\2\n\4',
                content
            )

        if fixed_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"  ✓ Fixed {filepath}")
            return True
        else:
            print(f"  ✗ Could not fix {filepath} automatically")
            return False
    return False

# Process all JSX files
fixed_count = 0
for filename in os.listdir(algorithms_dir):
    if filename.endswith('.jsx'):
        filepath = os.path.join(algorithms_dir, filename)
        if fix_file(filepath):
            fixed_count += 1

print(f"\n✅ Fixed {fixed_count} files")

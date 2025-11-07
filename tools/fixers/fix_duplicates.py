#!/usr/bin/env python3
"""
Fix duplicate keys in object literals
"""

import re
import glob

def fix_duplicate_textalign(file_path):
    """Fix duplicate textAlign keys in Questions files"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Pattern to find duplicate textAlign
    # Look for style objects with textAlign appearing twice
    pattern = r"(style=\{\{[^}]*textAlign:\s*['\"][^'\"]+['\"][^}]*)(textAlign:\s*['\"]left['\"])"

    # Count occurrences
    matches = re.findall(pattern, content)
    if not matches:
        return False

    # Remove the duplicate textAlign
    content_new = re.sub(pattern, r'\1', content)

    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content_new)
        print(f"✅ Fixed {len(matches)} duplicate textAlign in {file_path}")
        return True
    except Exception as e:
        print(f"❌ Error writing {file_path}: {e}")
        return False

def fix_binarytrees_duplicates():
    """Fix duplicate keys in BinaryTrees.jsx"""
    file_path = 'src/pages/algorithms/BinaryTrees.jsx'

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Fix duplicate code key around line 2050
    # Find the first code: { and remove the duplicate
    fixed_lines = []
    skip_next_code = False
    code_count = 0

    for i, line in enumerate(lines):
        line_num = i + 1

        # Check for duplicate code around line 2048-2051
        if 2047 <= line_num <= 2051 and 'code: {' in line and code_count > 0:
            print(f"Skipping duplicate 'code:' at line {line_num}")
            skip_next_code = True
            continue

        if 'code: {' in line:
            code_count += 1

        # Check for duplicate testCases around line 2204
        if line_num == 2204 and 'testCases: [' in line:
            # Check if there's already a testCases before this
            for j in range(max(0, i-20), i):
                if 'testCases: [' in lines[j]:
                    print(f"Skipping duplicate 'testCases:' at line {line_num}")
                    # Skip this line and the next few lines until we hit the closing bracket
                    continue_skip = True
                    break

        # Check for duplicate hints around line 2208
        if line_num == 2209 and 'hints:' in line:
            # Check if there's already a hints before this
            for j in range(max(0, i-20), i):
                if 'hints:' in lines[j]:
                    print(f"Skipping duplicate 'hints:' at line {line_num}")
                    continue

        fixed_lines.append(line)

    # Actually, let's use a more surgical approach
    # Read the file again and use regex
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    modified = False

    # Fix: Remove duplicate 'code: {' around line 2050
    # Pattern: hints: `...`, followed by code: { (first), then another code: { (duplicate)
    pattern1 = r"(hints:\s*`[^`]+`,\s*code:\s*\{[^}]+\}[^}]*\},\s*)code:\s*\{"
    if re.search(pattern1, content):
        content = re.sub(pattern1, r'\1', content)
        modified = True
        print("✓ Removed duplicate 'code:' key")

    # Fix: Remove duplicate 'testCases:' around line 2204
    # Pattern: testCases: [...], then another testCases: [...]
    pattern2 = r"(testCases:\s*\[[^\]]+\],\s*)testCases:\s*\["
    if re.search(pattern2, content):
        content = re.sub(pattern2, r'\1', content)
        modified = True
        print("✓ Removed duplicate 'testCases:' key")

    # Fix: Remove duplicate 'hints:' around line 2209
    # Pattern: { input: '...', output: '...' }], then hints: `...` twice
    pattern3 = r"(\],\s*hints:\s*`[^`]+`\s*\},\s*\{\s*id:)"
    if re.search(pattern3, content):
        # This one is trickier - let's find the duplicate hints line
        lines = content.split('\n')
        new_lines = []
        found_hints_in_block = False
        in_question_block = False

        for i, line in enumerate(lines):
            # Detect if we're in a question block (between { id: ... })
            if '    {' in line and i > 0 and 'id:' in lines[i+1] if i+1 < len(lines) else False:
                in_question_block = True
                found_hints_in_block = False
            elif '    },' in line or '    }' in line:
                in_question_block = False
                found_hints_in_block = False

            # If we find hints in this block
            if in_question_block and 'hints:' in line:
                if found_hints_in_block:
                    print(f"Skipping duplicate hints at line {i+1}")
                    continue
                found_hints_in_block = True

            new_lines.append(line)

        content = '\n'.join(new_lines)
        modified = True
        print("✓ Removed duplicate 'hints:' key")

    if modified:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed BinaryTrees.jsx")
            return True
        except Exception as e:
            print(f"❌ Error writing {file_path}: {e}")
            return False

    return False

print("="*60)
print("Fixing Duplicate Keys")
print("="*60)

# Fix Questions files
questions_files = [
    'src/pages/questions/RestAPIQuestions.jsx',
    'src/pages/questions/PrometheusQuestions.jsx',
    'src/pages/questions/ActuatorQuestions.jsx',
    'src/pages/questions/TeamCityQuestions.jsx',
    'src/pages/questions/GrafanaQuestions.jsx',
    'src/pages/questions/ZipkinQuestions.jsx',
    'src/pages/questions/SolaceQuestions.jsx',
    'src/pages/questions/JenkinsQuestions.jsx',
    'src/pages/questions/RabbitMQQuestions.jsx',
]

success_count = 0
for file_path in questions_files:
    if fix_duplicate_textalign(file_path):
        success_count += 1

# Fix BinaryTrees
print("\nFixing BinaryTrees.jsx...")
if fix_binarytrees_duplicates():
    success_count += 1

print(f"\n{'='*60}")
print(f"✅ Fixed {success_count} files")
print(f"{'='*60}")
